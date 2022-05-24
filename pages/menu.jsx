import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Layout from "../components/layout";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useUser } from "../lib/auth/hooks";
import StorageIcon from "@mui/icons-material/Storage";
import Head from "next/head";

export default function Page() {
  const user = useUser();
  return (
    <>
      <Head>
        <title>{"القائمة الرئيسية"}</title>
        <meta name="description" content={"القائمة الرئيسية"} key="desc" />
        <meta property="og:title" content={"القائمة الرئيسية"} />
        <meta property="og:description" content={"القائمة الرئيسية"} />
        {/* <meta property="og:image" content={post.images[0]?.data} /> */}
      </Head>
      <Layout>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            p: 1,
          }}
        >
          <Link href="/">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                cursor: "pointer",
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
              }}
            >
              <Box
                sx={{
                  pr: 1,
                }}
              >
                <DynamicFeedIcon></DynamicFeedIcon>
              </Box>
              <Box>أخر الاعلانات</Box>
            </Box>
          </Link>

          <Link href="/post-form">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                cursor: "pointer",
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
              }}
            >
              <Box
                sx={{
                  pr: 1,
                }}
              >
                <PostAddIcon></PostAddIcon>
              </Box>
              <Box>اضاقة اعلان</Box>
            </Box>
          </Link>
          {user?.role == "user" && (
            <Link href={"/samsar?userTel=" + user.tel}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  p: 1,
                  cursor: "pointer",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    pr: 1,
                  }}
                >
                  <StorageIcon></StorageIcon>
                </Box>
                <Box>بنك المعلومات</Box>
              </Box>
            </Link>
          )}

          <Link href="/contactUs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                cursor: "pointer",
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
              }}
            >
              <Box
                sx={{
                  pr: 1,
                }}
              >
                <WhatsAppIcon></WhatsAppIcon>
              </Box>
              <Box>اتصل بنا</Box>
            </Box>
          </Link>
        </Box>
      </Layout>
    </>
  );
}
