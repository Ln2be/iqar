import React from "react";
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

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Page({ posts }: { posts: string }) {
  const user = useUser();
  const router = useRouter();
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
          content={"موقع لعروض و طلبات العقار في مدينة نواكشوط"}
          key="desc"
        />
        <meta property="og:title" content={"عقار ان"} />
        <meta
          property="og:description"
          content={"شركة للوساطة العقارية في نواكشوط موريتانيا"}
        />
        <meta property="og:image" content={"https://iqar.store/favicon.ico"} />
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
                    backgroundColor: "#E7FFFF",
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
                      <Box>
                        <Typography gutterBottom variant="h5">
                          {typeArabic[post.type]}
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
                    {(user?.role == "admin" ||
                      (user && user?.username == post.user)) && (
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
                            <Typography variant="body1" color="text.secondary">
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
                  </Box>
                </CardContent>
                <CardActions
                  style={{
                    backgroundColor: "#E7FFFF",
                  }}
                >
                  {post.images?.length > 1 && (
                    <Button
                      onClick={() => {
                        router.push("/post?id=" + post._id);
                      }}
                      size="small"
                      style={{
                        color: "blue",
                      }}
                    >
                      المزيد من الصور
                    </Button>
                  )}
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
  let postsObject = [];
  if (query.type && query.departement) {
    postsObject = await DBPost.find({
      type: query.type,
      departement: query.departement,
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
      posts,
    },
  };
}
