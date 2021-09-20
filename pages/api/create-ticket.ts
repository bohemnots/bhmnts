import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import next from "next";
import nc from "next-connect";

import { PASSWORD } from "../../config";
import { createApprovedCheckout, withConnection } from "../../mongo";

const handler = nc<NextApiRequest, NextApiResponse>();

import { S3 } from "../../config";
import upload from "../../middleware/upload";
import { s3 } from "../../utils/s3";

handler.use(upload);

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(async (req, res) => {
  return withConnection(async () => {
    if (PASSWORD) {
      if (req.body.password + "" !== PASSWORD) {
        throw new Error(`invalid password`);
      }
    }
    try {
      const newData = {
        name: req.body.name + "",
        surname: req.body.surname + "",
        email: req.body.email + "",
      };
      const checkout = await createApprovedCheckout(newData);
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
      res.json({ checkout });
    } catch (err) {
      next(err);
    }
  });
});

export default handler;
