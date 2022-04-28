import { Box } from "@mui/system";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Layout from "../components/layout";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>
          مؤسسة وسيطة لبيع و شراء و ايجار المنازل و الشقق و العقارات بشكل عام في
          نواكشوط موريتانيا
        </title>
        <meta
          name="description"
          content="احصل اعل المنزل او الشقة التي تبحث عنها"
          key="desc"
        />
        <meta property="og:title" content="وسيط بيع و شراء العقارات" />
        <meta
          property="og:description"
          content="تتوفر عقار نواكشوط على الكثير من عروض بيع و شراء و ايجار العقارات"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
      </Head>
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
    </>
  );
}
