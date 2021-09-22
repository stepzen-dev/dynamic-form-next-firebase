import { NextApiRequest, NextApiResponse } from "next";
import { readOwner, updateOwner } from "../../../components/lib/dbUtil";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    console.log('id', req.query.id)
    const owner = await readOwner(req.query.id.toString());
    return res.json(owner);
  })
  .patch(async (req, res) => {
    if (req.query.id.toString() !== req.body.slug) {
      return res.status(400).end();
    }
    const owner = await updateOwner(req.body);
    return res.status(204).end();
  });
