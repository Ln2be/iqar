import { NextApiRequest, NextApiResponse } from "next";
import { DBPost, DBChance } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  if (action == "save") {
    const chance = req.body;
    const { postcount } = chance;
    const chancesaved = await new DBChance(chance).save();

    // add a chancecount to the post
    await DBPost.updateOne(
      { count: postcount },
      { chanceid: chancesaved.count }
    );

    res.send(chancesaved);
  } else if (action == "update") {
    console.log(action);
  } else if (action == "delete") {
    const { count } = req.query;

    const chance = await DBChance.findOne({ count: count });

    // remove the chancecount from the post
    const { postcount } = chance;
    await DBPost.updateOne({ count: postcount }, { chancecount: "" });

    await DBChance.deleteOne({ count: count });
    res.writeHead(302, { Location: "/" }).end();
  } else if (action == "deleteall") {
    await DBChance.deleteMany({});
    res.send("Ok");
  }
}
