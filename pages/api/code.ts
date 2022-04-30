import { NextApiRequest, NextApiResponse } from "next";
import { DBPost, DBUserCode } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userCode = await DBUserCode.insertMany(req.body);

  const codes = await DBUserCode.find({}).sort({ code: -1 });
  res.send(codes);
}
