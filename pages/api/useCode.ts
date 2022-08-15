import { NextApiRequest, NextApiResponse } from "next";
import { DBPost, DBUserCode } from "../../lib/mongo";
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
  const post = await DBUserCode.updateOne(
    { count: req.query.count },
    { $inc: { used: 1 } }
  );

  res.writeHead(302, { Location: "/code/user" });
  res.json({});
}
