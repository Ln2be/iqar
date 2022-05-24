import { NextApiRequest, NextApiResponse } from "next";
import { DBAdminCode, DBPost, DBUserCode } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const post = req.body;
  delete post._id;
  const postr = await DBPost.updateOne({ _id: id }, post);

  // res.writeHead(302, { Location: "/post?id=" + id });
  res.json(postr);
}
