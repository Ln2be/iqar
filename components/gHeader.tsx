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
      <Link href={"/"}>
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
            <HomeIcon></HomeIcon>
          </Box>
          <Box>الاعلانات</Box>
        </Box>
      </Link>

      <img
        style={{
          height: "40px",
        }}
        src="/favicon.ico"
      ></img>

      {user ? (
        <Link href={"/api/auth/logout"}>
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
              <LogoutIcon></LogoutIcon>
            </Box>
            <Box>الخروج</Box>
          </Box>
        </Link>
      ) : (
        <Link href={"/auth/login?space=user"}>
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
              <LoginIcon></LoginIcon>
            </Box>
            <Box>الدخول</Box>
          </Box>
        </Link>
      )}
    </Box>
  );
}
