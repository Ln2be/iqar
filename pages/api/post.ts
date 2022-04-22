import { NextApiRequest, NextApiResponse } from "next";
import { DBCount, DBPost } from "../../lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  if (query.id) {
    const post = await DBPost.find({ _id: query.id });
    res.json(post);
  }

  if (query.type) {
    const post = await DBPost.find({ type: query.type });
    res.json(post);
  }

  // count the number of user
  const postCounter =
    (await DBCount.findOne({ name: "user" })) ||
    (await new DBCount({ name: "user" }).save());

  await DBCount.updateOne({ name: "user" }, { count: postCounter.count + 1 });
  // using the database now

  req.body.count = postCounter.count + 1;
  const post = await new DBPost(req.body).save();
  res.json(post);
}
