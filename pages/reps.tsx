import React, { Component } from "react";
import Layout from "../components/layout";
import { DBUser } from "../lib/mongo";
import { Box } from "@mui/system";
import { UserType } from "../projectTypes";
import { DEPARTEMENTS } from "../lib/translate";

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export default function Page({ usersJson }: { usersJson: string }) {
  const users: [UserType] = JSON.parse(usersJson);

  return (
    <Layout>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          maxWidth: "400px",
          p: 2,
        }}
      >
        {users.map((user, i) => {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box>{user.username}</Box>
                <Box>{DEPARTEMENTS[user.departement]}</Box>
                <Box>{user.region}</Box>
                <Box>{user.tel}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const usersObject = await DBUser.find({ role: "user" });
  const usersJson = JSON.stringify(usersObject);

  return {
    props: {
      usersJson,
    },
  };
}
