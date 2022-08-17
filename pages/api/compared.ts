import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { count } = req.query;
  const post = await DBPost.findOne({ count: count });

  if (req.query.action == "finished") {
    const update = await DBPost.updateOne(
      { count: count },
      { comparedTo: ["finished"] }
    );
    console.log(update);
    res.send(update);
  }
  if (req.query.user) {
    const ar = post.comparedTo;
    ar.push(req.query.user);
    const update = await DBPost.updateOne({ count: count }, { comparedTo: ar });

    res.send(update);
  } else if (req.query.post) {
    // this post is compared so add its count (idc) to the comparedTo of the main post
    const countc = req.query.post;
    const ar = post.comparedTo;
    ar.push(countc);

    const update = await DBPost.updateOne({ count: count }, { comparedTo: ar });

    // add the main post count also to this post comparedTo array. Each one is compared to the other
    const postc = await DBPost.findOne({ count: countc });
    const ar2 = postc.comparedTo;
    ar2.push(count);
    const updateC = await DBPost.updateOne(
      { count: countc },
      { comparedTo: ar2 }
    );

    res.send([update, updateC]);
  }

  // if the post finished comparaison with others posts
  else if (req.query.finished) {
    const ar = post.comparedTo;
    // ar.push("finished");

    await DBPost.updateOne({ count: count }, { comparedTo: ["finished"] });
    res.send("finish");
  }
}
