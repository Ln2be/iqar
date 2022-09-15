import React, { useState } from "react";
import Layout from "../components/layout";
import { Box } from "@mui/system";
import { DBPost, DBUser } from "../lib/mongo";
import { Post } from "../projectTypes";

import { PostCard } from "../components/cards";
import { basepath, correctPhone, Nktt } from "../lib/myfunctions";
import { useRouter } from "next/router";

const comparedPosts: number[] = [];
export default function Page({
  postjson,
  opostsjson,
}: {
  postjson: string;
  opostsjson: string;
}) {
  const router = useRouter();
  const posto = JSON.parse(postjson) as Post;
  const allposts = JSON.parse(opostsjson) as Post[];

  const [render, setRender] = useState<boolean>(false);

  const posts = allposts.filter((post) => !comparedPosts.includes(post.count));

  // if no posts to compare to then go back
  if (posts.length == 0) {
    fetch("/api/compared?finished=true&count=" + posto.count).then(() => {
      router.back();
    });
  }

  // remove the post compared
  function remove(count: number) {
    comparedPosts.push(count);
    setRender(!render);
  }

  return (
    <>
      <Layout>
        <>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              maxWidth: "400px",
              mb: 2,
            }}
          >
            {posto && <PostCard post={posto} type="comparing"></PostCard>}
          </Box>
          <Box
            sx={{
              display: "grid",
              gap: 4,
              maxWidth: "400px",
            }}
          >
            {posts.map((postc, i) => {
              // is the post a demand post so send him the offer. If not send it to the original post
              const isdemand =
                postc.type == "buying" || postc.type == "demandRent";
              let url = "";
              if (posto.count && postc.count) {
                // If it's a demand so this post will receive the original post link if not this
                // post will be sent to the "original post" owner
                const count = isdemand ? posto.count : postc.count;
                url = basepath + "/posts?count=" + count;
              }

              // if the nature is "demand" send the post to the owner of the "original post".
              const tel = isdemand
                ? correctPhone(postc.tel)
                : correctPhone(posto.tel);
              return (
                <PostCard
                  key={i}
                  type="compared"
                  post={postc}
                  comparaison={{
                    url: url,
                    tel: tel,
                    remove: remove,
                  }}
                ></PostCard>
              );
            })}
          </Box>
        </>
      </Layout>
    </>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  const postObject = await DBPost.findOne({ count: query.count });

  // which Nouakchott district the post belong to
  const nn = Nktt["nn"];
  const ns = Nktt["ns"];
  const nw = Nktt["nw"];

  const departements = postObject.departements;
  const inNN = departements.filter((value2: string) => nn.includes(value2));
  const inNS = departements.filter((value2: string) => ns.includes(value2));
  const inNW = departements.filter((value2: string) => nw.includes(value2));

  const cnn = inNN.length > 0 ? nn : [];
  const cns = inNS.length > 0 ? ns : [];
  const cnw = inNW.length > 0 ? nw : [];

  const wdep = cnn.concat(cns).concat(cnw);
  const type = postObject.type;
  // const price = postObject.price;

  // send reps who are working in the departement
  const reps = await DBUser.find({ role: "rep" });

  const repsdep = reps.filter((value) => {
    const cross = value.departements.filter((value2: string) =>
      departements.includes(value2)
    );
    return cross.length > 0;
  });

  const repsObject = repsdep.filter(
    (rep) => !postObject.comparedTo?.includes(rep.count)
  );

  // send the opposite posts: if selling the opposite is buying
  const opposite: { [key: string]: string } = {
    selling: "buying",
    buying: "selling",
    demandRent: "offerRent",
    offerRent: "demandRent",
  };
  const oppositetype = opposite[type];
  const oppositeposts = await DBPost.find({ type: oppositetype }).sort({
    createdAt: -1,
  });

  // the post shouldn't be already compared to this post
  const ncposts = oppositeposts.filter(
    (post) => !postObject.comparedTo?.includes(post.count)
  );

  // the posts should be in the same departement
  const deposts = ncposts.filter((value) => {
    const cross = value.departements.filter((value2: string) =>
      wdep.includes(value2)
    );
    return cross.length > 0;
  });

  // the posts should be in the range of the price given by the client
  const pposts = deposts.filter((depost) => {
    const deprice = depost.price;
    if (
      postObject.type == "demandRent" ||
      postObject.type == "demandRent" ||
      postObject.type == "stay"
    ) {
      return true;
    } else {
      const lowprice = postObject.price > 0 && postObject.price <= 4;
      const mediumprice = postObject.price > 4 && postObject.price <= 10;
      const highprice = postObject.price > 10 && postObject.price <= 20;
      const veryhighprice = postObject.price > 20 && postObject.price <= 200;

      if (lowprice) {
        return deprice > 0 && deprice <= 4;
      } else if (mediumprice) {
        return deprice > 4 && deprice <= 10;
      } else if (highprice) {
        return deprice > 10 && deprice <= 20;
      } else if (veryhighprice) {
        return deprice > 20 && deprice <= 200;
      }
    }
  });

  const postjson = JSON.stringify(postObject);
  const opostsjson = JSON.stringify(pposts);
  const repsjson =
    type == "buying" || type == "demandRent"
      ? JSON.stringify(repsObject)
      : "[]";

  return {
    props: {
      postjson: postjson,
      repsjson: repsjson,
      opostsjson: opostsjson,
    },
  };
}
