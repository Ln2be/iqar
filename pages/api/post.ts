import { NextApiRequest, NextApiResponse } from "next";
import { DBCount, DBPost } from "../../lib/mongo";
import fs from "fs";
import { Buffer } from "buffer";
import { basepath } from "../../lib/myfunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodyPost = req.body;
  const images = bodyPost.images;

  const isProduction = process.env.NODE_ENV === "production";

  const devUrl = "/home/elhassen/Downloads/images/";
  const devSite = "http://localhost/images/";

  const prodUrl = "/var/www/iqar/images/";
  const prodSite = basepath + "/images/";

  const url = isProduction ? prodUrl : devUrl;
  const site = isProduction ? prodSite : devSite;

  if (
    (images.length > 0 && !bodyPost._id) ||
    (bodyPost._id && bodyPost.imageUpdated && images.length > 0)
  ) {
    images.map((image: any, i: number) => {
      const name: string =
        Date.now() +
        "random" +
        Math.floor(Math.random() * (1000000 - 100000)) +
        100000 +
        ".jpeg";

      fs.writeFile(
        url + name,
        Buffer.from(image.data.split(",")[1], "base64"),
        async () => {
          bodyPost.images[i].data = site + name;
          if (images.length == i + 1) {
            if (bodyPost._id) {
              const post = await DBPost.updateOne(
                { _id: bodyPost._id },
                bodyPost
              );
              res.json(post);
            } else {
              // count the number of posts
              const postCounter =
                (await DBCount.findOne({ name: "user" })) ||
                (await new DBCount({ name: "user" }).save());

              await DBCount.updateOne(
                { name: "user" },
                { count: postCounter.count + 1 }
              );
              // using the database now

              req.body.count = postCounter.count + 1;
              const post = await new DBPost(req.body).save();
              res.json(post);
            }
          }
        }
      );
    });
  } else {
    if (bodyPost._id) {
      const post = await DBPost.updateOne({ _id: bodyPost._id }, bodyPost);
      res.json(post);
    } else {
      // count the number of posts
      const postCounter =
        (await DBCount.findOne({ name: "user" })) ||
        (await new DBCount({ name: "user" }).save());

      await DBCount.updateOne(
        { name: "user" },
        { count: postCounter.count + 1 }
      );
      // using the database now

      req.body.count = postCounter.count + 1;
      const post = await new DBPost(req.body).save();
      res.json(post);
    }
  }
}
