import React from "react";
import { Box, Button, Link } from "@mui/material";
import dynamic from "next/dynamic";
import { PickMap } from "../../components/map";
import { DBPost } from "../../lib/mongo";
import { FillMap } from "../../components/mapbuy";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import * as geolib from "geolib";
import { Post } from "../../projectTypes";

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
        {action == "buying" && <FillMap posts={posts}></FillMap>}
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

  posts = allposts.filter((post) => {
    const isBuying = post.type == "buying" || post.type == "selling";
    return post.position && post.position.length > 0 && isBuying;
  });

  return {
    props: {
      sposts: JSON.stringify(posts),
    },
  };
}
