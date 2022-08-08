import React, { Component } from "react";
import Layout from "../components/layout";
import { DBUser } from "../lib/mongo";
import { Box } from "@mui/system";
import { UserType } from "../projectTypes";
import Head from "next/head";
import { Nktt } from "../lib/myfunctions";
import { UserCard } from "../components/cards";

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
            maxWidth: "345px",
          }}
        >
          {users.map((user, index) => (
            <Box
              sx={{
                mt: 2,
              }}
              key={index}
            >
              <UserCard user={user}></UserCard>
            </Box>
          ))}
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
  console.log("/n new line");
  return posts.filter((post) => {
    console.log(posts.length);
    // look for a cross between the departements
    const cross = post.departements.filter((departement) =>
      departements.includes(departement)
    );
    // return the post if there is cross
    console.log([departements, post.departements, cross]);
    return cross.length > 0;
  });
}
