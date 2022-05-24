import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Layout from "../components/layout";
import React from "react";
import Link from "next/link";
import { WhatsappShareButton } from "react-share";

export default function Page() {
  return (
    <>
      <Layout>
        <table>
          <tr>
            <td>
              <Link href="/reps?role=rep">الممثلين</Link>
            </td>
          </tr>
          <tr>
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
        </table>
      </Layout>
    </>
  );
}
