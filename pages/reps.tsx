import React, { useState } from "react";
import Layout from "../components/layout";
import { DBUser } from "../lib/mongo";
// import { Box } from "@mui/material";
import { UserType } from "../projectTypes";
import Head from "next/head";
import { Nktt } from "../lib/myfunctions";
import { UserCard } from "../components/cards";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";

// type JSONValue =
//   | string
//   | number
//   | boolean
//   | { [x: string]: JSONValue }
//   | Array<JSONValue>;

let messageToall = "";
export default function Page({ usersJson }: { usersJson: string }) {
  const users: [UserType] = JSON.parse(usersJson);

  // send message to all
  const [message, setMessage] = useState(false);
  const [text, setText] = useState("");
  const [userSentTo, setUsers] = useState<{ [key: string]: boolean }>({});
  const [render, setRender] = useState(false);

  //
  const query = useRouter().query;
  // many users

  function rReps() {
    return (
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
                  handleSentTo={
                    text
                      ? () => {
                          setUsers((usersSentTo) => {
                            userSentTo[user.tel] = true;
                            return usersSentTo;
                          });
                          setRender(!render);
                        }
                      : () => {
                          const khroj = "";
                          console.log(khroj);
                        }
                  }
                  type="full"
                  actionlabel={text ? "ارسل" : "واتساب"}
                  message={text ? text : "السلام عليكم"}
                  user={user}
                ></UserCard>
              </Box>
            )
        )}
      </Box>
    );
  }

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
        <Box>
          {(query.count || query.tel) && (
            <Box
              sx={{
                maxWidth: "345px",
              }}
            >
              <UserCard type="rep" user={users[0]}></UserCard>
            </Box>
          )}
          {query.type && rReps()}
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
  const usersObjectall = (await DBUser.find({})) as UserType[];
  const usersObjectrep = usersObjectall.filter((user) => user.role != "admin");

  const usersObjectr = usersObjectrep.sort((user1, user2) => {
    if (user1.trust == user2.trust) {
      if (user1.activity > user2.activity) {
        return 1;
      } else {
        return -1;
      }
    } else if (user1.trust > user2.trust) {
      return 1;
    } else {
      return -1;
    }
  });

  const usersObject = usersObjectr.reverse();

  let sreps: UserType[] = [];

  if (query.type) {
    const location = Nktt[query.location];
    sreps = crossedDep(usersObject, location);
  } else if (query.count) {
    const user = await DBUser.findOne({ count: query.count });
    sreps.push(user);
  } else if (query.tel) {
    const user = await DBUser.findOne({ tel: query.tel });
    sreps.push(user);
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
