import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action, id, codeTel } = req.query;


  const post = await DBPost.findOne({ _id: id });

  if (action == "sendTo") {
    const sendTo = post.sendTo ? post.sendTo : [];
    sendTo.push(codeTel);
    await DBPost.updateOne({ _id: id }, { sendTo: sendTo });
    res.send("Ok");
  }

  if (action == "remove") {
    const sendTo = post.sendTo;
    const index = sendTo.indexOf(codeTel);
    if (index > -1) {
      // only splice array when item is found
      sendTo.splice(index, 1); // 2nd parameter means remove one item only
    }
    await DBPost.updateOne({ _id: id }, { sendTo: sendTo });
    res.send("Ok");
  }
}
