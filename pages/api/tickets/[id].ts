import type { NextApiRequest, NextApiResponse } from "next";
import qrCode from "qrcode";

import { HOST_URL } from "../../../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const id = req.query.id + "";
  if (id.endsWith(".png")) {
    const checkoutId = id.replace(".png", "");
    const url = `${HOST_URL}/tickets/${checkoutId}`;
    await qrCode.toFileStream(res, url, { scale: 20 });
  }
}
