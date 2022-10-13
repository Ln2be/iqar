import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";
import { Post } from "../../projectTypes";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action, id } = req.query;

  if (action == "save") {
    const post = req.body as Post;
    // const { images } = post;

    const rpost = await new DBPost(post).save();
    res.json({
      id: rpost._id,
    });
  } else if (action == "update") {
    const post = req.body as Post;
    const id = post._id;
    delete post._id;
    // const images = post.images;
    await DBPost.updateOne({ _id: id }, post);
    res.json({
      id: id,
    });
  } else if (action == "delete") {
    const { id } = req.query;
    const rpost = await DBPost.deleteOne({ _id: id });
    res.send("Ok");
    // res.writeHead(302, { Location: "/" }).end(rpost);
  } else if (action == "hide") {
    const { id } = req.query;
    await DBPost.updateOne({ _id: id }, { hidden: true });
    res.send("OK");
  } else if (action == "show") {
    const { id } = req.query;
    await DBPost.updateOne({ _id: id }, { hidden: false });
    res.send("OK");
  } else if (action == "archiveSend") {
    const id = req.query.id;
    const tel = req.query.tel as string;
    const post = (await DBPost.findOne({ _id: id })) as Post;

    // const sendTo = post.sendTo.filter((sentTel) => sentTel != tel);

    const sendToArchive = post.sendToArchive ? post.sendToArchive : [];

    sendToArchive.push(tel);

    await DBPost.updateOne({ _id: id }, { sendToArchive: sendToArchive });
    res.send("OK");
  } else if (action == "restoreSend") {
    const id = req.query.id;
    const tel = req.query.tel as string;
    const post = (await DBPost.findOne({ _id: id })) as Post;

    const sendToArchive = post.sendToArchive.filter(
      (sentTel) => sentTel != tel
    );

    await DBPost.updateOne({ _id: id }, { sendToArchive: sendToArchive });

    res.send("OK");
  } else if (action == "takeback") {
    const id = req.query.id;
    const tel = req.query.tel as string;
    const post = (await DBPost.findOne({ _id: id })) as Post;
    const sendTo = post.sendTo;
    const index = sendTo.indexOf(tel);
    sendTo.splice(index, 1);
    await DBPost.updateOne({ _id: id }, { sendTo: sendTo });
    res.send("OK");
  } else if (action == "savetrack") {
    const track = req.body;
    const post = await DBPost.updateOne(
      { _id: track.postid },
      { track: track }
    );
    res.send("OK");
  } else if (action == "updatetrack") {
    const { trackDate, trackDelay, postid } = req.query;
    const post = await DBPost.findOne({ _id: postid });
    const postLink = post.track.postLink;
    delete post.track;
    await DBPost.updateOne(
      { _id: postid },
      {
        track: {
          postid: postid,
          postLink: postLink,
          trackDate: trackDate,
          trackDelay: trackDelay,
        },
      }
    );
    res.send("Ok")
  }
}
