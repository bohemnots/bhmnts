import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import next from "next";
import nc from "next-connect";
import * as yup from "yup";

import { createCheckout, withConnection } from "../../mongo";

const handler = nc<NextApiRequest, NextApiResponse>();

import { newRequest } from "utils/telegram";

import { S3 } from "../../config";
import upload from "../../middleware/upload";
import { s3 } from "../../utils/s3";

handler.use(upload);

const InputSchema = yup.object().shape({
  fullName: yup.string().min(2).required(),
  email: yup.string().email().required(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(async (req, res) => {
  return withConnection(async () => {
    try {
      const newData = {
        eventId: "2022-karnaval-dilijan",
        fullName: req.body.fullName + "",
        email: req.body.email + "",
      };

      await InputSchema.validate(newData);
      const checkout = await createCheckout(newData);

      // @ts-ignore
      const photo = req.files.photo && req.files.photo[0];
      const Key = `checkouts/${checkout._id}/photo.jpg`;
      const buffer = readFileSync(photo.path);
      await s3.putObject({
        Bucket: S3.BUCKET,
        Key,
        Body: buffer,
        ACL: "public-read",
        ContentDisposition: `filename: "${newData.email}.jpg"`,
        ContentType: "image/jpeg",
      });
      newRequest(checkout);
      res.json({ checkout });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }).catch((err) => console.error(err));
});

export default handler;
