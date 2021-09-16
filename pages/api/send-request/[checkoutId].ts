import type { NextApiRequest, NextApiResponse } from "next";

import { getCheckout, withConnection } from "../../../mongo";
import { newRequest } from "../../../utils/telegram";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return withConnection(async () => {
    debugger;
    const checkoutId = req.query.checkoutId + "";
    if (req.method === "GET") {
      return getCheckout(checkoutId)
        .then((doc) => {
          console.dir(doc);
          newRequest(doc);
          res.status(200).json(doc);
        })
        .catch((err) => {
          console.error(err);
          res.send(err.message);
        });
    }
  });
}
