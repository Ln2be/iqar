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

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <GHeader></GHeader>
        <AuthHeader></AuthHeader>
        <Box
          sx={{
            p: 2,
            overflowY: "scroll",
            mb: 6,
          }}
        >
          {children}
        </Box>

        <Footer></Footer>
      </ThemeProvider>
    </CacheProvider>
  );
}
