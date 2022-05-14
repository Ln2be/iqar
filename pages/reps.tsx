import React, { Component } from "react";
import Layout from "../components/layout";
import { DBUser } from "../lib/mongo";
import { Box } from "@mui/system";
import { UserType } from "../projectTypes";
import { DEPARTEMENTS } from "../lib/translate";
import WhatsappButton from "../components/whatsapp";
import { Button, Typography } from "@mui/material";

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
      <table>
        <thead></thead>
        <tbody>
          {users.map((user, i) => (
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
                    <Button variant="contained">واتساب</Button>
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
      {/* <Box
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
                overflow: "scroll",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <WhatsappButton phone={"+222" + user.tel} message={""}>
                    <Button variant="contained">واتساب</Button>
                  </WhatsappButton>
                  <Typography variant="body1" color="text.secondary">
                    {user.tel}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box> */}
    </Layout>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  const usersObject = await DBUser.find({ role: query.role }).sort({
    departement: +1,
  });
  const usersJson = JSON.stringify(usersObject);

  return {
    props: {
      usersJson,
    },
  };
}
