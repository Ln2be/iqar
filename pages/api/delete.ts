import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";

export default function helper(req: NextApiRequest, res: NextApiResponse) {
  const deletedPost = DBPost.deleteOne({ _id: req.query.id });
  res.json(deletedPost);
}
