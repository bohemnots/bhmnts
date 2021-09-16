import type { NextApiRequest, NextApiResponse } from "next";

import * as config from "../../../config";
import {
  getCheckout,
  getMetadata,
  updateMetadata,
  withConnection,
} from "../../../mongo";
import { sendApprove } from "../../../utils/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return withConnection(async () => {
    debugger;
    const checkoutId = req.query.checkoutId;

    if (req.method === "GET") {
      const doc = await getCheckout(checkoutId.toString());
      if (!doc) {
        res.setHeader("Cache-Control", "no-cache");
        res.status(404).send("Not Found");
        return;
      }
      if (!doc.email) {
        res.status(404).send(`Missing email on checkout`);
        return;
      }
      await sendApprove(doc.email, doc._id + "", doc.notes);
      res.setHeader("Cache-Control", "no-cache");
      res.status(200).json(doc);
      return;
    }
  });
}
