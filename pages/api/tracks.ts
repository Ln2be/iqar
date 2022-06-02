import { NextApiRequest, NextApiResponse } from "next";
import { DBPost, DBTrack } from "../../lib/mongo";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  if (action == "save") {
    const track = req.body;
    const { postid } = track;
    const tracksaved = await new DBTrack(track).save();

    // add a trackid to the post
    const post = await DBPost.updateOne(
      { _id: postid },
      { trackid: tracksaved._id }
    );

    res.send(tracksaved);
  } else if (action == "track") {
    const { id } = req.query;
    const tracksaved = await DBTrack.find({ _id: id });
    res.send(tracksaved);
  } else if (action == "tracks") {
    const tracksaveds = await DBTrack.find({});
    res.send(tracksaveds);
  } else if (action == "update") {
    const updatebody = req.body;
    const { id } = req.query;
    const track = await DBTrack.findOne({ _id: id });
    const updates = track.updates;
    updates.push(updatebody);
    const updatedtrack = await DBTrack.updateOne(
      { _id: id },
      { updates: updates }
    );
    res.send({ id });
  } else if (action == "archive") {
    const { id } = req.query;

    const track = await DBTrack.findOne({ _id: id });

    // remove the trackid from the post
    const { postid } = track;
    const post = await DBPost.updateOne({ _id: postid }, { trackid: "" });

    const response = await DBTrack.updateOne({ _id: id }, { archived: true });
    res.writeHead(302, { Location: "/" }).end();
  } else if (action == "delete") {
    const { id } = req.query;

    const track = await DBTrack.findOne({ _id: id });

    // remove the trackid from the post
    const { postid } = track;
    const post = await DBPost.updateOne({ _id: postid }, { trackid: "" });

    const response = await DBTrack.deleteOne({ _id: id });
    res.writeHead(302, { Location: "/" }).end();
  } else if (action == "deleteall") {
    const dtracks = await DBTrack.deleteMany({});
    res.send("Ok");
  } else if (action == "restore") {
    const { id } = req.query;

    const track = await DBTrack.findOne({ _id: id });

    // remove the trackid from the post
    const { postid } = track;
    const post = await DBPost.updateOne({ _id: postid }, { trackid: id });

    const response = await DBTrack.updateOne({ _id: id }, { archived: false });
    res.writeHead(302, { Location: "/" }).end();
  }
}
