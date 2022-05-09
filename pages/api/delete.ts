import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";
import { Post } from "../../projectTypes";
import fs from "fs";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

const devUrl = "/home/elhassen/Downloads/images/";

const prodUrl = "/var/www/iqar/images/";

const url = isProduction ? prodUrl : devUrl;

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = (await DBPost.findOne({ _id: req.query.id })) as Post;
  if (post.images.length > 0) {
    post.images.map((image) => {
      const name = path.basename(image.data);
      fs.unlinkSync(url + name);
    });
  }
  const deletedPost = await DBPost.deleteOne({ _id: req.query.id });
  res.writeHead(302, { Location: "/" });
  res.json(deletedPost);
}
