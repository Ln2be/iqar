import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Image from "next/image";
import { DBPost } from "../lib/mongo";
import { Box } from "@mui/system";
import Router, { useRouter } from "next/router";
import { Post } from "../projectTypes";
import { useUser } from "../lib/auth/hooks";
import { DEPARTEMENTS } from "../lib/translate";
import Head from "next/head";
import { WhatsappShareButton } from "react-share";
import WhatsappButton from "../components/whatsapp";
import NumberFormat from "react-number-format";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShareIcon from "@mui/icons-material/Share";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Page({
  posts,
  tour,
}: {
  posts: string;
  tour: boolean;
}) {
  const user = useUser();
  const router = useRouter();
  const postsOb = JSON.parse(posts) as [Post];

  const [installb, setInstallb] = useState("none");
  // install pwa
  let deferredPrompt: any; // Allows to show the install prompt
  // const installButton = document.getElementById("install_button");

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt fired");
      // Prevent Chrome 76 and earlier from automatically showing a prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Show the install button
      setInstallb("block");
      // installButton.hidden = false;
      // installButton.addEventListener("click", installApp);
    });
  }

  const typeArabic: { [key: string]: string } = {
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

  const date = Date.now();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <>
      <Head>
        <title>
          مؤسسة وسيطة لبيع و شراء و ايجار المنازل و الشقق و العقارات بشكل عام في
          نواكشوط موريتانيا
        </title>

        <meta
          name="description"
          content={"موقع لعروض و طلبات العقار في مدينة نواكشوط"}
          key="desc"
        />
        <meta property="og:title" content={"عقار ان"} />
        <meta
          property="og:description"
          content={"شركة للوساطة العقارية في نواكشوط موريتانيا"}
        />
        <meta
          property="og:image"
          content={"https://iqar.store/images/favicon.ico"}
        />
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
          }}
        >
          <Box
            sx={{
              display: installb,
            }}
          >
            <Button
              onClick={() => {
                // Show the prompt
                deferredPrompt.prompt();
                // installButton.disabled = true;

                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult: any) => {
                  if (choiceResult.outcome === "accepted") {
                    console.log("PWA setup accepted");
                    // installButton.hidden = true;
                    setInstallb("none");
                  } else {
                    console.log("PWA setup rejected");
                  }
                  // installButton.disabled = false;

                  deferredPrompt = null;
                });
              }}
            >
              install
            </Button>
          </Box>
          {postsOb.map((post, i) => {
            const image = post.images[0];

            return (
              <Card key={i} sx={{ maxWidth: 345 }}>
                {image && (
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      // height="140"
                      image={image?.data}
                      alt="green iguana"
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "4px",
                        right: "4px",
                      }}
                    >
                      {post.images?.length > 1 && (
                        <Box
                          sx={{
                            backgroundColor: (theme) => {
                              return theme.palette.primary.light;
                            },
                            color: "white",
                          }}
                        >
                          <Button
                            onClick={() => {
                              router.push("/post?id=" + post._id);
                            }}
                            size="small"
                            style={{
                              color: "white",
                            }}
                          >
                            <ArrowBackIosIcon></ArrowBackIosIcon>
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}

                <CardContent
                  style={{
                    backgroundColor: "#ccc",
                  }}
                >
                  <Box>
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
                      <Box>
                        <Typography gutterBottom variant="h5">
                          {post.departement &&
                            post.region &&
                            DEPARTEMENTS[post.departement] +
                              " - " +
                              post.region}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h6"
                      color="text.secondary"
                    >
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
                        <NumberFormat
                          value={post.price}
                          thousandSeparator={true}
                        />
                      </Box>
                      {user?.role == "admin" ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <WhatsappButton
                            phone={"+222" + post.tel}
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        pt: 1,
                      }}
                    >
                      <Box>{"رقم الاعلان :  " + post.count}</Box>
                      <Box>
                        {new Date(post.createdAt).toLocaleDateString("ar-MA")}
                      </Box>
                    </Box>
                    {user &&
                      user?.tel == post.userTel &&
                      user?.role != "admin" && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            mt: 2,
                          }}
                        >
                          <Box>
                            <Box>هاتف الزبون :</Box>
                            <Box>
                              <Typography
                                variant="body1"
                                color="text.secondary"
                              >
                                {post.tel}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            <Link href={"/api/delete?id=" + post._id}>
                              <Button style={{ color: "red" }}>حذف</Button>
                            </Link>
                          </Box>
                        </Box>
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
                        <Box>
                          <Link href={"/api/delete?id=" + post._id}>
                            <Button style={{ color: "red" }}>حذف</Button>
                          </Link>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </CardContent>
                <CardActions
                  style={{
                    backgroundColor: "#ccc",
                  }}
                >
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
                </CardActions>
              </Card>
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
  const tour = query.tour ? true : false;
  let postsObject = [];
  if (query.type && query.departement) {
    postsObject = await DBPost.find({
      type: query.type,
      departement: query.departement,
    }).sort({ createdAt: -1 });
  } else if (query.user && query.departement) {
    postsObject = await DBPost.find({
      departement: query.departement,
      $or: [{ type: "buying" }, { type: "demandRent" }],
    }).sort({ createdAt: -1 });
  } else if (query.user) {
    postsObject = await DBPost.find({
      user: query.user,
    }).sort({ createdAt: -1 });
  } else {
    postsObject = await DBPost.find({}).sort({ createdAt: -1 });
  }

  const posts = JSON.stringify(postsObject);

  return {
    props: {
      posts: posts,
      tour: tour,
    },
  };
}
