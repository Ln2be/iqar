import { NextApiRequest, NextApiResponse } from "next";
import { DBUser } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await DBUser.deleteOne({ _id: req.query.id });

  res.writeHead(302, { Location: "/reps" });
  res.json({});
}
