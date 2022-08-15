import { NextApiRequest, NextApiResponse } from "next";
import { DBUser } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;
  const { count } = req.query;

  const user = await DBUser.findOne({ count: count });

  if (action == "incrtrust") {
    const newTrust = user.trust ? user.trust + 1 : 2;
    await DBUser.updateOne({ count: count }, { trust: newTrust });
    res.send("Ok");
  }

  if (action == "decrtrust") {
    const newTrust = user.trust ? user.trust - 1 : 0;
    await DBUser.updateOne({ count: count }, { trust: newTrust });
    res.send("Ok");
  }

  //   The activity change samething
  if (action == "incractivity") {
    const newactivity = user.activity ? user.activity + 1 : 2;
    await DBUser.updateOne({ count: count }, { activity: newactivity });
    res.send("Ok");
  }

  if (action == "decractivity") {
    const newactivity = user.activity ? user.activity - 1 : 0;
    await DBUser.updateOne({ count: count }, { activity: newactivity });
    res.send("Ok");
  }
}
