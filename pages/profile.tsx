import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Layout from "../components/layout";
import React from "react";
import Link from "next/link";
import { WhatsappShareButton } from "react-share";
import { DBPost } from "../lib/mongo";

export default function Page({ statisjson }: { statisjson: string }) {
  const statistic = JSON.parse(statisjson);

  return (
    <>
      <Layout>
        <table>
          <tr>
            <td>
              <Link href="/reps?role=rep">الممثلين</Link>
            </td>
            <td>
              <WhatsappShareButton
                url={"https://iqar.store/auth/signup?space=rep"}
              >
                <Box
                  sx={{
                    color: "blue",
                    fontSize: "small",
                  }}
                >
                  ممثل جديد
                </Box>
              </WhatsappShareButton>
            </td>
          </tr>
          <tr>
            <td>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box>{"الجميع"}</Box> <Box>{statistic.all}</Box>
              </Box>
            </td>
            <td>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box>{"البيع"}</Box>
                <Box>{statistic.selling}</Box>
              </Box>
            </td>
            <td>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box>{"الشراء"}</Box> <Box>{statistic.buying}</Box>
              </Box>
            </td>{" "}
            <td>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box>{"طلبات الايجار"}</Box> <Box>{statistic.demandRent}</Box>
              </Box>
            </td>{" "}
            <td>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box>{"عروض الايجار"}</Box> <Box>{statistic.offerRent}</Box>
              </Box>
            </td>{" "}
            <td>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box>{"الاقامات"}</Box> <Box>{statistic.stay}</Box>
              </Box>
            </td>
          </tr>
          <tr>
            <Link href="/tracks?action=archived"> المتابعات المأرشفة</Link>
          </tr>
          <tr>
            <Link href="/tracks?action=tracks"> المتابعات</Link>
          </tr>
          <tr>
            <Link href="/chances?action=chances"> الفرص</Link>
          </tr>
        </table>
      </Layout>
    </>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  const all = await DBPost.count();
  const buying = await DBPost.find({ type: "buying" });
  const selling = await DBPost.find({ type: "selling" });
  const demandRent = await DBPost.find({ type: "demandRent" });
  const offerRent = await DBPost.find({ type: "offerRent" });
  const stay = await DBPost.find({ type: "stay" });

  const statistic = {
    all: all,
    buying: buying.length,
    selling: selling.length,
    demandRent: demandRent.length,
    offerRent: offerRent.length,
    stay: stay.length,
  };

  const statisjson = JSON.stringify(statistic);

  return {
    props: {
      statisjson,
    },
  };
}
