import React, { Component } from "react";
import Layout from "../components/layout";
import { DBUser } from "../lib/mongo";
import { Box } from "@mui/system";
import { UserType } from "../projectTypes";
import { DEPARTEMENTS } from "../lib/translate";
import WhatsappButton from "../components/whatsapp";
import { Button, Typography } from "@mui/material";
import Head from "next/head";

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export default function Page({ usersJson }: { usersJson: string }) {
  const users: [UserType] = JSON.parse(usersJson);

  return (
    <>
      <Head>
        <title>{"الممثلين"}</title>
        <meta name="description" content={"الممثلين"} key="desc" />
        <meta property="og:title" content={"الممثلين"} />
        <meta property="og:description" content={"الممثلين"} />
        {/* <meta property="og:image" content={post.images[0]?.data} /> */}
      </Head>
      <Layout>
        <Box
          sx={{
            overflow: "scroll",
          }}
        >
          <table>
            <thead></thead>
            <tbody>
              {users.map((user, i) => {
                let phone = "";

                if (user.tel.endsWith("+")) {
                  phone = "+" + user.tel.replace("+", "");
                } else if (user.tel.startsWith("00")) {
                  phone = "+" + user.tel.replace("00", "");
                } else if (user.tel.startsWith("+")) {
                  phone = user.tel;
                } else {
                  phone = "+222" + user.tel;
                }

                return (
                  <tr key={i}>
                    <td>{user.count}</td>
                    <td>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          fetch("/api/deleteuser?id=" + user._id);
                        }}
                      >
                        حذف
                      </Button>
                    </td>
                    <td>{user.username}</td>
                    <td>{DEPARTEMENTS[user.departements[0]]}</td>
                    <td>{user.region}</td>
                    <td>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <WhatsappButton phone={phone} message={""}>
                          <Button variant="contained">واتساب</Button>
                        </WhatsappButton>
                        <Typography variant="body1" color="text.secondary">
                          {user.tel}
                        </Typography>
                      </Box>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
  const usersObject = await DBUser.find({ role: query.role }).sort({
    count: +1,
  });
  const usersJson = JSON.stringify(usersObject);

  return {
    props: {
      usersJson,
    },
  };
}
