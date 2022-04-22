import Head from "next/head";
import Header from "./header";
import { Box } from "@mui/system";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => (
  <>
    <Head>
      <title>With Cookies</title>
    </Head>

    <Header />

    <main>
      <Box>{props.children}</Box>
    </main>

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
    `}</style>
  </>
);

export default Layout;
