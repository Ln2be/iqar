import React from "react";
import { NextApiResponse } from "next";
import { DBPost } from "../lib/mongo";
import fs from "fs";

const EXTERNAL_DATA_URL = "https://iqar.store/posts";

function generateSiteMap(posts: [{ [key: string]: string }]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://iqar.store</loc>
     </url>
     <url>
       <loc>https://iqar.store/contactUs</loc>
     </url>
     ${posts
       .map(({ _id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}?id=${_id}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const posts = (await DBPost.find({}).select(["_id"])) as [
    { [key: string]: string }
  ];
  // const posts = JSON.stringify(postsObject);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  fs.writeFileSync("/var/www/iqar/images/" + "sitemap.xml", sitemap);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
