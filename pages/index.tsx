import { Box } from "@mui/material";
import React from "react";
import Layout from "../components/layout";
import KeyIcon from "@mui/icons-material/Key";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Head from "next/head";
import { basepath } from "../lib/myfunctions";

export default function Page() {
  return (
    <>
      <Head>
        <title>
          مؤسسة وسيطة لبيع و شراء و ايجار المنازل و الشقق و العقارات بشكل عام في
          نواكشوط موريتانيا الصفحة الرئيسية
        </title>
        <meta
          name="keywords"
          content="شقق للايجار نواكشوط, منزل للشراء نواكشوط, دار للبيع نواكشوط, منزل للسكن نواكشوط, منزل للشراء نواكشوط, شراء منزل نواكشوط"
        />

        <meta
          name="description"
          content={"موقع لعروض و طلبات العقار في مدينة نواكشوط"}
          key="desc"
        />
        <meta property="og:title" content={"عقار ان"} />
        <meta
          property="og:description"
          content={"شركة للوساطة العقارية في نواكشوط موريتانيا"}
        />
        <meta property="og:image" content={basepath + "/images/favicon.ico"} />
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
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: { xs: 1, md: 2 },
              maxWidth: "500px",
            }}
          >
            <Link href={"/rent"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <KeyIcon></KeyIcon>
                <Box
                  style={{
                    width: "100%",
                    height: "60%",
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    // alignItems: "center",
                  }}
                ></Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    // textAlign: "center",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>الايجار</Box>
                </Box>
              </Box>
            </Link>
            <Link href={"/buy"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <ShoppingCart></ShoppingCart>
                <Box
                  style={{
                    width: "100%",
                    height: "60%",
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    // alignItems: "center",
                  }}
                ></Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    // textAlign: "center",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>الشراء</Box>
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
