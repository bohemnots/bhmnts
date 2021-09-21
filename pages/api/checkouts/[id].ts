import { HOST_URL } from "config";
import { getCheckout, updateCheckout, withConnection } from "mongo";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import qrCode from "qrcode";
import { AmeriaClient } from "utils/ameria";
import { sendApprove, sendDeny } from "utils/email";
import { failedAfterApprove } from "utils/telegram";

const VALID = ["approved", "rejected", "refunded"];

export const getTicket = async (req, res) => {
  const checkoutId = req.params.id;
  const url = `${HOST_URL}/tickets/${checkoutId}`;
  return await qrCode.toFileStream(res, url, { scale: 20 });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return withConnection(async (client) => {
    const session = await getSession({ req });

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
        const notes = req.body.notes;

        if (session?.user) {
          const settings = await client.settings.findOne<{
            emails: string[];
          }>({
            _id: "faceControlEmails",
          });
          const email = session?.user?.email;
          if (settings?.emails?.length) {
            if (!settings?.emails.includes(email || "")) {
              throw new Error(`you are not allowed to create tickets`);
            }
          }
        }

        if (!VALID.includes(status)) {
          throw new Error(
            `Invalid status '${status}', must be ${VALID.join(" or ")}`
          );
        }
        let checkout = await getCheckout(checkoutId);

        if (status === "refund" && checkout.status !== "approved") {
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
          if (["00", "07", "05"].includes(confirmResponse.ResponseCode)) {
            await sendApprove(checkout.email, checkoutId, notes);
          } else {
            failedAfterApprove(checkout, confirmResponse)
              .catch((err) => console.error(err))
              .then(() => {
                console.error(
                  `Unknown response,  ${JSON.stringify(confirmResponse)}`
                );
              });
          }
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
  });
}
