import { Box } from "@mui/material";
import React from "react";
import Layout from "../../components/layout";
import KeyIcon from "@mui/icons-material/Key";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Link from "next/link";
import Head from "next/head";
import { basepath } from "../../lib/myfunctions";
import { LocalOffer, Home, Hotel } from "@mui/icons-material";

export default function Page() {
  return (
    <>
    {mhead}
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
            <Link href={"/rent/posts?action=posts"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <DynamicFeedIcon></DynamicFeedIcon>
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
                  <Box>آخر الاعلانات</Box>
                </Box>
              </Box>
            </Link>

            <Link href={"/rent/posts?action=offer"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <LocalOffer></LocalOffer>
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
                  <Box>العروض</Box>
                </Box>
              </Box>
            </Link>

            <Link href={"/rent/posts?action=demand"}>
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
                  <Box>الطلبات</Box>
                </Box>
              </Box>
            </Link>

            <Link href={"/rent/map?action=houseprice"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <Home></Home>
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
                  <Box>السعر</Box>
                </Box>
              </Box>
            </Link>
            <Link href={"/rent/map?action=stay"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <Hotel></Hotel>
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
                  <Box>إقامة</Box>
                </Box>
              </Box>
            </Link>
            <Link href={"/rent/map?action=other"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <Home></Home>
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
                  <Box>اخرى</Box>
                </Box>
              </Box>
            </Link>
            {/* <Link href={"/map?action=rent&category=size"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <Home></Home>
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
                  <Box>السعة</Box>
                </Box>
              </Box>
            </Link>
            <Link href={"/map?action=rent&category=star"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <Home></Home>

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
                  <Box>المفضلة</Box>
                </Box>
              </Box>
            </Link> */}
          </Box>
        </Box>
      </Layout>
    </>
  );
}

const mhead = (
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
);
