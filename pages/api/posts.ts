import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";
import { Post } from "../../projectTypes";
import { updateCounter } from "../../lib/mongo";

// see if we are in production or not
// const isProduction = process.env.NODE_ENV === "production";

// const devUrl = "/home/elhassen/Downloads/images/";

// const prodUrl = "/var/www/iqar/images/";

// const site = isProduction ? prodSite : devSite;

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  if (action == "save") {
    const post = req.body as Post;
    // const { images } = post;

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
    // const images = post.images;
    await DBPost.updateOne({ count: count }, post);
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
  } else if (action == "archiveSend") {
    const count = req.query.count;
    const tel = req.query.tel as string;
    const post = (await DBPost.findOne({ count: count })) as Post;

    // const sendTo = post.sendTo.filter((sentTel) => sentTel != tel);

    const sendToArchive = post.sendToArchive ? post.sendToArchive : [];

    sendToArchive.push(tel);

    await DBPost.updateOne({ count: count }, { sendToArchive: sendToArchive });
    res.send("OK");
  } else if (action == "restoreSend") {
    const count = req.query.count;
    const tel = req.query.tel as string;
    const post = (await DBPost.findOne({ count: count })) as Post;

    const sendToArchive = post.sendToArchive.filter(
      (sentTel) => sentTel != tel
    );

    await DBPost.updateOne({ count: count }, { sendToArchive: sendToArchive });

    res.send("OK");
  }
}

// save the image
// function saveimage(imageData: string, callback: (name: string) => void) {
//   // choose a unique name
//   const name: string =
//     Date.now() +
//     "random" +
//     Math.floor(Math.random() * (1000000 - 100000)) +
//     100000 +
//     ".jpeg";

//   // save

//   fs.writeFile(
//     url + name,
//     Buffer.from(imageData.split(",")[1], "base64"),
//     async () => {
//       callback(name);
//     }
//   );
// }
