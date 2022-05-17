import React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useUser } from "../lib/auth/hooks";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import styles from "../styles/Home.module.css";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreateIcon from "@mui/icons-material/Create";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CallIcon from "@mui/icons-material/Call";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

export default function GHeader() {
  const router = useRouter();
  const user = useUser();

  return (
    <Box
      sx={{
        width: "100%",
      }}
      className={styles.cairofont}
    >
      <Box>
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            p: 1,
            color: "white",
          }}
        >
          <p></p>
          عقار نواكشوط
        </Box>
      </Box>
      <Box
        sx={{
          // color: (theme) => theme.palette.primary.main,
          display: "flex",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        {router.pathname == "/" ? (
          <Box
            sx={{
              borderBottom: "3px solid",
              borderColor: (theme) => theme.palette.primary.main,
              // color: "#0039e6",
              color: (theme) => theme.palette.primary.main,
              // width: "100%",
            }}
          >
            <HomeIcon
              onClick={() => {
                router.push("/");
              }}
              style={{}}
            ></HomeIcon>
          </Box>
        ) : (
          <HomeOutlinedIcon
            onClick={() => {
              router.push("/");
            }}
          ></HomeOutlinedIcon>
        )}

        {router.pathname == "/post-form" ? (
          <Box
            sx={{
              borderBottom: "3px solid",
              borderColor: (theme) => theme.palette.primary.main,
              // color: "#0039e6",
              color: (theme) => theme.palette.primary.main,
              // width: "100%",
            }}
          >
            <CreateIcon
              onClick={() => {
                router.push("/post-form");
              }}
            ></CreateIcon>
          </Box>
        ) : (
          <CreateOutlinedIcon
            onClick={() => {
              router.push("/post-form");
            }}
          ></CreateOutlinedIcon>
        )}

        {router.pathname == "/contactUs" ? (
          <Box
            sx={{
              borderBottom: "3px solid",
              borderColor: (theme) => theme.palette.primary.main,
              // color: "#0039e6",
              color: (theme) => theme.palette.primary.main,
              // width: "100%",
            }}
          >
            <CallIcon
              onClick={() => {
                router.push("/contactUs");
              }}
              style={{}}
            ></CallIcon>
          </Box>
        ) : (
          <CallOutlinedIcon
            onClick={() => {
              router.push("/contactUs");
            }}
          ></CallOutlinedIcon>
        )}

        {router.pathname ==
        "/auth/login                                                                                                                                                                                " ? (
          <Box
            sx={{
              borderBottom: "3px solid",
              borderColor: (theme) => theme.palette.primary.main,
              // color: "#0039e6",
              color: (theme) => theme.palette.primary.main,
              // width: "100%",
            }}
          >
            <LoginIcon></LoginIcon>
          </Box>
        ) : user ? (
          <LogoutOutlinedIcon
            onClick={() => {
              router.push("/api/auth/logout");
            }}
          ></LogoutOutlinedIcon>
        ) : (
          <LoginOutlinedIcon
            onClick={() => {
              router.push("/auth/login");
            }}
          ></LoginOutlinedIcon>
        )}

        {router.pathname == "/menu" ? (
          <Box
            sx={{
              borderBottom: "3px solid",
              borderColor: (theme) => theme.palette.primary.main,
              // color: "#0039e6",
              color: (theme) => theme.palette.primary.main,
              // width: "100%",
            }}
          >
            <MenuIcon></MenuIcon>
          </Box>
        ) : (
          <MenuOutlinedIcon
            onClick={() => {
              router.push("/menu");
            }}
          ></MenuOutlinedIcon>
        )}
      </Box>
    </Box>

    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     backgroundColor: (theme) => {
    //       return theme.palette.primary.main;
    //     },
    //     color: "white",
    //     p: { xs: 2, md: 2 },
    //   }}
    // >
    //   <Link href={"/menu"}>
    //     <Box
    //       sx={{
    //         display: "inline-flex",
    //         flexDirection: "row",
    //         // justifyItems: "center",
    //         alignItems: "center",
    //         cursor: "pointer",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           pr: 1,
    //         }}
    //       >
    //         <MenuIcon></MenuIcon>
    //       </Box>
    //       <Box>القائمة</Box>
    //     </Box>
    //   </Link>

    //   <img
    //     style={{
    //       height: "40px",
    //     }}
    //     src="/favicon.ico"
    //   ></img>

    //   {user ? (
    //     <Link href={"/api/auth/logout"}>
    //       <Box
    //         sx={{
    //           display: "inline-flex",
    //           flexDirection: "row",
    //           // justifyItems: "center",
    //           alignItems: "center",
    //           cursor: "pointer",
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             pr: 1,
    //           }}
    //         >
    //           <LogoutIcon></LogoutIcon>
    //         </Box>
    //         <Box>الخروج</Box>
    //       </Box>
    //     </Link>
    //   ) : (
    //     <Link href={"/auth/login?space=user"}>
    //       <Box
    //         sx={{
    //           display: "inline-flex",
    //           flexDirection: "row",
    //           // justifyItems: "center",
    //           alignItems: "center",
    //           cursor: "pointer",
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             pr: 1,
    //           }}
    //         >
    //           <LoginIcon></LoginIcon>
    //         </Box>
    //         <Box>الدخول</Box>
    //       </Box>
    //     </Link>
    //   )}
    // </Box>
  );
}
