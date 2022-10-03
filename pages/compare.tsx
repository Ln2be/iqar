import React, { useState } from "react";
import Layout from "../components/layout";
import { Box } from "@mui/system";
import { DBPost, DBUser } from "../lib/mongo";
import { Post } from "../projectTypes";

import { PostCard } from "../components/cards";
import { basepath, correctPhone, Nktt, similarsub } from "../lib/myfunctions";
import { useRouter } from "next/router";

// const comparedPosts: number[] = [];
export default function Page({
  postjson,
  opostsjson,
}: {
  postjson: string;
  opostsjson: string;
}) {
  const router = useRouter();
  const posto = JSON.parse(postjson) as Post;
  const posts = JSON.parse(opostsjson) as Post[];

  // const [render, setRender] = useState<boolean>(false);

  // const posts = allposts.filter((post) => !comparedPosts.includes(post._id));

  // if no posts to compare to then go back
  if (posts.length == 0) {
    fetch("/api/compared?finished=true&id=" + posto._id).then(() => {
      router.back();
    });
  }

  // remove the post compared
  function remove(id: number) {
    fetch("/api/compared?id=" + posto._id + "&post=" + id).then(() => {
      router.reload();
    });
    // comparedPosts.push(id);
    // setRender(!render);
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
              if (posto._id && postc._id) {
                // If it's a demand so this post will receive the original post link if not this
                // post will be sent to the "original post" owner
                const id = isdemand ? posto._id : postc._id;
                url = basepath + "/posts?id=" + id;
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
  const postObject = await DBPost.findOne({ _id: query.id }).sort({
    createdAt: -1,
  });

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
  const ncposts1 = oppositeposts.filter(
    (post) => !postObject.comparedTo?.includes(post._id)
  );

  // show only the similar subtypes
  const ncposts = ncposts1.filter((post) =>
    similarsub[postObject.subtype].includes(post.subtype)
  );

  // the posts should be in the same departement
  const deposts = ncposts.filter((value) => {
    const cross = value.departements.filter((value2: string) =>
      wdep.includes(value2)
    );
    return cross.length > 0;
  });

  const pposts = deposts.filter((depost) => {
    return within(postObject.price, depost.price, 50);
  });

  const sposts = pposts.sort((ppost1, ppost2) => {
    if (within(postObject.price, ppost1.price, 20)) {
      return 1;
    } else if (within(postObject.price, ppost2.price, 20)) {
      return -1;
    } else {
      if (ppost1.departements.includes(postObject.departements[0])) {
        return 1;
      } else if (ppost2.departements.includes(postObject.departements[0])) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  sposts.reverse();

  // the posts should be in the range of the price given by the client

  const postjson = JSON.stringify(postObject);
  const opostsjson = JSON.stringify(sposts);

  return {
    props: {
      postjson: postjson,
      opostsjson: opostsjson,
    },
  };
}

function within(price: number, priceC: number, percentage: number) {
  return (
    price * (1 - percentage / 100) <= priceC &&
    priceC <= (percentage / 100 + 1) * price
  );
}
