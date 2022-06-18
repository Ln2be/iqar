import { NextApiRequest, NextApiResponse } from "next";
import { DBAdminCode, DBPost, DBUserCode } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const post = await DBPost.findOne({ _id: id });

  console.log("here compared");
  if (req.query.user) {
    const ar = post.comparedTo;
    ar.push(req.query.user);
    const update = await DBPost.updateOne({ _id: id }, { comparedTo: ar });

    res.send(update);
  } else if (req.query.post) {
    const idc = req.query.post;
    const ar = post.comparedTo;
    ar.push(idc);
    const update = await DBPost.updateOne({ _id: id }, { comparedTo: ar });

    const postc = await DBPost.findOne({ _id: idc });
    const ar2 = postc.comparedTo;
    ar2.push(idc);
    const updateC = await DBPost.updateOne({ _id: idc }, { comparedTo: ar2 });

    console.log([update, updateC]);
    res.send([update, updateC]);
  }

  // if the post finished comparaison with others posts
  else if (req.query.finished) {
    const ar = post.comparedTo;
    ar.push("finished");
    const update = await DBPost.updateOne({ _id: id }, { comparedTo: ar });
  }
}
