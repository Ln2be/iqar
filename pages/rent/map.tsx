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
import {
  Chalet,
  HouseSiding,
  OtherHouses,
  Apartment,
  HomeWork,
  Villa,
} from "@mui/icons-material";
import { FillMapPH } from "../../components/maprent.";

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
        ></Box>
        <FillMapPH posts={posts}></FillMapPH>
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

  const posts = allposts.filter((post) => {
    const isRent =
      (post.type == "demandRent" || post.type == "offerRent") &&
      post.subtype != "stay";
    return post.position && post.position.length > 0 && isRent;
  });

  return {
    props: {
      sposts: JSON.stringify(posts),
    },
  };
}

function IMarkerPH({ post, onClick }: { post: Post; onClick?: () => void }) {
  const color = post.type == "demandRent" ? "green" : "red";
  // const dimension = 10;

  function IconMarker({ post, onClick }: { post: Post; onClick?: () => void }) {
    function categoryPrice(price: number) {
      return price < 50
        ? "price40"
        : 50 <= price && price <= 70
        ? "price60"
        : 80 <= price && price <= 100
        ? "price90"
        : 110 <= price && price <= 130
        ? "price120"
        : 140 <= price && price <= 160
        ? "price150"
        : "price170";
    }

    const priceToIcon = {
      price40: (
        <Chalet
          onClick={onClick}
          sx={{
            color: color,
          }}
        ></Chalet>
      ),
      price60: (
        <HouseSiding
          onClick={onClick}
          sx={{
            color: color,
          }}
          // width={dimension}
          // height={dimension}
        ></HouseSiding>
      ),

      price90: (
        <OtherHouses
          onClick={onClick}
          sx={{
            color: color,
          }}
        ></OtherHouses>
      ),

      price120: (
        <Apartment
          onClick={onClick}
          sx={{
            color: color,
          }}
        ></Apartment>
      ),

      price150: (
        <HomeWork
          onClick={onClick}
          sx={{
            color: color,
          }}
        ></HomeWork>
      ),

      price170: (
        <Villa
          onClick={onClick}
          sx={{
            color: color,
          }}
        ></Villa>
      ),
    };

    return priceToIcon[categoryPrice(post.price)];
  }

  return <IconMarker onClick={onClick} post={post}></IconMarker>;
}
