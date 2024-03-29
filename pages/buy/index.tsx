import { Box } from "@mui/material";
import React from "react";
import Layout from "../../components/layout";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { useState } from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Link from "next/link";
import Head from "next/head";
import { basepath } from "../../lib/myfunctions";
import { Map } from "@mui/icons-material";

let deferredPrompt: any; // Allows to show the install prompt

export default function Page() {
  const [installb, setInstallb] = useState("none");
  // install pwa
  // const installButton = document.getElementById("install_button");

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt fired");
      // Prevent Chrome 76 and earlier from automatically showing a prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Show the install button
      setInstallb("flex");
      // installButton.hidden = false;
      // installButton.addEventListener("click", installApp);
    });
  }

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
              display: installb,
              justifyContent: "center",
              flexDirection: "column",

              maxWidth: "500px",
              p: 2,
            }}
          >
            <Button
              style={{
                backgroundColor: "#32CD32",
              }}
              variant="contained"
              onClick={() => {
                // Show the prompt
                deferredPrompt.prompt();
                // installButton.disabled = true;

                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult: any) => {
                  if (choiceResult.outcome === "accepted") {
                    console.log("PWA setup accepted");
                    // installButton.hidden = true;
                    setInstallb("none");
                  } else {
                    console.log("PWA setup rejected");
                  }
                  // installButton.disabled = false;

                  deferredPrompt = null;
                });
              }}
            >
              تثبيت التطبيق
              <ArrowDownwardIcon></ArrowDownwardIcon>
            </Button>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: { xs: 1, md: 2 },
              maxWidth: "500px",
            }}
          >
            <Link href={"/buy/posts?action=posts"}>
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
            <Link href={"//buy/posts?action=buying"}>
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
                  <Box>طلبات الشراء</Box>
                </Box>
              </Box>
            </Link>
            <Link href={"/buy/posts?action=selling"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <SellIcon></SellIcon>
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
                  <Box>عروض البيع</Box>
                </Box>
              </Box>
            </Link>
            <Link href={"/buy/map?action=buying"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <Map></Map>
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
          </Box>
        </Box>
      </Layout>
    </>
  );
}
