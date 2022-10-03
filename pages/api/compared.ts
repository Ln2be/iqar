import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const post = await DBPost.findOne({ _id: id });

  if (req.query.action == "finished") {
    const update = await DBPost.updateOne(
      { _id: id },
      { comparedTo: ["finished"] }
    );
    console.log(update);
    res.send(update);
  }
  if (req.query.user) {
    const ar = post.comparedTo;
    ar.push(req.query.user);
    const update = await DBPost.updateOne({ _id: id }, { comparedTo: ar });

    res.send(update);
  } else if (req.query.post) {
    // this post is compared so add its id (idc) to the comparedTo of the main post
    const idc = req.query.post;
    const ar = post.comparedTo;
    ar.push(idc);

    const update = await DBPost.updateOne({ _id: id }, { comparedTo: ar });

    // add the main post id also to this post comparedTo array. Each one is compared to the other
    const postc = await DBPost.findOne({ _id: idc });
    const ar2 = postc.comparedTo;
    ar2.push(id);
    const updateC = await DBPost.updateOne(
      { _id: idc },
      { comparedTo: ar2 }
    );

    res.send([update, updateC]);
  }

  // if the post finished comparaison with others posts
  else if (req.query.finished) {
    // const ar = post.comparedTo;
    // ar.push("finished");

    await DBPost.updateOne({ _id: id }, { comparedTo: ["finished"] });
    res.send("finish");
  }
}
