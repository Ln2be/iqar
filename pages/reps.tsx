import React, { Component, useState } from "react";
import Layout from "../components/layout";
import { DBUser } from "../lib/mongo";
import { Box } from "@mui/system";
import { UserType } from "../projectTypes";
import Head from "next/head";
import { Nktt } from "../lib/myfunctions";
import { UserCard } from "../components/cards";
import { Button, TextField } from "@mui/material";

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

let messageToall = "";
export default function Page({ usersJson }: { usersJson: string }) {
  const users: [UserType] = JSON.parse(usersJson);

  // send message to all
  const [message, setMessage] = useState(false);
  const [text, setText] = useState("");
  const [userSentTo, setUsers] = useState<{ [key: string]: boolean }>({});
  const [render, setRender] = useState(false);

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
            maxWidth: "345px",
          }}
        >
          {message && !text && (
            <Box>
              <TextField
                id="outlined-basic"
                multiline
                label="الرسالة"
                defaultValue={""}
                variant="outlined"
                onChange={(event) => {
                  messageToall = event.target.value;
                }}
                helperText=""
              />
            </Box>
          )}
          {!message && !text ? (
            <Button
              variant="outlined"
              onClick={() => {
                setMessage(true);
              }}
            >
              ارسل رسالة
            </Button>
          ) : (
            !text && (
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setMessage(false);
                  }}
                >
                  اغلاق
                </Button>{" "}
                <Button
                  variant="outlined"
                  onClick={() => {
                    setText(messageToall);
                  }}
                >
                  ارسال
                </Button>
              </Box>
            )
          )}

          {users.map(
            (user, index) =>
              !Object.keys(userSentTo).includes(user.tel) && (
                <Box
                  sx={{
                    mt: 2,
                    backgroundColor: "#ccc",
                  }}
                  key={index}
                >
                  <UserCard
                    handleSentTo={() => {
                      setUsers((usersSentTo) => {
                        userSentTo[user.tel] = true;
                        return usersSentTo;
                      });
                      setRender(!render);
                    }}
                    type="full"
                    actionlabel={text ? "ارسل" : "واتساب"}
                    message={text ? text : "السلام عليكم"}
                    user={user}
                  ></UserCard>
                </Box>
              )
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
  const usersObjectall = await DBUser.find({}).sort({});
  const usersObject = usersObjectall.filter((user) => user.role != "admin");

  let sreps: UserType[] = [];

  if (query.type) {
    const location = Nktt[query.location];
    sreps = crossedDep(usersObject, location);
  }
  const usersJson = JSON.stringify(sreps);

  return {
    props: {
      usersJson,
    },
  };
}

// the return the posts where the departements cross
function crossedDep(posts: UserType[], departements: string[]) {
  return posts.filter((post) => {
    // look for a cross between the departements
    const cross = post.departements.filter((departement) =>
      departements.includes(departement)
    );
    // return the post if there is cross
    return cross.length > 0;
  });
}
