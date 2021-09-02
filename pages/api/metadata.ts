import type { NextApiRequest, NextApiResponse } from "next";

import * as config from "../../config";
import { getMetadata, updateMetadata, withConnection } from "../../mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return withConnection(async () => {
    if (req.method === "GET") {
      const doc = await getMetadata();
      res.setHeader("Cache-Control", "no-cache");
      res.status(200).json(doc);
      return;
    }

    if (req.method === "PATCH") {
      const update = req.body;
      if (config.PASSWORD) {
        if (req.body.password !== config.PASSWORD) {
          return res.status(403).send("forbidden");
        }
      }
      delete req.body.password;
      update.updatedAt = new Date().toISOString();
      const newData = await updateMetadata(update);
      return res.json(newData);
    }
  });
}
