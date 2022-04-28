import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUser } from "../lib/auth/hooks";

export default function GHeader() {
  const router = useRouter();
  const user = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: (theme) => {
          return theme.palette.primary.main;
        },
        color: "white",
        p: { xs: 2, md: 2 },
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          // justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            pr: 1,
          }}
        >
          <HomeIcon
            onClick={() => {
              router.push("/");
            }}
          ></HomeIcon>
        </Box>
        <Box>الاعلانات</Box>
      </Box>
      <img
        style={{
          height: "40px",
        }}
        src="/favicon.ico"
      ></img>

      {user ? (
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            // justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              pr: 1,
            }}
          >
            <LogoutIcon
              onClick={() => {
                router.push("/api/auth/logout");
              }}
            ></LogoutIcon>
          </Box>
          <Box>الخروج</Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            // justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              pr: 1,
            }}
          >
            <LoginIcon
              onClick={() => {
                router.push("/auth/login?space=user");
              }}
            ></LoginIcon>
          </Box>
          <Box>الدخول</Box>
        </Box>
      )}
    </Box>
  );
}
