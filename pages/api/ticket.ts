import { Client } from "@ameria/vpos-sdk";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  AMERIA_CLIENT_ID,
  AMERIA_IS_TEST,
  AMERIA_PW,
  AMERIA_UN,
  HOST_URL,
  S3,
} from "../../config";
import upload from "../../middleware/upload";
import {
  connect,
  createCheckout,
  nextOrderId,
  updateCheckout,
} from "../../mongo";
import { s3 } from "../../utils/s3";

const client = new Client({
  clientId: AMERIA_CLIENT_ID,
  username: AMERIA_UN,
  password: AMERIA_PW,
  isTest: !!AMERIA_IS_TEST,
});

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(upload);

export const config = {
  api: {
    bodyParser: false,
  },
};
handler.post(async (req, res) => {
  try {
    await connect();
    debugger;
    const body = req.body;
    const checkout = await createCheckout(body);
    const orderId = await nextOrderId();

    // @ts-ignore
    const photo = req.files.photo && req.files.photo[0];
    const Key = `checkouts/${checkout._id}/photo.jpg`;
    const buffer = readFileSync(photo.path);
    await s3.putObject({
      Bucket: S3.BUCKET,
      Key,
      Body: buffer,
      ACL: "public-read",
      ContentDisposition: `filename: "${body.email}.jpg"`,
      ContentType: "image/jpeg",
    });

    const data = await client.initPayment({
      orderId: orderId,
      amount: 10,
      desc: `Bohemnots event ticket purchase`,
      opaque: JSON.stringify({ checkoutId: checkout._id }),
      backUrl: `${HOST_URL}/api/payment`,
      currency: "AMD",
      lang: "en",
    });

    await updateCheckout(checkout._id.toString(), { init: data });

    if (!data.url) {
      console.warn(
        `Failed init Ameria Payment: Response ${JSON.stringify(data)}`
      );
      res.json({ link: `/payment/failed/${checkout._id}` });
      return;
    }
    res.json({ link: data.url });
  } catch (err) {
    res.json({ link: `/payment/failed/error` });
  }
});

export default handler;
