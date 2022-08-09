import { NextApiRequest, NextApiResponse } from "next";
import { DBTrack } from "../../lib/mongo";
import fs from "fs";
import { DBCount, DBPost } from "../../lib/mongo";
import { Buffer } from "buffer";
import { Post } from "../../projectTypes";

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

    if (images.length > 0) {
      images.map((image, i) => {
        const data = image.data;

        saveimage(data, async (name) => {
          // save the url of the image
          post.images[i].data = site + name;
          if (i == images.length - 1) {
            const rpost = await new DBPost(req.body).save();

            res.json({
              tel: rpost.tel,
            });
          }
        });
      });
    } else {
      const rpost = await new DBPost(req.body).save();
      res.json({
        tel: rpost.tel,
      });
    }
  } else if (action == "update") {
    const post = req.body as Post;
    const id = post._id;
    delete post._id;
    const images = post.images;
    if (images.length > 0 && images[0].data.startsWith(site)) {
      images.map((image, i) => {
        const data = image.data;

        saveimage(data, async (name) => {
          // save the url of the image
          post.images[i].data = site + name;

          if (i == images.length - 1) {
            const rpost = await DBPost.updateOne({ _id: id }, post);

            res.json({
              id: id,
            });
          }
        });
      });
    } else {
      const rpost = await DBPost.updateOne({ _id: id }, post);
      res.json({
        id: id,
      });
    }
    console.log(action);
  } else if (action == "delete") {
    const { id } = req.query;
    const rpost = await DBPost.deleteOne({ _id: id });
    res.writeHead(302, { Location: "/" }).end(rpost);
  } else if (action == "hide") {
    const { id } = req.query;
    await DBPost.updateOne({ _id: id }, { hidden: true });
    res.send("OK");
  } else if (action == "show") {
    const { id } = req.query;
    await DBPost.updateOne({ _id: id }, { hidden: false });
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
