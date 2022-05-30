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

  const posto = JSON.parse(postjson) as Post;
  const reps = JSON.parse(repsjson) as UserType[];
  const posts = JSON.parse(opostsjson) as Post[];
  // const post = null;

  const postoshow =
    posto.type == "buying" || posto.type == "demandRent" ? true : false;
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
    fetch(url).then((v) => {
      console.log(v);
    });
  }
  return (
    <>
      <Head>
        <title>{posto.details + "انواكشوط موريتانيا   "}</title>
        <meta name="description" content={posto.details} key="desc" />
        <meta
          property="og:title"
          content={
            typeArabic[posto.type] +
            " \n" +
            subtypeArabic[posto.subtype] +
            " \n" +
            DEPARTEMENTS[posto.departement] +
            " \n" +
            posto.region +
            " \n"
          }
        />
        <meta property="og:description" content={posto.details} />
        <meta property="og:image" content={posto.images[0]?.data} />
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
            {posto ? (
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
                        {typeArabic[posto.type]}
                      </Typography>
                      <Typography gutterBottom variant="h5">
                        {subtypeArabic[posto.subtype]}
                      </Typography>
                    </Box>

                    {posto.departements.length == 1 && (
                      <Box>
                        <Typography gutterBottom variant="h5">
                          {posto.departement &&
                            posto.region &&
                            DEPARTEMENTS[posto.departement] +
                              " - " +
                              posto.region}
                        </Typography>
                      </Box>
                    )}
                    {posto.departements.length > 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {posto.departements.map((departement, i) => (
                          <Typography key={i} variant="h5">
                            {DEPARTEMENTS[departement]}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                  <Typography gutterBottom variant="h6" color="text.secondary">
                    {posto.details}
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
                        value={posto.price}
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
                        phone={"+222" + posto.tel}
                        message={"https://iqar.store/post?id=" + posto._id}
                      >
                        <Button variant="contained">واتساب</Button>
                      </WhatsappButton>
                      <Typography variant="body1" color="text.secondary">
                        {posto.tel}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                {posto.images?.map((image, i) => (
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
                    url={"https://iqar.store/post?id=" + posto._id}
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
                    (user && user?.username == posto.user)) && (
                    <Link href={"/api/delete?id=" + posto._id}>
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
                      <WhatsappButton
                        phone={"+222" + user.tel}
                        message={"https://iqar.store/post?id=" + posto._id}
                      >
                        <Button
                          onClick={() => {
                            compared(
                              "api/compared?id=" +
                                posto._id +
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

              let phoneo = "";

              if (posto.tel.endsWith("+")) {
                phoneo = "+" + posto.tel.replace("+", "");
              } else if (posto.tel.startsWith("00")) {
                phoneo = "+" + posto.tel.replace("00", "");
              } else if (posto.tel.startsWith("+")) {
                phoneo = posto.tel;
              } else {
                phoneo = "+222" + posto.tel;
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
                                router.push("/post?id=" + postc._id);
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
                          {/* here whats matter in comparaison. we send the demand owner the message */}
                          <WhatsappButton
                            phone={postoshow ? phoneo : phone}
                            message={
                              postoshow
                                ? "https://iqar.store/post?id=" + postc?._id
                                : "https://iqar.store/post?id=" + posto?._id
                            }
                          >
                            <Button
                              onClick={() => {
                                compared(
                                  "api/compared?id=" +
                                    posto._id +
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
                          {postc.createdAt &&
                            new Date(postc.createdAt).toLocaleDateString(
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
