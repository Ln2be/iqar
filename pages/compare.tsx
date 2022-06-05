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
import { PostCard } from "../components/cards";

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
            DEPARTEMENTS[posto.departements[0]] +
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
              mb: 2,
            }}
          >
            {posto && <PostCard post={posto} type="min"></PostCard>}
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
              return <PostCard key={i} post={postc} type="min"></PostCard>;
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
