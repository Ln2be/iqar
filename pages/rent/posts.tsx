import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { DBPost, DBUser } from "../../lib/mongo";
import { Post, UserType } from "../../projectTypes";
import Head from "next/head";
import Pagination from "@mui/material/Pagination";

import { PostCard, PostRentForm, SearchForm } from "../../components/cards";
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
  const { action, location, type } = router.query;
  const user = useUser();

  const posts = JSON.parse(result) as Post[];
  const total = JSON.parse(length);
  // spin if the post is submitted
  // const [spin, setSpin] = useState(false);

  // show the posts if they are what is requested
  function rPosts() {
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
          {!location && !router.query.codeTel && !router.query.notifyuser && (
            <SearchForm></SearchForm>
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

  function rentUpdate() {
    const post = result && (JSON.parse(result)[0] as Post);

    return post && <PostRentForm upost={post}></PostRentForm>;
  }

  return (
    <Layout>
      <Box>
        {(action == "offer" || action == "buying") && <Box>{rPosts()}</Box>}
        {action == "update" && <Box>{rentUpdate()}</Box>}
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
  const allposts_old = await DBPost.find({ hidden: false }).sort({
    createdAt: -1,
  });

  const action = query.action;

  const allposts = allposts_old.filter(
    (post) =>
      post.type == "demandRent" ||
      post.type == "offerRent" ||
      post.type == "stay"
  );
  // test if the user is coming with special code

  // const pagination = (query.pagination ? query.pagination : 1) as number;

  // const allposts = allpostsdb.slice((pagination - 1) * 10, pagination * 10);
  // the object to be injected in the post dom
  let fposts = allposts;

  //

  // if requesting all the Posts
  if (action == "offer") {
    fposts = allposts.filter((post) => post.type == "offerRent");
  }

  if (action == "demand") {
    fposts = allposts.filter((post) => post.type == "demandRent");
  }

  if (action == "update") {
    const id = query.id;
    fposts = allposts.filter((post) => post._id == id);
  }
  // repuser.push(user);

  // test if the user is coming with special code

  const pagination = (query.pagination ? query.pagination : 1) as number;

  const postsresult = fposts.slice((pagination - 1) * 10, pagination * 10);
  // the object to be injected in the post dom
  const result = JSON.stringify(postsresult);

  return {
    props: { result: result, length: fposts.length },
  };
}

// // the return the posts where the departements cross
// function crossedDep(posts: Post[], departements: string[]) {
//   return posts.filter((post) => {
//     // look for a cross between the departements
//     const cross = post.departements.filter((departement) =>
//       departements.includes(departement)
//     );
//     // return the post if there is cross
//     return cross.length > 0;
//   });
// }

// // get the date in arabic
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
