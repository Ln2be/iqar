import { Box } from "@mui/system";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Layout from "../components/layout";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import Head from "next/head";
import { Button, Typography } from "@mui/material";
import WhatsappButton from "../components/whatsapp";

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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <WhatsappButton phone={"+22248692007"} message={"Salam"}>
                <Button variant="contained">واتساب</Button>
              </WhatsappButton>
              <Typography variant="body1" color="text.secondary">
                {48692007}
              </Typography>
            </Box>
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
          <Box>
            <Typography>
              عقار انواكشوط هي مؤسسة للوساطة العقارية نقدم خدمات مثل :
              <li>تاجير الشقق بكل انواع الجودة</li>
              <li>بيع المنازل </li>
              <li>بيع القطع الارضية</li>
              <li>بيع و تأجير العقارات الاخرى</li>
              <p>
                يوفر موقع عقار انواكشوط ايضا للعاملين في هذا المجال, فتح بنك
                معلومات داخل الموقع للمزيد من المعلومات اتصل بنا
              </p>
            </Typography>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
