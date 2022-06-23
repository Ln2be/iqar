import { NextApiRequest, NextApiResponse } from "next";
import { DBPost, DBChance } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  if (action == "save") {
    const chance = req.body;
    const { postid } = chance;
    const chancesaved = await new DBChance(chance).save();

    // add a chanceid to the post
    await DBPost.updateOne({ _id: postid }, { chanceid: chancesaved._id });

    res.send(chancesaved);
  } else if (action == "update") {
    console.log(action);
  } else if (action == "delete") {
    const { id } = req.query;

    const chance = await DBChance.findOne({ _id: id });

    // remove the chanceid from the post
    const { postid } = chance;
    await DBPost.updateOne({ _id: postid }, { chanceid: "" });

    await DBChance.deleteOne({ _id: id });
    res.writeHead(302, { Location: "/" }).end();
  } else if (action == "deleteall") {
    await DBChance.deleteMany({});
    res.send("Ok");
  }
}
