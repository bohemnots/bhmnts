import { Client } from "@ameria/vpos-sdk";
import { AMERIA_CLIENT_ID, AMERIA_IS_TEST, AMERIA_PW, AMERIA_UN } from "config";
import { getCheckoutByPaymentID, updateCheckout, withConnection } from "mongo";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import * as telegram from "utils/telegram";

const client = new Client({
  clientId: AMERIA_CLIENT_ID,
  username: AMERIA_UN,
  password: AMERIA_PW,
  isTest: !!AMERIA_IS_TEST,
});

const successCodes = ["00", "01"];

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  return withConnection(async () => {
    const { paymentID } = req.query; // paymentID ameria payment id
    let checkoutId = "";
    try {
      const checkout = await getCheckoutByPaymentID(paymentID + "");
      checkoutId = checkout._id + "";
      if (!checkoutId) {
        throw new Error(
          `missing 'checkoutId', ${JSON.stringify(checkout, null, 2)}`
        );
      }
      const details = await client.getPaymentDetails(paymentID.toString());
      await updateCheckout(checkoutId, {
        details,
        status: successCodes.includes(details.ResponseCode)
          ? "success"
          : "error",
      });

      if (successCodes.includes(details.ResponseCode)) {
        telegram.newRequest(checkout);
        res.redirect(`/tickets/${checkoutId}`);
        return;
      } else {
        telegram.failedAfterApprove(checkout, details);
      }

      res.redirect(`/tickets/${checkoutId}`);
    } catch (err) {
      console.error(err);
      res.redirect(checkoutId ? `/tickets/${checkoutId}` : "/404");
    }
  });
});

export default handler;
