import { NextApiRequest, NextApiResponse } from "next";
import { DBAdminCode, DBUserCode } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.role == "user") {
    const userCode = await DBUserCode.insertMany(req.body);
    const codes = await DBUserCode.find({}).sort({ code: -1 });
    res.send(codes);
  } else if (req.query.role == "admin") {
    const userCode = await DBAdminCode.insertMany(req.body);
    const codes = await DBAdminCode.find({}).sort({ code: -1 });
    res.send(codes);
  }
}
