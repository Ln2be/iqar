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
              <Card key={i} sx={{ maxWidth: 345 }}>
                {image && (
                  <CardMedia
                    component="img"
                    // height="140"
                    image={image?.data}
                    alt="green iguana"
                  />
                )}
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
                      {"السعر:   " + post.price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
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
                        {48692007}
                      </Box>
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  {post.images?.length > 1 && (
                    <Button
                      onClick={() => {
                        router.push("/post?id=" + post._id);
                      }}
                      size="small"
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
