import { Box } from "@mui/material";
import React from "react";
import Layout from "../components/layout";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Link from "next/link";
import Head from "next/head";
import { basepath } from "../lib/myfunctions";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";
import VillaIcon from "@mui/icons-material/Villa";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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

  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          مؤسسة وسيطة لبيع و شراء و ايجار المنازل و الشقق و العقارات بشكل عام في
          نواكشوط موريتانيا الصفحة الرئيسية
        </title>
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
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: { xs: 1, md: 2 },
              maxWidth: "500px",
            }}
          >
            {/* The rent here */}
            <Link href="/posts?action=posts&type=rent&location=nn">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <KeyIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></KeyIcon>

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
                  <Box>الشمالية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=rent&location=ns">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <KeyIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></KeyIcon>

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
                  <Box>الجنوبية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=rent&location=nw">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <KeyIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></KeyIcon>

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
                  <Box>الغربية</Box>
                </Box>
              </Box>
            </Link>

            {/* Cheap houses */}
            <Link href="/posts?action=posts&type=lowprice&location=nn">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CropLandscapeIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></CropLandscapeIcon>

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
                  <Box>الشمالية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=lowprice&location=ns">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CropLandscapeIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></CropLandscapeIcon>

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
                  <Box>الجنوبية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=lowprice&location=nw">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CropLandscapeIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></CropLandscapeIcon>

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
                  <Box>الغربية</Box>
                </Box>
              </Box>
            </Link>

            {/* medium price houses */}
            <Link href="/posts?action=posts&type=mediumprice&location=nn">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <VillaIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></VillaIcon>

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
                  <Box>الشمالية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=mediumprice&location=ns">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <VillaIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></VillaIcon>

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
                  <Box>الجنوبية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=mediumprice&location=nw">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <VillaIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></VillaIcon>

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
                  <Box>الغربية</Box>
                </Box>
              </Box>
            </Link>

            {/* high price houses */}
            <Link href="/posts?action=posts&type=highprice&location=nn">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <MapsHomeWorkIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></MapsHomeWorkIcon>

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
                  <Box>الشمالية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=highprice&location=ns">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <MapsHomeWorkIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></MapsHomeWorkIcon>

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
                  <Box>الجنوبية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=highprice&location=nw">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <MapsHomeWorkIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></MapsHomeWorkIcon>

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
                  <Box>الغربية</Box>
                </Box>
              </Box>
            </Link>

            {/* very high price houses */}
            <Link href="/posts?action=posts&type=veryhighprice&location=nn">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <AttachMoneyIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></AttachMoneyIcon>

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
                  <Box>الشمالية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=veryhighprice&location=ns">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <AttachMoneyIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></AttachMoneyIcon>

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
                  <Box>الجنوبية</Box>
                </Box>
              </Box>
            </Link>

            <Link href="/posts?action=posts&type=veryhighprice&location=nw">
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "100%",
                }}
              >
                <AttachMoneyIcon
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                ></AttachMoneyIcon>

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
                  <Box>الغربية</Box>
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
