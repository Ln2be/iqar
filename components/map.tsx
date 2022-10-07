import React, { useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { Post } from "../projectTypes";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import VillaIcon from "@mui/icons-material/Villa";

export function PickMap({
  handlePosition,
}: {
  handlePosition: (position: [number, number]) => void;
}) {
  const [anchor, setAnchor] = useState<[number, number]>([18.0782, -15.965]);
  return (
    <Map
      height={500}
      defaultCenter={[18.0782, -15.965]}
      defaultZoom={11}
      onClick={({ event, latLng, pixel }) => {
        setAnchor(latLng);
        handlePosition(latLng);
      }}
    >
      <Marker width={50} anchor={anchor}></Marker>
    </Map>
  );
}

export function FillMap({ posts }: { posts: Post[] }) {
  // const [anchor, setAnchor] = useState<[number, number]>([18.0782, -15.965]);
  return (
    <Map height={300} defaultCenter={[18.0782, -15.965]} defaultZoom={11}>
      <ZoomControl />
      {posts.map((post, i) => {
        return (
          <Marker key={i} anchor={post.position}>
            <IMarker post={post}></IMarker>
          </Marker>
        );
      })}
      {/* <Marker width={50} anchor={anchor}></Marker> */}
    </Map>
  );
}

// iqar marker

function IMarker({ post }: { post: Post }) {
  const color = post.type == "demandRent" ? "green" : "yellow";
  const lapsedWeeks = post.createdAt && lapsedTime(post.createdAt, 1);
  const dimension = lapsedWeeks && lapsedWeeks <= 7 ? 40 - lapsedWeeks * 5 : 5;
  // const dimension = 10;

  function IconMarker({ post }: { post: Post }) {
    if (60 <= post.price && post.price <= 70) {
      return (
        <HouseSidingIcon
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
          sx={{
            color: color,
          }}
          width={dimension}
          height={dimension}
        ></VillaIcon>
      );
    } else {
      return <>c</>;
    }
  }

  return (
    <>
      <IconMarker post={post}></IconMarker>
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
