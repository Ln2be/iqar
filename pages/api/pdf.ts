import { NextApiRequest, NextApiResponse } from "next";
import { DBAdminCode, DBPost, DBUserCode } from "../../lib/mongo";
import { jsPDF } from "jspdf";
import { callAddFont } from "../../lib/Roboto-normal";

export default async function helper(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  const post = await DBPost.findOne({ _id: id });

  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();
  //   jsPDF.API.events.push(["addFonts", callAddFont]);
  doc.setFont("Roboto");

  //   doc.addFont("/cairo.ttf", "roboto", "normal");
  //   doc.setFont("roboto");
  doc.text(post.type, 10, 10);
  //   doc.text(post.id, 10, 20);
  doc.text(post.departement, 10, 30);
  doc.text(post.region, 10, 40);
  doc.text(post.details, 10, 50);

  doc.save("post" + post.id + ".pdf");

  res.send("done");
}
