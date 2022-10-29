import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { DBPost, DBUser } from "../../lib/mongo";
import { Post, UserType } from "../../projectTypes";
import Head from "next/head";
import Pagination from "@mui/material/Pagination";

import {
  PostCard,
  PostForm,
  UserCard,
  SearchForm,
} from "../../components/cards";
import {
  adtypes,
  departements,
  Nktt,
  priceCat,
  subtypes,
  translate,
  whichSubtype,
} from "../../lib/myfunctions";
import { useUser } from "../../lib/auth/hooks";
// import { QueryBuilder } from "@mui/icons-material";

export default function Page({
  result,
  length,
}: {
  result: string;
  length: string;
}) {
  const router = useRouter();
  // const user = useUser();
  const { action, location } = router.query;
  const user = useUser();

  // spin if the post is submitted
  // const [spin, setSpin] = useState(false);

  // show the posts if they are what is requested
  function rPosts() {
    const posts = JSON.parse(result) as Post[];
    const total = JSON.parse(length);
    return (
      <Box>
        <Head>
          <title>
            مؤسسة وسيطة لبيع و شراء و ايجار المنازل و الشقق و العقارات بشكل عام
            في نواكشوط موريتانيا
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

        <Box
          sx={{
            display: "grid",
            gap: 2,
          }}
        >
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
                translate(post.subtype, subtypes[whichSubtype(post.type)]) +
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
        {(action == "posts" || action == "buying" || action == "selling") && (
          <Box>{rPosts()}</Box>
        )}
        {action == "form" && <PostForm></PostForm>}
        {action == "update" && <Box>{rUpdate()}</Box>}
        {action == "post" && <Box>{rPost()}</Box>}
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
  const allpostsdb = await DBPost.find({ hidden: false }).sort({
    createdAt: -1,
  });

  const allposts = allpostsdb.filter(
    (post) => post.type == "buying" || post.type == "selling"
  );
  const buyingposts = allposts.filter((post) => post.type == "buying");
  const sellingposts = allposts.filter((post) => post.type == "selling");
  // test if the user is coming with special code

  // const pagination = (query.pagination ? query.pagination : 1) as number;

  // const allposts = allpostsdb.slice((pagination - 1) * 10, pagination * 10);
  // the object to be injected in the post dom

  //

  // if requesting all the Posts
  let posts: Post[] = [];
  if (query.action == "posts") {
    posts = allposts;

    // test if the user is coming with special code
  } else if (query.action == "buying") {
    posts = buyingposts;
  } else if (query.action == "selling") {
    posts = sellingposts;
  } else if (query.action == "post") {
    posts = allposts.filter((post) => (post._id = query.id));
  }

  const pagination = (query.pagination ? query.pagination : 1) as number;

  const postsresult = posts.slice((pagination - 1) * 10, pagination * 10);
  // the object to be injected in the post dom
  const result = JSON.stringify(postsresult);

  const injectObject = {
    result: result,
    length: posts.length,
  };
  return {
    props: injectObject,
  };
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
