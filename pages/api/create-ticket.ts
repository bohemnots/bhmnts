import type { NextApiRequest, NextApiResponse } from "next";
import next from "next";
import nc from "next-connect";

import { PASSWORD } from "../../config";
import { createApprovedCheckout, withConnection } from "../../mongo";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  return withConnection(async () => {
    if (PASSWORD) {
      if (req.body.password !== PASSWORD) {
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
      res.json({ checkout });
    } catch (err) {
      next(err);
    }
  });
});

export default handler;
