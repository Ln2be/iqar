import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { DBPost } from "../lib/mongo";
import React from "react";
import { Post } from "../projectTypes";
import Head from "next/head";

import { PostCard, PostForm } from "../components/cards";
import Departement from "../components/cards";
import {
  DEPARTEMENTS,
  subtypeArabic,
  subtypes,
  typeArabic,
} from "../lib/myfunctions";

export default function Page({ result }: { result: string }) {
  const router = useRouter();
  const { action } = router.query;

  // save the post to the database
  function handleSubmit(result: any) {
    console.log(result);
    fetch("/api/posts?action=save", {
      method: "POST",
      body: JSON.stringify(result),
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((rpost) => {
        router.push("/posts?action=post&id=" + rpost.id);
      });
    });
  }

  // show the posts if they are what is requested
  function rPosts() {
    const posts = JSON.parse(result) as Post[];

    return (
      <Box
        sx={{
          display: "grid",
          gap: 2,
        }}
      >
        <Departement></Departement>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} type="feed"></PostCard>
        ))}
      </Box>
    );
  }

  function rPost() {
    const post = JSON.parse(result) as Post;

    return (
      <Box>
        <Head>
          <title>{post.details + "انواكشوط موريتانيا   "}</title>
          <meta name="description" content={post.details} key="desc" />
          <meta
            property="og:title"
            content={
              typeArabic[post.type] +
              " \n" +
              subtypeArabic[post.subtype] +
              " \n" +
              DEPARTEMENTS[post.departements[0]] +
              " \n" +
              post.region +
              " \n"
            }
          />
          <meta property="og:description" content={post.details} />
          <meta property="og:image" content={post.images[0]?.data} />
        </Head>
        <PostCard post={post} type="full"></PostCard>
      </Box>
    );
  }
  return (
    <Layout>
      <Box>
        {action == "posts" && <Box>{rPosts()}</Box>}
        {action == "form" && (
          <Box>
            <PostForm onSubmit={handleSubmit}></PostForm>
          </Box>
        )}
        {action == "update" && (
          <Box>
            <PostForm onSubmit={handleSubmit} update></PostForm>
          </Box>
        )}
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
  // the object to be injected in the post dom
  let injectObject;

  // if requesting all the Posts
  if (query.action == "posts") {
    let posts;

    // get posts searched for type and departements
    if (query.type && query.departements) {
      const departements = query.departements as unknown as string[];
      const postsdb = await DBPost.find({
        type: query.type,
      }).sort({ createdAt: -1 });

      // get the crossed departements posts
      posts = crossedDep(postsdb, departements);

      // get posts searched for type
    } else if (query.type) {
      posts = await DBPost.find({ type: query.type }).sort({ createdAt: -1 });

      // get posts searched for departements
    } else if (query.departements) {
      const allposts = await DBPost.find({}).sort({ createdAt: -1 });

      const departements = query.departements as unknown as string[];
      posts = crossedDep(allposts, departements);
    } else {
      posts = await DBPost.find({}).sort({ createdAt: -1 });
    }

    const result = JSON.stringify(posts);

    injectObject = {
      result,
    };
  } else if (query.action == "form" || query.action == "update") {
    injectObject = {
      result: query.action,
    };

    // if requesting one post
  } else {
    const post = await DBPost.findOne({ _id: query.id });

    const result = JSON.stringify(post);

    injectObject = {
      result,
    };

    // if requesting the form to add new post, no is injected
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
