import { NextApiRequest, NextApiResponse } from "next";
import { DBTrack } from "../../lib/mongo";
import fs from "fs";
import { DBCounter, DBPost } from "../../lib/mongo";
import { Buffer } from "buffer";
import { Post } from "../../projectTypes";
import { updateCounter } from "../../lib/mongo";

// see if we are in production or not
const isProduction = process.env.NODE_ENV === "production";

const devUrl = "/home/elhassen/Downloads/images/";
const devSite = "http://localhost/images/";

const prodUrl = "/var/www/iqar/images/";
const prodSite = "https://iqar.store/images/";

const url = isProduction ? prodUrl : devUrl;
const site = isProduction ? prodSite : devSite;

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  if (action == "save") {
    const post = req.body as Post;
    const { images } = post;

    // add the counter
    const counter = await updateCounter("posts");

    post.count = counter;
    const rpost = await new DBPost(post).save();
    res.json({
      count: rpost.count,
    });
  } else if (action == "update") {
    const post = req.body as Post;
    const count = post.count;
    delete post._id;
    const images = post.images;
    const rpost = await DBPost.updateOne({ count: count }, post);
    res.json({
      count: post.count,
    });
  } else if (action == "delete") {
    const { count } = req.query;
    const rpost = await DBPost.deleteOne({ count: count });
    res.writeHead(302, { Location: "/" }).end(rpost);
  } else if (action == "hide") {
    const { count } = req.query;
    await DBPost.updateOne({ count: count }, { hidden: true });
    res.send("OK");
  } else if (action == "show") {
    const { count } = req.query;
    await DBPost.updateOne({ count: count }, { hidden: false });
    res.send("OK");
  } else if (action == "removeSend") {
    const { count, tel } = req.query;
    const post = (await DBPost.findOne({ count: count })) as Post;

    const sendTo = post.sendTo.filter((sentTel) => sentTel != tel);

    const update = await DBPost.updateOne({ count: count }, { sendTo: sendTo });
    res.send("OK");
  }
}

// save the image
function saveimage(imageData: string, callback: (name: string) => void) {
  // choose a unique name
  const name: string =
    Date.now() +
    "random" +
    Math.floor(Math.random() * (1000000 - 100000)) +
    100000 +
    ".jpeg";

  // save

  fs.writeFile(
    url + name,
    Buffer.from(imageData.split(",")[1], "base64"),
    async () => {
      callback(name);
    }
  );
}
