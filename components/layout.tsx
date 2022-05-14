import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import GHeader from "./gHeader";
import AuthHeader from "./auth/AuthHeader";
import Footer from "./footer";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Layout({ children }: { children: JSX.Element }) {
  const router = useRouter();

  // const [tooltipFooter, setTooltipFooter] = useState([false, false, false]);
  // const { tour } = router.query;

  // function takeTour() {
  //   setTooltipFooter([true, false, false]);
  // }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <GHeader></GHeader>
        <AuthHeader></AuthHeader>
        {router.pathname != "/" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "#bbb",
            }}
          >
            <Box
              sx={{
                backgroundColor: (theme) => {
                  return theme.palette.primary.light;
                },
                color: "white",
                // maxWidth: "80px",
              }}
            >
              <Button
                onClick={() => {
                  router.back();
                }}
                size="small"
                style={{
                  color: "white",
                }}
              >
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
              </Button>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            p: 2,
            overflowY: "scroll",
            mb: 6,
            // backgroundColor: "#EEE",
          }}
        >
          {children}
        </Box>

        <Footer></Footer>
      </ThemeProvider>
    </CacheProvider>
  );
}
