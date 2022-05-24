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
import ShareIcon from "@mui/icons-material/Share";

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
    stay: "إقامة",
    buying: "شراء",
    selling: "بيع",
    demandRent: "طلب ايجار",
    offerRent: "عرض ايجار",
  };

  const subtypeArabic: { [key: string]: string } = {
    land: "قطعة ارضية",
    appartment: "شقق",
    house: "منزل",
    villa: "فيلا",
    other: "إخرى",
  };

  let phone = "";

  if (post.tel.endsWith("+")) {
    phone = "+" + post.tel.replace("+", "");
  } else if (post.tel.startsWith("00")) {
    phone = "+" + post.tel.replace("00", "");
  } else if (post.tel.startsWith("+")) {
    phone = post.tel;
  } else {
    phone = "+222" + post.tel;
  }

  return (
    <>
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
      <Layout>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            maxWidth: "400px",
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h5">
                      {typeArabic[post.type]}
                    </Typography>
                    <Typography gutterBottom variant="h5">
                      {subtypeArabic[post.subtype]}
                    </Typography>
                  </Box>

                  {post.departements.length == 1 && (
                    <Box>
                      <Typography gutterBottom variant="h5">
                        {DEPARTEMENTS[post.departements[0]]}
                      </Typography>
                      <Typography gutterBottom variant="h5">
                        {post.region}
                      </Typography>
                    </Box>
                  )}
                  {post.departements.length > 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {post.departements.map((departement, i) => (
                        <Typography key={i} variant="h5">
                          {DEPARTEMENTS[departement]}
                        </Typography>
                      ))}
                    </Box>
                  )}
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
                  <Box>
                    <Typography variant="body1" color="text.secondary">
                      {"السعر :"}
                    </Typography>
                    <NumberFormat value={post.price} thousandSeparator={true} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {user?.role == "admin" ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <WhatsappButton
                          phone={phone}
                          message={"https://iqar.store/post?id=" + post._id}
                        >
                          <Button variant="contained">واتساب</Button>
                        </WhatsappButton>
                        <Typography variant="body1" color="text.secondary">
                          {post.tel}
                        </Typography>
                      </Box>
                    ) : (
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
                    )}
                  </Box>
                </Box>
              </CardContent>
              {post.images?.map((image, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "grid",
                    gap: 2,
                    maxWidth: "400px",
                    pb: 2,
                  }}
                >
                  <CardMedia
                    key={i}
                    component="img"
                    // height="140"
                    image={image?.data}
                    alt="green iguana"
                  />
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
                    <ShareIcon></ShareIcon>
                  </Box>
                </WhatsappShareButton>
                {user && user.role != "admin" && user?.username == post.user && (
                  <Link href={"/api/delete?id=" + post._id}>
                    <Button style={{ color: "red" }}>حذف</Button>
                  </Link>
                )}
                {user && user?.role == "admin" && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Link href={"/compare?id=" + post._id}>
                      <Button variant="outlined" style={{ color: "blue" }}>
                        مقارنة
                      </Button>
                    </Link>
                    <Link href={"/update?id=" + post._id}>
                      <Button variant="outlined" style={{ color: "blue" }}>
                        تعديل
                      </Button>
                    </Link>
                    <Link href={"/api/delete?id=" + post._id}>
                      <Button variant="outlined" style={{ color: "red" }}>
                        حذف
                      </Button>
                    </Link>
                  </Box>
                )}
              </CardActions>
            </Card>
          ) : (
            <Box>{"no post"}</Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <WhatsappButton
              phone={"+22248692007"}
              message={"اريد الغاء اشتراكي"}
            >
              <Button variant="contained">الغاء الاشتراك</Button>
            </WhatsappButton>
          </Box>
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
