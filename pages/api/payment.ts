import { Client } from "@ameria/vpos-sdk";
import assert from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  AMERIA_CLIENT_ID,
  AMERIA_IS_TEST,
  AMERIA_PW,
  AMERIA_UN,
} from "../../config";
import { getCheckout, updateCheckout, withConnection } from "../../mongo";
import * as telegram from "../../utils/telegram";

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
    const { paymentID, opaque } = req.query; // paymentID ameria payment id
    const { checkoutId } = JSON.parse(opaque.toString());
    assert.ok(checkoutId, new Error("missing 'checkoutId'"));

    try {
      const checkout = await getCheckout(checkoutId);
      const details = await client.getPaymentDetails(paymentID.toString());
      await updateCheckout(checkoutId, {
        details,
        status: successCodes.includes(details.ResponseCode)
          ? "success"
          : "error",
      });

      if (successCodes.includes(details.ResponseCode)) {
        res.redirect(`/tickets/${checkoutId}`);
        return;
      } else {
        telegram.failedAfterApprove(checkout, details);
      }

      res.redirect(`/tickets/${checkoutId}`);
    } catch (err) {
      console.error(err);
      res.redirect(`/tickets/${checkoutId}`);
    }
  });
});

export default handler;
