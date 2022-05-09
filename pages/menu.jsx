import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Layout from "../components/layout";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
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
        <Link href="/search">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 1,
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                pr: 1,
              }}
            >
              <SearchIcon></SearchIcon>
            </Box>
            <Box>بحث</Box>
          </Box>
        </Link>

        <Link href="/post-form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 1,
              cursor: "pointer",
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
      </Box>
    </Layout>
  );
}
