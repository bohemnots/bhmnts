import qrCode from "qrcode";

import { HOST_URL } from "../../../config";
import * as config from "../../../config";
import { getCheckout, updateCheckout } from "../../../mongo";
import { AmeriaClient } from "../../../utils/ameria";
import { sendApprove, sendDeny } from "../../../utils/email";

const VALID = ["approved", "rejected"];

export const getTicket = async (req, res) => {
  const checkoutId = req.params.id;
  const url = `${HOST_URL}/tickets/${checkoutId}`;
  return await qrCode.toFileStream(res, url, { scale: 20 });
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { connect } from "../../../mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await connect();

  if (req.method === "GET") {
    if (!req.query.id || req.query.id === "undefined") {
      throw new Error(`[id] is missing in the URL`);
    }
    const checkoutId = req.query.id + "";

    try {
      const checkout = await getCheckout(checkoutId);

      res.json({ data: checkout });
    } catch (err) {
      console.error(err);
      res.status(404).send("Not Found");
    }
  }

  if (req.method === "PATCH") {
    try {
      const checkoutId = req.query.id.toString();
      const status = req.body.status;
      const password = req.body.password;
      const notes = req.body.notes;
      if (config.PASSWORD) {
        if (config.PASSWORD !== password) {
          throw new Error(`Invalid password`);
        }
      }

      if (!VALID.includes(status)) {
        throw new Error(
          `Invalid status '${status}', must be ${VALID.join(" or ")}`
        );
      }
      let checkout = await getCheckout(checkoutId);

      if (checkout.status !== "approved") {
        throw new Error(
          `To refund the purchase first you need to approve it. `
        );
      }

      checkout = await updateCheckout(checkoutId, { status, notes });
      const paymentId = checkout.init?.PaymentID;
      if (!paymentId || !checkout.details || !checkout.email) {
        throw new Error(`checkout is invalid, have a missing property`);
      }
      if (status === "approved") {
        if (!paymentId) {
          throw new Error(`There is no paymentId for this checkout.`);
        }
        const confirmResponse = await AmeriaClient.confirmPayment(
          paymentId,
          checkout.details.Amount
        );
        await updateCheckout(checkoutId, { confirm: confirmResponse });
        if (!["00", "07"].includes(confirmResponse.ResponseCode)) {
          console.error(
            `Unknown response,  ${JSON.stringify(confirmResponse)}`
          );
        }
        await sendApprove(checkout.email, checkoutId, notes);
      } else if (status === "refunded") {
        const refundResponse = await AmeriaClient.cancelPayment(paymentId);
        await updateCheckout(checkoutId, { refund: refundResponse });
      } else {
        const cancelResponse = await AmeriaClient.cancelPayment(paymentId);
        await updateCheckout(checkoutId, { cancel: cancelResponse });
        await sendDeny(checkout.email, notes);
      }
      res.json({ data: checkout });
    } catch (err) {
      console.error(err);
      res.json({ message: err.message });
    }
  }
}
