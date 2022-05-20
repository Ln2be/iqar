import React from "react";
import Layout from "../components/layout";
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
            DEPARTEMENTS[post.departement] +
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
                        {post.departement &&
                          post.region &&
                          DEPARTEMENTS[post.departement] + " - " + post.region}
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
                </Box>
                {user?.role == "admin" && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {"هاتف الزبون : " + post.tel}
                  </Box>
                )}
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
