import { Box } from "@mui/system";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Layout from "../components/layout";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Page() {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            pb: 2,
          }}
        >
          <WhatsAppIcon></WhatsAppIcon>
          <Box>48692007</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            pb: 2,
          }}
        >
          <CallIcon></CallIcon>
          <Box>48692007</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            pb: 2,
          }}
        >
          <FacebookIcon></FacebookIcon>
          <Box>
            <a
              style={{
                color: "blue",
              }}
              href="https://web.facebook.com/iqarnkt"
            >
              عغار نواكشوط
            </a>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </Layout>
  );
}
