import React, { ReactPropTypes, useState } from "react";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import { Post } from "../projectTypes";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import VillaIcon from "@mui/icons-material/Villa";
import { Box } from "@mui/material";
import { PostCard } from "./cards";
import ChaletIcon from "@mui/icons-material/Chalet";
import { useRouter } from "next/router";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import StoreIcon from "@mui/icons-material/Store";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import HotelIcon from "@mui/icons-material/Hotel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import CropLandscapeIcon from "@mui/icons-material/CropLandscape";

export function PickMap({
  handlePosition,
}: {
  handlePosition: (position: [number, number]) => void;
}) {
  const [anchor, setAnchor] = useState<[number, number]>([18.0782, -15.965]);
  return (
    <Map
      height={300}
      defaultCenter={[18.0782, -15.965]}
      defaultZoom={11}
      onClick={({ event, latLng, pixel }) => {
        setAnchor(latLng);
        handlePosition(latLng);
      }}
    >
      <ZoomControl />

      <Marker width={30} anchor={anchor}></Marker>
    </Map>
  );
}

export function FillMap({ posts }: { posts: Post[] }) {
  const [post, setPost] = useState<Post>();
  const [render, setRender] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");

  const router = useRouter();
  const query = useRouter().query;
  const { action } = query;

  // filter function
  function filterp(post: Post) {
    const isHouseRent =
      post.subtype == "house" ||
      post.subtype == "appartment" ||
      post.subtype == "studio";

    const filterObject: { [key: string]: boolean } = {
      all: true,
      veryLow: isHouseRent && post.price < 50,
      low: isHouseRent && 50 <= post.price && post.price <= 70,
      meduimOne: isHouseRent && 80 <= post.price && post.price <= 100,
      meduimTwo: isHouseRent && 110 <= post.price && post.price <= 130,
      high: isHouseRent && 140 <= post.price && post.price <= 160,
      veryHigh: isHouseRent && 170 <= post.price,
      //
      stay: post.subtype == "stay",
      warehouse: post.subtype == "store",
      shop: post.subtype == "shop",
      other: post.subtype == "other",
      //
      land: post.subtype == "land",
      lowHouse: post.subtype == "house" && post.price <= 10,
      mediumHouse:
        post.subtype == "house" && 10 <= post.price && post.price <= 20,
      highHouse: post.subtype == "house" && 20 <= post.price,
      //
      invest: post.subtype == "invest",
    };

    return filterObject[filter];
  }

  // filtred posts
  const fposts = posts.filter((post) => filterp(post));

  // const [anchor, setAnchor] = useState<[number, number]>([18.0782, -15.965]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 2,
      }}
    >
      {action == "buying" && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: { xs: 1, md: 2 },
            marginBottom: 2,

            // maxWidth: "500px",
          }}
        >
          <CropLandscapeIcon
            onClick={() => {
              setFilter("land");
            }}
            sx={{
              color: "green",
            }}
          ></CropLandscapeIcon>
          <HouseSidingIcon
            onClick={() => {
              setFilter("lowHouse");
            }}
            sx={{
              color: "green",
            }}
          ></HouseSidingIcon>
          <OtherHousesIcon
            onClick={() => {
              setFilter("mediumHouse");
            }}
            sx={{
              color: "green",
            }}
          ></OtherHousesIcon>
          <VillaIcon
            onClick={() => {
              setFilter("highHouse");
            }}
            sx={{
              color: "green",
            }}
          ></VillaIcon>
          <AttachMoneyIcon
            onClick={() => {
              setFilter("invest");
            }}
            sx={{
              color: "green",
            }}
          ></AttachMoneyIcon>
        </Box>
      )}

      {action == "rent" && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: { xs: 1, md: 2 },
            marginBottom: 2,
            // maxWidth: "500px",
          }}
        >
          <ChaletIcon
            onClick={() => {
              setFilter("veryLow");
            }}
            sx={{
              color: "green",
            }}
          ></ChaletIcon>
          <HouseSidingIcon
            onClick={() => {
              setFilter("low");
            }}
            sx={{
              color: "green",
            }}
          ></HouseSidingIcon>
          <OtherHousesIcon
            onClick={() => {
              setFilter("mediumOne");
            }}
            sx={{
              color: "green",
            }}
          ></OtherHousesIcon>
          <ApartmentIcon
            onClick={() => {
              setFilter("mediumTwo");
            }}
            sx={{
              color: "green",
            }}
          ></ApartmentIcon>
          <HomeWorkIcon
            onClick={() => {
              setFilter("high");
            }}
            sx={{
              color: "green",
            }}
          ></HomeWorkIcon>

          <VillaIcon
            onClick={() => {
              setFilter("veryHigh");
            }}
            sx={{
              color: "green",
            }}
          ></VillaIcon>
          <HotelIcon
            onClick={() => {
              setFilter("stay");
            }}
            sx={{
              color: "green",
            }}
          ></HotelIcon>
          <WarehouseIcon
            onClick={() => {
              setFilter("warehouse");
            }}
            sx={{
              color: "green",
            }}
          ></WarehouseIcon>
          <StoreIcon
            onClick={() => {
              setFilter("shop");
            }}
            sx={{
              color: "green",
            }}
          ></StoreIcon>
          <AltRouteIcon
            onClick={() => {
              setFilter("other");
            }}
            sx={{
              color: "green",
            }}
          ></AltRouteIcon>
        </Box>
      )}

      <Map height={500} defaultCenter={[18.0782, -15.965]} defaultZoom={11}>
        <ZoomControl />
        {fposts.map((post, i) => {
          return (
            <Overlay key={i} anchor={post.position}>
              <IMarker
                onClick={() => {
                  setPost(post);
                  setRender(!render);
                }}
                post={post}
              ></IMarker>
            </Overlay>
          );
        })}
        {/* <Marker width={50} anchor={anchor}></Marker> */}
      </Map>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 2,
        }}
      >
        {post && <PostCard type="post" post={post}></PostCard>}
      </Box>
    </Box>
  );
}

