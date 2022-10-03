import { NextApiRequest, NextApiResponse } from "next";
import { DBPost } from "../../lib/mongo";
import { Post } from "../../projectTypes";

// see if we are in production or not
// const isProduction = process.env.NODE_ENV === "production";

// const devUrl = "/home/elhassen/Downloads/images/";

// const prodUrl = "/var/www/iqar/images/";

// const site = isProduction ? prodSite : devSite;

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
      id: post._id,
    });
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
  }  else if (action == "takeback") {
    const id = req.query.id;
    const tel = req.query.tel as string;
    const post = (await DBPost.findOne({ _id: id })) as Post;
    const sendTo = post.sendTo;
    const index = sendTo.indexOf(tel);
    sendTo.splice(index, 1);
    await DBPost.updateOne({ _id: id }, { sendTo: sendTo });
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
