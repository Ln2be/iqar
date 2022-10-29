import React, { ReactPropTypes, useState } from "react";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import { Post } from "../projectTypes";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import VillaIcon from "@mui/icons-material/Villa";
import { Badge, Box } from "@mui/material";
import { PostCard } from "./cards";
import ChaletIcon from "@mui/icons-material/Chalet";
import { useRouter } from "next/router";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import StoreIcon from "@mui/icons-material/Store";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import HotelIcon from "@mui/icons-material/Hotel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import CropLandscapeIcon from "@mui/icons-material/CropLandscape";
import JoinLeftIcon from "@mui/icons-material/JoinLeft";
import RedoIcon from "@mui/icons-material/Redo";
import * as geolib from "geolib";
import { basepath, correctPhone } from "../lib/myfunctions";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
import DeskIcon from "@mui/icons-material/DesktopMac";

export function PickMap({
  position = [18.0782, -15.965],
  zoom = 11,
  handlePosition,
}: {
  position?: [number, number];
  zoom?: number;
  handlePosition: (position: [number, number]) => void;
}) {
  const [anchor, setAnchor] = useState<[number, number]>(position);
  return (
    <Map
      height={300}
      defaultCenter={position}
      defaultZoom={zoom}
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
  const [oPost, setOPost] = useState<Post>();
  const [cPosts, setCPosts] = useState<Post[]>();
  const [render, setRender] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("land");

  const [cPostid, setCPostid] = useState<string>();

  // set badge
  const [badge, setBadge] = useState<string>();

  // function getPost(id: string) {
  //   return posts.filter((post) => (post._id = id))[0];
  // }

  const opposite: { [key: string]: string } = {
    buying: "selling",
  };

  posts =
    cPostid && post?.type == "buying"
      ? posts.filter((upost) => {
          if (upost.position && upost._id && post?.position) {
            const isNearby = geolib.isPointWithinRadius(
              upost.position,
              post.position,
              5000
            );
            const isOpposit = opposite[post.type] == upost.type;
            const notComparedBefore = !post.comparedTo?.includes(upost._id);
            return isNearby && isOpposit && notComparedBefore;
          } else {
            return false;
          }
        })
      : cPostid && post?.type != "buying" && cPosts
      ? cPosts
      : posts;

  const router = useRouter();
  const query = router.query;
  const { action } = query;

  // filter function
  function filterp(post: Post) {
    const filterObject: { [key: string]: boolean } = {
      land: post.subtype == "land",
      lowHouse: post.subtype == "house" && post.price <= 10,
      mediumHouse:
        post.subtype == "house" && 10 < post.price && post.price <= 20,
      highHouse: post.subtype == "house" && 20 < post.price,
      //
      invest: post.subtype == "invest",
    };

    return filterObject[filter];
  }

  // remove the post compared
  function remove(id: string) {
    if (oPost) {
      fetch("/api/compared?id=" + oPost._id + "&post=" + id).then(() => {
        router.reload();
      });
    }
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

      <Map height={500} defaultCenter={[18.0782, -15.965]} defaultZoom={11}>
        <ZoomControl />
        {fposts.map((post, i) => {
          return (
            <Overlay key={i} anchor={post.position}>
              <IMarker
                onClick={() => {
                  setPost(post);
                  if (cPostid) {
                    setCPosts(posts);
                  }
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          {cPostid && (
            <RedoIcon
              sx={{ color: "blue" }}
              onClick={() => {
                setCPostid(undefined);
              }}
            ></RedoIcon>
          )}

          {post && !cPostid && (
            <JoinLeftIcon
              // sx={{ color: "blue" }}
              onClick={() => {
                if (post.type == "offerRent" || post.type == "buying") {
                  setOPost(post);
                  setCPostid(post._id);
                }
              }}
            ></JoinLeftIcon>
          )}
        </Box>

        {post && !cPostid && <PostCard type="post" post={post}></PostCard>}
        {post?._id && cPostid && oPost?._id && (
          <PostCard
            type="compared"
            post={post}
            comparaison={{
              url:
                oPost.type == "offerRent"
                  ? basepath + "/posts?id=" + oPost._id
                  : basepath + "/posts?id=" + post._id,
              tel:
                oPost.type == "offerRent"
                  ? correctPhone(post.tel)
                  : correctPhone(oPost.tel),
              remove: remove,
            }}
          ></PostCard>
        )}
      </Box>
    </Box>
  );
}

// iqar marker

function IMarker({ post, onClick }: { post: Post; onClick?: () => void }) {
  const color = post.type == "demandRent" ? "green" : "red";
  const colorB = post.type == "buying" ? "green" : "red";
  const lapsedWeeks = post.createdAt && lapsedTime(post.createdAt, 1);
  const dimension = lapsedWeeks && lapsedWeeks <= 7 ? 40 - lapsedWeeks * 5 : 5;
  // const dimension = 10;

  function IconMarker({ post, onClick }: { post: Post; onClick?: () => void }) {
    const isLand = post.subtype == "land";
    const isHouseBuying = post.subtype == "house";
    const isInvest = post.subtype == "invest";
    const isOffice = post.subtype == "office";

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

  return <IconMarker onClick={onClick} post={post}></IconMarker>;
}

function lapsedTime(lasttime: Date | number, nbweeks: number) {
  const last = typeof lasttime == "number" ? new Date(lasttime) : lasttime;
  const now = new Date(Date.now());

  const diff = now.getTime() - last.getTime();
  const msinweek = 1000 * 3600 * 24 * 7;

  const weeks = diff / msinweek;

  const result = Math.round(weeks / nbweeks);
  return result;
}

function lapsedTimeDays(lasttime: number) {
  const last = new Date(lasttime);
  const now = new Date(Date.now());

  const diff = now.getTime() - last.getTime();
  const msindays = 1000 * 3600;

  const days = diff / msindays;

  const result = Math.round(days);
  return result;
}