// iqar marker

function IMarker({ post, onClick }: { post: Post; onClick?: () => void }) {
  const color = post.type == "demandRent" ? "green" : "yellow";
  const colorB = post.type == "buying" ? "green" : "yellow";
  const lapsedWeeks = post.createdAt && lapsedTime(post.createdAt, 1);
  const dimension = lapsedWeeks && lapsedWeeks <= 7 ? 40 - lapsedWeeks * 5 : 5;
  // const dimension = 10;

  function IconMarker({ post, onClick }: { post: Post; onClick?: () => void }) {
    const isRent = post.type == "demandRent" || post.type == "offerRent";
    const isHouseRent =
      post.subtype == "house" ||
      post.subtype == "appartment" ||
      post.subtype == "studio";
    const isWarhouse = post.subtype == "store";
    const isShop = post.subtype == "shop";
    const isOther = post.subtype == "other";
    const isStay = post.subtype == "stay";

    const isLand = post.subtype == "land";
    const isHouseBuying = post.subtype == "house";
    const isInvest = post.subtype == "invest";

    if (isRent) {
      if (isHouseRent) {
        if (50 <= post.price && post.price <= 70) {
          return (
            <HouseSidingIcon
              onClick={onClick}
              sx={{
                color: color,
              }}
              width={dimension}
              height={dimension}
            ></HouseSidingIcon>
          );
        } else if (80 <= post.price && post.price <= 100) {
          return (
            <OtherHousesIcon
              onClick={onClick}
              sx={{
                color: color,
              }}
              width={dimension}
              height={dimension}
            ></OtherHousesIcon>
          );
        } else if (110 <= post.price && post.price <= 130) {
          return (
            <ApartmentIcon
              onClick={onClick}
              sx={{
                color: color,
              }}
              width={dimension}
              height={dimension}
            ></ApartmentIcon>
          );
        } else if (140 <= post.price && post.price <= 160) {
          return (
            <HomeWorkIcon
              onClick={onClick}
              sx={{
                color: color,
              }}
              width={dimension}
              height={dimension}
            ></HomeWorkIcon>
          );
        } else if (170 <= post.price) {
          return (
            <VillaIcon
              onClick={onClick}
              sx={{
                color: color,
              }}
              width={dimension}
              height={dimension}
            ></VillaIcon>
          );
        } else {
          return (
            <ChaletIcon
              onClick={onClick}
              sx={{
                color: color,
              }}
              width={dimension}
              height={dimension}
            ></ChaletIcon>
          );
        }
      } else if (isWarhouse) {
        return (
          <WarehouseIcon
            onClick={onClick}
            sx={{
              color: color,
            }}
            width={dimension}
            height={dimension}
          ></WarehouseIcon>
        );
      } else if (isShop) {
        return (
          <StoreIcon
            onClick={onClick}
            sx={{
              color: color,
            }}
            width={dimension}
            height={dimension}
          ></StoreIcon>
        );
      } else if (isOther) {
        return (
          <AltRouteIcon
            onClick={onClick}
            sx={{
              color: color,
            }}
            width={dimension}
            height={dimension}
          ></AltRouteIcon>
        );
      } else if (isStay) {
        return (
          <HotelIcon
            onClick={onClick}
            sx={{
              color: color,
            }}
            width={dimension}
            height={dimension}
          ></HotelIcon>
        );
      } else {
        return <div onClick={onClick}>o</div>;
      }
    } else {
      if (isLand) {
        return (
          <CropLandscapeIcon
            onClick={onClick}
            sx={{
              color: colorB,
            }}
            width={dimension}
            height={dimension}
          ></CropLandscapeIcon>
        );
      } else if (isHouseBuying) {
        if (0 <= post.price && post.price <= 10) {
          return (
            <HouseSidingIcon
              onClick={onClick}
              sx={{
                color: colorB,
              }}
              width={dimension}
              height={dimension}
            ></HouseSidingIcon>
          );
        } else if (10 < post.price && post.price <= 20) {
          return (
            <OtherHousesIcon
              onClick={onClick}
              sx={{
                color: colorB,
              }}
              width={dimension}
              height={dimension}
            ></OtherHousesIcon>
          );
        } else if (20 < post.price) {
          return (
            <VillaIcon
              onClick={onClick}
              sx={{
                color: colorB,
              }}
              width={dimension}
              height={dimension}
            ></VillaIcon>
          );
        } else {
          return (
            <VillaIcon
              onClick={onClick}
              sx={{
                color: colorB,
              }}
              width={dimension}
              height={dimension}
            ></VillaIcon>
          );
        }
      } else if (isInvest) {
        return (
          <AttachMoneyIcon
            onClick={onClick}
            sx={{
              color: colorB,
            }}
            width={dimension}
            height={dimension}
          ></AttachMoneyIcon>
        );
      } else {
        return (
          <AttachMoneyIcon
            onClick={onClick}
            sx={{
              color: colorB,
            }}
            width={dimension}
            height={dimension}
          ></AttachMoneyIcon>
        );
      }
    }
  }

  return (
    <>
      <IconMarker onClick={onClick} post={post}></IconMarker>
    </>
  );
}

function lapsedTime(lasttime: number, nbweeks: number) {
  const now = Date.now();

  const diff = now - lasttime;
  const msinweek = 1000 * 3600 * 24 * 7;

  const weeks = diff / msinweek;

  const result = Math.round(weeks / nbweeks);
  return result;
}
