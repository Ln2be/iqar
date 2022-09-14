import * as React from "react";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import Layout from "../components/layout";

createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Direction() {
  return (
    <Layout>
      <TextField label="Name" variant="standard" />
    </Layout>
  );
}
