import React from "react";
import Layout from "../components/layout";
import Image from "next/image";
import { Box } from "@mui/system";
import { DBPost } from "../lib/mongo";
import { useUser } from "../lib/auth/hooks";
import { Post } from "../projectTypes";
import Head from "next/head";
import WhatsappButton from "../components/whatsapp";
import NumberFormat from "react-number-format";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import image from "next/image";
import router from "next/router";
import { WhatsappShareButton } from "react-share";
import { DEPARTEMENTS } from "../lib/translate";
import Link from "next/link";

export default function Page({ postjson }: { postjson: string }) {
  const user = useUser();

  const post = JSON.parse(postjson) as Post;
  // const post = null;

  const typeArabic: { [key: string]: string } = {
    buying: "شراء",
    selling: "بيع",
    demandRent: "طلب ايجار",
    offerRent: "عرض ايجار",
  };
  return (
    <>
      <Head>
        <title>{post.details + "انواكشوط موريتانيا   "}</title>
        <meta name="description" content={post.details} key="desc" />
        <meta property="og:title" content={post.details} />
        <meta property="og:description" content={post.details} />
        <meta property="og:image" content={post.images[0]?.data} />
      </Head>
      <Layout>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            maxWidth: "400px",
            p: 2,
          }}
        >
          {post ? (
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography gutterBottom variant="h5">
                      {typeArabic[post.type]}
                    </Typography>
                  </Box>
                  <Box></Box>
                  <Box>
                    <Typography gutterBottom variant="h5">
                      {post.departement &&
                        post.region &&
                        DEPARTEMENTS[post.departement] + " - " + post.region}
                    </Typography>
                  </Box>
                </Box>
                <Typography gutterBottom variant="h6" color="text.secondary">
                  {post.details}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    <Box>{"السعر :"}</Box>

                    <NumberFormat value={post.price} thousandSeparator={true} />
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <WhatsappButton
                      phone={"+22248692007"}
                      message={"https://iqar.store/post?id=" + post._id}
                    >
                      <Button variant="contained">واتساب</Button>
                    </WhatsappButton>
                    <Typography variant="body1" color="text.secondary">
                      {48692007}
                    </Typography>
                  </Box>
                  {user?.role == "admin" && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {post.tel}
                    </Box>
                  )}
                </Box>
              </CardContent>
              {post.images?.map((image, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "grid",
                    gap: 2,
                    maxWidth: "400px",
                    p: 2,
                  }}
                >
                  <CardMedia
                    key={i}
                    component="img"
                    // height="140"
                    image={image?.data}
                    alt="green iguana"
                  />
                  )
                </Box>
              ))}
              <CardActions>
                <WhatsappShareButton
                  url={"https://iqar.store/post?id=" + post._id}
                >
                  <Box
                    sx={{
                      color: "blue",
                      fontSize: "small",
                    }}
                  >
                    مشاركة
                  </Box>
                </WhatsappShareButton>
                {(user?.role == "admin" ||
                  (user && user?.username == post.user)) && (
                  <Link href={"/api/delete?id=" + post._id}>
                    <Button style={{ color: "red" }}>حذف</Button>
                  </Link>
                )}
              </CardActions>
            </Card>
          ) : (
            <Box>{"no post"}</Box>
          )}
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
  const postObject = await DBPost.findOne({ _id: query.id });

  const postjson = JSON.stringify(postObject);

  return {
    props: {
      postjson,
    },
  };
}
