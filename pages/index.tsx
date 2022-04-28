import React from "react";
import Layout from "../components/layout";
import Image from "next/image";
import { DBPost } from "../lib/mongo";
import { Box } from "@mui/system";
import Router from "next/router";
import { Post } from "../projectTypes";
import { useUser } from "../lib/auth/hooks";
import { DEPARTEMENTS } from "../lib/translate";
import Head from "next/head";
import { Typography } from "@mui/material";

export default function Page({ posts }: { posts: string }) {
  const user = useUser();
  const postsOb = JSON.parse(posts) as [Post];

  const typeArabic: { [key: string]: string } = {
    buying: "شراء",
    selling: "بيع",
    demandRent: "طلب ايجار",
    offerRent: "عرض ايجار",
  };
  return (
    <>
      <Head>
        <title>
          مؤسسة وسيطة لبيع و شراء و ايجار المنازل و الشقق و العقارات بشكل عام في
          نواكشوط موريتانيا
        </title>
        <meta
          name="description"
          content="احصل اعل المنزل او الشقة التي تبحث عنها"
          key="desc"
        />
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
      <Layout>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            maxWidth: "400px",
            p: 2,
          }}
        >
          {postsOb.map((post, i) => {
            const image = post.images[0];
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: 1,
                  borderColor: (theme) => {
                    return theme.palette.primary.light;
                  },
                }}
              >
                {image ? (
                  <Image
                    key={i}
                    layout="responsive"
                    width={image.width}
                    height={image.height}
                    src={image.data}
                    onClick={() => {
                      Router.push("/post?id=" + post._id);
                    }}
                  ></Image>
                ) : (
                  <></>
                )}
                <Typography gutterBottom variant="h6">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      pb: 1,
                      // backgroundColor: (theme) => {
                      //   return theme.palette.primary.light;
                      // },
                      // color: "white",
                    }}
                  >
                    <Box>{typeArabic[post.type]}</Box>
                    <Box>{DEPARTEMENTS[post.departement]}</Box>
                    <Box>{post.region}</Box>
                  </Box>
                </Typography>

                <Typography variant="body2">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {post.details}
                  </Box>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>{post.count}</Box>
                    <Box>{48692007}</Box>
                  </Box>
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  let postsObject = [];
  if (query.type && query.departement) {
    postsObject = await DBPost.find({
      type: query.type,
      departement: query.departement,
    });
  } else if (query.user) {
    postsObject = await DBPost.find({
      user: query.user,
    });
  } else {
    postsObject = await DBPost.find({});
  }

  const posts = JSON.stringify(postsObject);

  return {
    props: {
      posts,
    },
  };
}
