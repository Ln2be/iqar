import { NextApiRequest, NextApiResponse } from "next";
import { DBPost, DBTrack } from "../../lib/mongo";
import { updateCounter } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  if (action == "save") {
    const track = req.body;
    const { postcount } = track;

    const counter = await updateCounter("tracks");
    track.count = counter;
    const tracksaved = await new DBTrack(track).save();

    // add a trackcount to the post
    await DBPost.updateOne(
      { count: postcount },
      { trackcount: tracksaved.count }
    );

    res.send(tracksaved);
  } else if (action == "update") {
    const updatebody = req.body;
    const { count } = req.query;
    const track = await DBTrack.findOne({ count: count });
    const updates = track.updates;
    updates.push(updatebody);
    await DBTrack.updateOne({ count: count }, { updates: updates });
    res.send({ count });
  } else if (action == "archive") {
    const { count } = req.query;

    const track = await DBTrack.findOne({ count: count });

    // remove the trackcount from the post
    const { postcount } = track;
    await DBPost.updateOne({ count: postcount }, { trackcount: "" });

    await DBTrack.updateOne({ count: count }, { archived: true });
    res
      .writeHead(302, { Location: "/tracks?action=tracks&type=archived" })
      .end();
  } else if (action == "delete") {
    const { count } = req.query;

    const track = await DBTrack.findOne({ count: count });

    // remove the trackcount from the post
    const { postcount } = track;
    await DBPost.updateOne({ count: postcount }, { trackcount: "" });

    await DBTrack.deleteOne({ count: count });
    res
      .writeHead(302, { Location: "/tracks?action=tracks&type=archived" })
      .end();
  } else if (action == "deleteall") {
    await DBTrack.deleteMany({});
    res.send("Ok");
  } else if (action == "restore") {
    const { count } = req.query;

    const track = await DBTrack.findOne({ count: count });

    // remove the trackcount from the post
    const { postcount } = track;
    await DBPost.updateOne({ count: postcount }, { trackcount: count });

    await DBTrack.updateOne({ count: count }, { archived: false });
    res.writeHead(302, { Location: "/tracks?action=tracks" }).end();
  }
}
