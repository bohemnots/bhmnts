import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

import * as config from "../../config";
import {
  checkPassword,
  connect,
  getMetadata,
  updateMetadata,
} from "../../mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await connect();
  if (req.method === "GET") {
    const doc = await getMetadata();
    const response = await fetch("https://bhmnts.airtime.pro/api/live-info-v2");
    const data: any = await response.json();
    let trackName = "";
    if (data?.tracks?.current?.name) {
      trackName = data?.tracks?.current?.name;
    }
    res.setHeader("Cache-Control", "no-cache");
    res.status(200).json({ ...doc, trackName: trackName || doc.trackName });
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
    await checkPassword(update);
    const newData = await updateMetadata(update);
    return res.json(newData);
  }
}
