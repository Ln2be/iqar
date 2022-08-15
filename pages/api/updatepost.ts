import { NextApiRequest, NextApiResponse } from "next";
import { DBAdminCode, DBPost, DBUserCode } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { count } = req.query;
  const post = req.body;
  delete post._id;
  const postr = await DBPost.updateOne({ count: count }, post);

  // res.writeHead(302, { Location: "/post?count=" + count });
  res.json(postr);
}
