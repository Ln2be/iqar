import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PickMap } from "../components/map";
import { DBPost } from "../lib/mongo";
import { FillMap } from "../components/map";

// const Map = dynamic(() => import("../components/map"), {
//   ssr: false,
// });

export default function Page({ sposts }: { sposts: string }) {
  const posts = JSON.parse(sposts);
  console.log("post length=", posts.length);
  return (
    <Box>
      <FillMap posts={posts}></FillMap>
    </Box>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  const allposts = await DBPost.find({ hidden: false }).sort({
    createdAt: -1,
  });

  const posts = allposts.filter((post) => {
    const isRent = post.type == "demandRent" || post.type == "offerRent";
    return post.position.length > 0 && isRent;
  });

  return {
    props: {
      sposts: JSON.stringify(posts),
    },
  };
}
