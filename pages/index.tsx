import { Box } from "@mui/system";
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
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
              width: "100%",
              height: "100%",
            }}
          >
            <DynamicFeedIcon
              style={{
                width: "100%",
                height: "80%",
              }}
              onClick={() => {
                router.push("/feeds");
              }}
            ></DynamicFeedIcon>
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
              <Box>جميع الاعلانات</Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <LocalHotelIcon
              style={{
                width: "100%",
                height: "80%",
              }}
              onClick={() => {
                router.push("/feeds?type=stay");
              }}
            ></LocalHotelIcon>
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
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <KeyIcon
              style={{
                width: "100%",
                height: "80%",
              }}
              onClick={() => {
                router.push("/feeds?type=offerRent");
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
              <Box>عروض الايجار</Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <KeyOffIcon
              style={{
                width: "100%",
                height: "80%",
              }}
              onClick={() => {
                router.push("/feeds?type=demandRent");
              }}
            ></KeyOffIcon>
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
              <Box>طلبات الايجار</Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <SellIcon
              style={{
                width: "100%",
                height: "80%",
              }}
              onClick={() => {
                router.push("/feeds?type=selling");
              }}
            ></SellIcon>
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
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <ShoppingCart
              style={{
                width: "100%",
                height: "80%",
              }}
              onClick={() => {
                router.push("/feeds?type=buying");
              }}
            ></ShoppingCart>
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
        </Box>
      </Box>
    </Layout>
  );
}
