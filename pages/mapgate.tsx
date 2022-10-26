import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import { Box } from "@mui/material";
import Layout from "../components/layout";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import StarIcon from "@mui/icons-material/Star";

export default function Page() {
  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: { xs: 1, md: 2 },
            maxWidth: "500px",
          }}
        >
          <Link href={"/map?action=rent&category=price"}>
            <Box
              sx={{
                bgColor: "#fff",
                border: "1px solid",
                width: "100%",
                height: "150px",
              }}
            >
              <HomeIcon></HomeIcon>
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
          <Link href={"/map?action=rent&category=size"}>
            <Box
              sx={{
                bgColor: "#fff",
                border: "1px solid",
                width: "100%",
                height: "150px",
              }}
            >
              <HomeIcon></HomeIcon>
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
              <HomeIcon></HomeIcon>

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
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}
