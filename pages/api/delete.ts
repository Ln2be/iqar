import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const deletedPost = await DBPost.deleteOne({ _id: req.query.id });
  res.writeHead(302, { Location: "/" });
  res.json(deletedPost);
}
