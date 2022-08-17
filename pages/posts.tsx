import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { DBPost, DBUser } from "../lib/mongo";
import React, { useState } from "react";
import { Post, UserType } from "../projectTypes";
import Head from "next/head";
import Pagination from "@mui/material/Pagination";

import { PostCard, PostForm, UserCard } from "../components/cards";
import Departement from "../components/cards";
import {
  adtypes,
  departements,
  Nktt,
  priceCat,
  subtypes,
  translate,
} from "../lib/myfunctions";
import { useUser } from "../lib/auth/hooks";
import { QueryBuilder } from "@mui/icons-material";

export default function Page({
  result,
  length,
  rep,
}: {
  result: string;
  length: string;
  rep: string;
}) {
  const router = useRouter();
  const user = useUser();
  const { action, location } = router.query;

  // spin if the post is submitted
  const [spin, setSpin] = useState(false);

  // show the posts if they are what is requested
  function rPosts() {
    const posts = JSON.parse(result) as Post[];
    const total = JSON.parse(length);
    const repo = JSON.parse(rep) as UserType[];
    return (
      <Box>
        {router.query.notifyuser ? (
          <Head>
            <title>{repo[0].username}</title>
            <meta property="og:title" content={repo[0].username} />
            <meta property="og:description" content={getDateAr()} />
            <meta
              property="og:image"
              content="https://example.com/images/cool-page.jpg"
            />
          </Head>
        ) : (
          <Head>
            <title>
              مؤسسة وسيطة لبيع و شراء و ايجار المنازل و الشقق و العقارات بشكل
              عام في نواكشوط موريتانيا
            </title>
            <meta property="og:title" content="وسيط بيع و شراء العقارات" />
            <meta
              property="og:description"
              content="تتوفر عقار نواكشوط على الكثير من عروض بيع و شراء و ايجار العقارات"
            />
            <meta
              property="og:image"
              content="https://example.com/images/cool-page.jpg"
            />
          </Head>
        )}

        <Box
          sx={{
            display: "grid",
            gap: 2,
          }}
        >
          {!location && !router.query.codeTel && <Departement></Departement>}
          {router.query.codeTel && repo[0] && (
            <UserCard type="min" user={repo[0]}></UserCard>
          )}
          {posts.map((post, i) => (
            <PostCard key={i} post={post} type="feed"></PostCard>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Pagination
            count={Math.ceil(total / 10)}
            variant="outlined"
            color="secondary"
            onChange={(event, value) => {
              router.query.pagination = value.toString();
              router.push(router);
            }}
          />
        </Box>
      </Box>
    );
  }

  function rUpdate() {
    const post = JSON.parse(result) as Post;

    return (
      <Box>
        <PostForm upost={post}></PostForm>
      </Box>
    );
  }
  function rPost() {
    const post = JSON.parse(result) as Post;

    return (
      <Box>
        {post && (
          <Head>
            <title>{post.details + "انواكشوط موريتانيا   "}</title>
            <meta name="description" content={post.details} key="desc" />
            <meta name="keywords" content={post.details.split(" ").join(",")} />
            <meta
              property="og:title"
              content={
                translate(post.type, adtypes) +
                " \n" +
                translate(post.subtype, subtypes) +
                " \n" +
                translate(post.departements[0], departements) +
                " \n" +
                post.region +
                " \n"
              }
            />
            <meta property="og:description" content={post.details} />
            <meta property="og:image" content={post.images[0]?.data} />
          </Head>
        )}

        {post ? (
          <PostCard post={post} type="post"></PostCard>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              تم حذف المنشور
            </Box>
          </Box>
        )}
      </Box>
    );
  }
  return (
    <Layout>
      <Box>
        {action == "posts" && <Box>{rPosts()}</Box>}
        {action == "form" && (
          <Box>
            {spin ? <Box>{"...جاري رفع المنشور"}</Box> : <PostForm></PostForm>}
          </Box>
        )}
        {action == "update" && <Box>{rUpdate()}</Box>}
        {!action && <Box>{rPost()}</Box>}
      </Box>
    </Layout>
  );
}

// this function excuted in the server
export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  const allposts = await DBPost.find({ hidden: false }).sort({
    createdAt: -1,
  });
  // test if the user is coming with special code

  // const pagination = (query.pagination ? query.pagination : 1) as number;

  // const allposts = allpostsdb.slice((pagination - 1) * 10, pagination * 10);
  // the object to be injected in the post dom
  let injectObject;

  // if requesting all the Posts
  if (query.action == "posts") {
    let posts: Post[] = [];
    let repuser: UserType[] = [];

    // get posts searched for type and departements
    if (query.type && query.departements) {
      const departements = query.departements as unknown as string[];
      // const postsdb = await DBPost.find({
      //   type: query.type,
      //   hidden: false,
      // }).sort({ createdAt: -1 });

      const postsdb = allposts.filter((post) => {
        return post.type == query.type;
      });

      // get the crossed departements posts
      posts = crossedDep(postsdb, departements);

      // get posts searched for type
    } else if (query.type && query.location) {
      const wlocation = Nktt[query.location];

      if (query.type == "rent") {
        const postsdb = allposts.filter((post) => {
          return (
            post.type == "demandRent" ||
            post.type == "offerRent" ||
            post.type == "stay"
          );
        });

        // send the posts if they are in the region
        posts = crossedDep(postsdb, wlocation);
      } else {
        const lowHigh = priceCat[query.type];

        const postsdb = allposts.filter((post) => {
          const boolbuy = post.type == "buying" || post.type == "selling";
          const withinprice =
            lowHigh.low <= post.price && lowHigh.high >= post.price;
          return boolbuy && withinprice;
        });

        posts = crossedDep(postsdb, wlocation);
      }
    } else if (query.type) {
      // posts = await DBPost.find({ type: query.type, hidden: false }).sort({
      //   createdAt: -1,
      // });

      posts = allposts.filter((post) => {
        return post.type == query.type;
      });

      // get posts searched for departements
    } else if (query.departements) {
      // const allposts = await DBPost.find({ hidden: false }).sort({
      //   createdAt: -1,
      // });

      const departements = query.departements as unknown as string[];
      posts = crossedDep(allposts, departements);
    } else if (query.tel) {
      const tel = query.tel;
      // posts = await DBPost.find({ tel: tel }).sort({ createdAt: -1 });
      posts = allposts.filter((post) => {
        return post.tel == tel;
      });
    } else if (query.codeTel) {
      const code = query.codeTel;

      repuser = (await DBUser.find({ tel: code })) as unknown as UserType[];
      // const allposts = await DBPost.find({}).sort({ createdAt: -1 });
      posts = allposts.filter((post) => {
        if (post.sendTo) return post.sendTo.includes(code);
        else return false;
      });
    } else if (query.hidden) {
      // const code = query.codeTel;
      posts = await DBPost.find({ hidden: true }).sort({ createdAt: -1 });
    } else {
      posts = allposts;
    }

    // test if the user is coming with special code

    const pagination = (query.pagination ? query.pagination : 1) as number;

    const postsresult = posts.slice((pagination - 1) * 10, pagination * 10);
    // the object to be injected in the post dom
    const result = JSON.stringify(postsresult);

    const repst = JSON.stringify(repuser);

    injectObject = {
      result: result,
      length: posts.length,
      rep: repst,
    };
  } else if (query.action == "form") {
    injectObject = {
      result: query.action,
    };
  } else if (query.action == "update") {
    const post = await DBPost.findOne({ count: query.count });

    const result = JSON.stringify(post);

    injectObject = {
      result,
    };

    // if requesting one post, whatsapp api contraint prevented me from using an action query here
  } else if (query.count) {
    const post = await DBPost.findOne({ count: query.count });

    const result = JSON.stringify(post);

    injectObject = {
      result,
    };

    // if requesting the form to add new post, no is injected
  } else if (query.notifyuser) {
    const user = await DBUser.findOne({ count: query.notifyuser });

    const departements = user.departements;
    posts = crossedDep(allposts, departements);

    repuser.push(user);

    // test if the user is coming with special code

    const pagination = (query.pagination ? query.pagination : 1) as number;

    const postsresult = posts.slice((pagination - 1) * 10, pagination * 10);
    // the object to be injected in the post dom
    const result = JSON.stringify(postsresult);

    const repst = JSON.stringify(repuser);

    injectObject = {
      result: result,
      length: posts.length,
      rep: repst,
    };
  }

  return {
    props: injectObject,
  };
}

// the return the posts where the departements cross
function crossedDep(posts: Post[], departements: string[]) {
  return posts.filter((post) => {
    // look for a cross between the departements
    const cross = post.departements.filter((departement) =>
      departements.includes(departement)
    );
    // return the post if there is cross
    return cross.length > 0;
  });
}

// get the date in arabic
function getDateAr() {
  const options: { [key: string]: "long" | "short" | "2-digit" | undefined } = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "2-digit",
  };

  const lastnotified = new Date(Date.now()).toLocaleString("Ar-ma", options);
  return lastnotified;
}
