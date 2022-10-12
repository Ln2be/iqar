import React from "react";
import { Box, Button, Link } from "@mui/material";
import dynamic from "next/dynamic";
import { PickMap } from "../components/map";
import { DBPost } from "../lib/mongo";
import { FillMap } from "../components/map";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import * as geolib from "geolib";

// const Map = dynamic(() => import("../components/map"), {
//   ssr: false,
// });

export default function Page({ sposts }: { sposts: string }) {
  const posts = JSON.parse(sposts);
  const router = useRouter();
  const query = router.query;
  const { action } = query;
  const isRent = action == "rent";
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
        >
          <Link href="/map?action=rent">
            <Button variant={isRent ? "contained" : "outlined"}>الايجار</Button>
          </Link>
          <Link href="/map?action=buying">
            <Button variant={!isRent ? "contained" : "outlined"}>البيع</Button>
          </Link>
        </Box>
        <FillMap posts={posts}></FillMap>
      </Box>
    </Layout>
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

  const { action } = query;

  const posts = allposts.filter((post) => {
    const isRent = post.type == "demandRent" || post.type == "offerRent";
    const isBuying = post.type == "buying" || post.type == "selling";
    const type = action == "rent" ? isRent : isBuying;
    return post.position.length > 0 && type;
  });

  return {
    props: {
      sposts: JSON.stringify(posts),
    },
  };
}
