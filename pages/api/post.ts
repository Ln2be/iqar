import { NextApiRequest, NextApiResponse } from "next";
import { DBCount, DBPost } from "../../lib/mongo";
import fs from "fs";
import { Buffer } from "buffer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodyPost = req.body;
  const images = bodyPost.images;

  const devUrl = "/home/elhassen/Downloads/images/";
  const devSite = "http://localhost/images/";

  const prodUrl = "/var/www/iqar/images/";
  const prodSite = "https://iqar.store/images/";

  if (images.length > 0) {
    images.map((image: any, i: number) => {
      const name: string = +Date.now() + ".jpeg";

      fs.writeFileSync(
        prodUrl + name,
        Buffer.from(image.data.split(",")[1], "base64")
      );

      bodyPost.images[i].data = prodSite + name;
    });
  }
  // count the number of posts
  const postCounter =
    (await DBCount.findOne({ name: "user" })) ||
    (await new DBCount({ name: "user" }).save());

  await DBCount.updateOne({ name: "user" }, { count: postCounter.count + 1 });
  // using the database now

  req.body.count = postCounter.count + 1;
  const post = await new DBPost(req.body).save();
  res.json(post);
}
