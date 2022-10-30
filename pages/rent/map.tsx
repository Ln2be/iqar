import React from "react";
import { Box, Button, Link } from "@mui/material";
import dynamic from "next/dynamic";
import { PickMap } from "../../components/map";
import { DBPost } from "../../lib/mongo";
import { FillMap } from "../../components/map";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import * as geolib from "geolib";
import { Post } from "../../projectTypes";
import { FillMapO, FillMapPH, FillMapS } from "../../components/maprent.";

// const Map = dynamic(() => import("../components/map"), {
//   ssr: false,
// });

export default function Page({ sposts }: { sposts: string }) {
  const posts = JSON.parse(sposts);
  const router = useRouter();
  const query = router.query;
  const { action } = query;
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* switch between rent and buy */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        ></Box>
        {action == "houseprice" && <FillMapPH posts={posts}></FillMapPH>}
        {action == "stay" && <FillMapS posts={posts}></FillMapS>}
        {action == "other" && <FillMapO posts={posts}></FillMapO>}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  const allposts = (await DBPost.find({ hidden: false }).sort({
    createdAt: -1,
  })) as Post[];

  const { action } = query;
  let posts: Post[] = [];

  if (action == "houseprice") {
    posts = allposts.filter((post) => {
      const isRent =
        (post.type == "demandRent" || post.type == "offerRent") &&
        post.subtype != "stay";
      return post.position && post.position.length > 0 && isRent;
    });
  } else if (action == "other") {
    posts = allposts.filter((post) => {
      const isRent =
        (post.type == "demandRent" || post.type == "offerRent") &&
        post.subtype != "stay";

      const isOther =
        post.subtype == "shop" ||
        post.subtype == "store" ||
        post.subtype == "office" ||
        post.subtype == "other";
      return post.position && post.position.length > 0 && isRent && isOther;
    });
  } else if (action == "stay") {
    posts = allposts.filter((post) => {
      const isRent = post.type == "stay";

      return post.position && post.position.length > 0 && isRent;
    });
    console.log(posts.length);
  }

  return {
    props: {
      sposts: JSON.stringify(posts),
    },
  };
}
