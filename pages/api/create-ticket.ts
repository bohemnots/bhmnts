import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import next from "next";
import { getSession } from "next-auth/react";
import nc from "next-connect";

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
  return withConnection(async (client) => {
    try {
      const settings = await client.settings.findOne<{ emails: string[] }>({
        _id: "faceControlEmails",
      });
      const session = await getSession({ req });
      const email = session?.user?.email;
      if (settings?.emails?.length) {
        if (!settings?.emails.includes(email || "")) {
          throw new Error(`you are not allowed to create tickets`);
        }
      }
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
