import React, { ReactPropTypes, useState } from "react";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import { Post } from "../projectTypes";
import { useRouter } from "next/router";
import { Badge, Box, Button } from "@mui/material";
import { PostCard } from "./cards";
import {
  HouseSiding,
  OtherHouses,
  Apartment,
  HomeWork,
  Villa,
  Chalet,
  Warehouse,
  Store,
  AltRoute,
  Hotel,
  AttachMoney,
  CropLandscape,
  JoinLeft,
  Redo,
  AvTimer,
  SpatialTracking,
} from "@mui/icons-material";

import { basepath, correctPhone, getMapregion } from "../lib/myfunctions";

export function FillMapPH({ posts }: { posts: Post[] }) {
  const [gposti, setGPostI] = useState<number>();
  const [render, setRender] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("price40");
  const [type, setType] = useState<string>();

  const [state, setState] = useState<string>("contact");

  const [cpost, setCPost] = useState<Post>();
  const oposts = posts.filter(
    (post) =>
      post.type == "offerRent" &&
      post.mapregion &&
      post.mapregion != "None" &&
      categoryPrice(post.price) == filter
  );

  const gposts: Post[][] = [];

  ["Tayaret", "Ksar", "TevreghZeina", "Capital", "Arafat"].map((region) => {
    const rposts = posts.filter(
      (post) =>
        post.type == "demandRent" &&
        post.mapregion == region &&
        categoryPrice(post.price) == filter
    );
    if (rposts.length > 0 && type != "compare") {
      gposts.push(rposts);
    }
  });

  const cposts: Post[][] = [];

  if (state == "comparison" && gposti != undefined && cpost) {
    const tposts = gposts.filter((post) => {
      return post[0].mapregion == cpost.mapregion;
    })[0];

    const tnposts = tposts.filter(
      (cpost) => cpost._id && !cpost.comparedTo?.includes(cpost._id)
    );

    cposts.push(tposts);
  }

  const router = useRouter();
  const query = router.query;

  const filterPanel = (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: { xs: 1, md: 2 },
        marginBottom: 2,
        // maxWidth: "500px",
      }}
    >
      <Chalet
        onClick={() => {
          setFilter("price40");
          setGPostI(undefined);
        }}
        sx={{
          color: "green",
        }}
      ></Chalet>
      <HouseSiding
        onClick={() => {
          setFilter("price60");
          setGPostI(undefined);
        }}
        sx={{
          color: "green",
        }}
      ></HouseSiding>
      <OtherHouses
        onClick={() => {
          setFilter("price90");
          setGPostI(undefined);
        }}
        sx={{
          color: "green",
        }}
      ></OtherHouses>
      <Apartment
        onClick={() => {
          setFilter("price120");
          setGPostI(undefined);
        }}
        sx={{
          color: "green",
        }}
      ></Apartment>
      <HomeWork
        onClick={() => {
          setFilter("price150");
          setGPostI(undefined);
        }}
        sx={{
          color: "green",
        }}
      ></HomeWork>

      <Villa
        onClick={() => {
          setFilter("170");
          setGPostI(undefined);
        }}
        sx={{
          color: "green",
        }}
      ></Villa>
    </Box>
  );
  // filter function

  // remove the post compared
  function remove(id: string) {
    if (cpost) {
      fetch("/api/compared?id=" + cpost._id + "&post=" + id).then(() => {
        router.reload();
      });
    }
  }

  // const [anchor, setAnchor] = useState<[number, number]>([18.0782, -15.965]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 2,
      }}
    >
      {filterPanel}
      <Map height={500} defaultCenter={[18.0782, -15.965]} defaultZoom={11}>
        <ZoomControl />
        {gposts.length > 0 &&
          !cpost &&
          gposts.map((gpost, i) => {
            const length = gpost.length;
            const post = gpost[0];

            return (
              <Overlay key={i} anchor={post.position}>
                <Badge badgeContent={length} color="primary">
                  <IMarkerPH
                    onClick={() => {
                      setGPostI(i);
                      setType("demand");
                      // if (cPostid) {
                      //   setCPosts(posts);
                      // }
                      setRender(!render);
                    }}
                    post={post}
                  ></IMarkerPH>
                </Badge>
              </Overlay>
            );
          })}
        {oposts.map((post, i) => {
          return (
            <Overlay key={i} anchor={post.position}>
              <IMarkerPH
                onClick={() => {
                  setGPostI(i);
                  setType("offer");
                  if (state == "comparison") {
                    setCPost(post);
                  }
                  // setRender(!render);
                }}
                post={post}
              ></IMarkerPH>
            </Overlay>
          );
        })}
        {cpost &&
          cposts.length > 0 &&
          cposts.map((gpost, i) => {
            const length = gpost.length;
            const post = gpost[0];

            return (
              <Overlay key={i} anchor={post.position}>
                <Badge badgeContent={length} color="primary">
                  <IMarkerPH
                    onClick={() => {
                      setGPostI(i);
                      setType("demand");
                      // if (cPostid) {
                      //   setCPosts(posts);
                      // }
                      setRender(!render);
                    }}
                    post={post}
                  ></IMarkerPH>
                </Badge>
              </Overlay>
            );
          })}
      </Map>

      <Box>
        {state == "contact" ? (
          <Button
            variant="outlined"
            onClick={() => {
              setState("comparison");
            }}
          >
            مقارنة
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setState("contact");
              setCPost(undefined);
            }}
          >
            رجوع
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
          gap: { xs: 1, md: 2 },
          marginTop: 2,
        }}
      >
        {state == "contact" &&
          (gposti != undefined && type == "demand"
            ? gposts[gposti].map((gpost, i) => (
                <PostCard key={i} type="post" post={gpost}></PostCard>
              ))
            : gposti != undefined &&
              type == "offer" && (
                <PostCard type="post" post={oposts[gposti]}></PostCard>
              ))}
        {state == "comparison" &&
          cposts &&
          type == "demand" &&
          cpost &&
          cposts[0].map((gpost, i) => (
            <PostCard
              key={i}
              type="compared"
              post={gpost}
              comparaison={{
                url: cpost.details + "\n" + basepath + "/posts?id=" + cpost._id,
                tel: correctPhone(gpost.tel),
                remove: remove,
              }}
            ></PostCard>
          ))}
      </Box>
    </Box>
  );
}

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

function IMarkerPH({ post, onClick }: { post: Post; onClick?: () => void }) {
  const color = post.type == "demandRent" ? "green" : "red";
  // const dimension = 10;

  function IconMarker({ post, onClick }: { post: Post; onClick?: () => void }) {
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
// iqar marker
