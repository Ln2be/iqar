import React from "react";
import Layout from "../components/layout";
import { Box } from "@mui/system";
import { DBPost, DBUser } from "../lib/mongo";
import { useUser } from "../lib/auth/hooks";
import { Post, UserType } from "../projectTypes";
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
import { WhatsappShareButton } from "react-share";
import { DEPARTEMENTS } from "../lib/translate";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Page({
  postjson,
  repsjson,
  opostsjson,
}: {
  postjson: string;
  repsjson: string;
  opostsjson: string;
}) {
  const user = useUser();
  const router = useRouter();

  const post = JSON.parse(postjson) as Post;
  const reps = JSON.parse(repsjson) as UserType[];
  const posts = JSON.parse(opostsjson) as Post[];
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

  // add the post or the user as already compared to
  function compared(url: string) {
    fetch(url).then(() => {});
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
        <>
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
                            DEPARTEMENTS[post.departement] +
                              " - " +
                              post.region}
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
                      <NumberFormat
                        value={post.price}
                        thousandSeparator={true}
                      />
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
          <table>
            <thead></thead>
            <tbody>
              {reps.map((user, i) => (
                <tr key={i}>
                  <td>{user.username}</td>
                  <td>{DEPARTEMENTS[user.departement]}</td>
                  <td>{user.region}</td>
                  <td>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <WhatsappButton phone={"+222" + user.tel} message={""}>
                        <Button
                          onClick={() => {
                            compared(
                              "api/compared?id=" +
                                post._id +
                                "&user=" +
                                user._id
                            );
                          }}
                          variant="contained"
                        >
                          واتساب
                        </Button>
                      </WhatsappButton>
                      <Typography variant="body1" color="text.secondary">
                        {user.tel}
                      </Typography>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Box
            sx={{
              display: "grid",
              gap: 4,
              maxWidth: "400px",
            }}
          >
            {posts.map((postc, i) => {
              const image = postc.images[0];
              let phone = "";

              if (postc.tel.endsWith("+")) {
                phone = "+" + postc.tel.replace("+", "");
              } else if (postc.tel.startsWith("00")) {
                phone = "+" + postc.tel.replace("00", "");
              } else if (postc.tel.startsWith("+")) {
                phone = postc.tel;
              } else {
                phone = "+222" + postc.tel;
              }

              console.log(phone);
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
                        {postc.images?.length > 1 && (
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
                            pl: 2,
                          }}
                        >
                          <Typography variant="h5">
                            {typeArabic[postc.type]}
                          </Typography>
                          <Typography gutterBottom variant="h5">
                            {subtypeArabic[postc.subtype]}
                          </Typography>
                        </Box>
                        {postc.departements.length == 1 && (
                          <Box>
                            <Typography gutterBottom variant="h5">
                              {postc.departement &&
                                postc.region &&
                                DEPARTEMENTS[postc.departement] +
                                  " - " +
                                  postc.region}
                            </Typography>
                          </Box>
                        )}
                        {postc.departements.length > 1 && (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {postc.departements.map((departement, i) => (
                              <Typography key={i} variant="h5">
                                {DEPARTEMENTS[departement]}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h6"
                        color="text.secondary"
                      >
                        {postc.details}
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
                            value={postc.price}
                            thousandSeparator={true}
                          />
                        </Box>
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
                            <Button
                              onClick={() => {
                                compared(
                                  "api/compared?id=" +
                                    post._id +
                                    "&post=" +
                                    postc._id
                                );
                              }}
                              variant="contained"
                            >
                              واتساب
                            </Button>
                          </WhatsappButton>
                          <Typography variant="body1" color="text.secondary">
                            {postc.tel}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          pt: 1,
                        }}
                      >
                        <Box>{"رقم الاعلان :  " + postc.count}</Box>
                        <Box>
                          {new Date(postc.createdAt).toLocaleDateString(
                            "ar-MA"
                          )}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Box>
                          <Link href={"/api/delete?id=" + postc._id}>
                            <Button style={{ color: "red" }}>حذف</Button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
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
  const postObject = await DBPost.findOne({ _id: query.id });

  const departements = postObject.departements;
  const type = postObject.type;

  // send reps who are working in the departement
  const reps = await DBUser.find({ role: "rep" });

  const repsdep = reps.filter((value) => {
    const cross = value.departements.filter((value2: any) =>
      departements.includes(value2)
    );
    return cross.length > 0;
  });

  const repsObject = repsdep.filter(
    (rep) => !postObject.comparedTo?.includes(rep._id)
  );

  // send the opposite posts: if selling the opposite is buying
  const opposite: any = {
    selling: "buying",
    buying: "selling",
    demandRent: "offerRent",
    offerRent: "demandRent",
  };
  const oppositetype = opposite[type];
  const oppositeposts = await DBPost.find({ type: oppositetype });

  // the post shouldn't be already compared to this post
  const ncposts = oppositeposts.filter(
    (post) => !postObject.comparedTo?.includes(post._id)
  );

  // the posts should be in the same departement
  const deposts = ncposts.filter((value) => {
    const cross = value.departements.filter((value2: any) =>
      departements.includes(value2)
    );
    return cross.length > 0;
  });

  const postjson = JSON.stringify(postObject);
  const opostsjson = JSON.stringify(deposts);
  const repsjson =
    type == "buying" || type == "demandRent"
      ? JSON.stringify(repsObject)
      : "[]";

  return {
    props: {
      postjson: postjson,
      repsjson: repsjson,
      opostsjson: opostsjson,
    },
  };
}
