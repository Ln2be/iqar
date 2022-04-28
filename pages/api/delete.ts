import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const deletedPost = await DBPost.deleteOne({ _id: req.query.id });
  res.redirect("/").json(deletedPost);
}
