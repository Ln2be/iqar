import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";
import { getMapregion } from "../../lib/myfunctions";
import { Post } from "../../projectTypes";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action, id } = req.query;

  if (action == "mapregion") {
    const posts = await DBPost.find({});
    posts.map(async (post) => {
      if (post.position && post.position.length > 1) {
        const mapregion = getMapregion(post.position);
        const res = await DBPost.updateOne(
          { _id: post._id },
          { mapregion: mapregion }
        );
        console.log(res);
      }
    });
    res.send("ok");
  } else if (action == "posts") {
    const posts = await DBPost.find({});
    res.send(posts);
  }
}
