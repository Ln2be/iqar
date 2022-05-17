import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUser } from "../lib/auth/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import WhatsappOutlinedIcon from "@mui/icons-material/WhatsappOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import styles from "../styles/Home.module.css";

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
            color: (theme) => theme.palette.primary.main,
            p: 1,
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
        <HomeOutlinedIcon
          onClick={() => {
            router.push("/");
          }}
        ></HomeOutlinedIcon>
        <PostAddOutlinedIcon
          onClick={() => {
            router.push("/post-form");
          }}
        ></PostAddOutlinedIcon>
        <WhatsappOutlinedIcon
          onClick={() => {
            router.push("/contactUs");
          }}
        ></WhatsappOutlinedIcon>
        <LoginOutlinedIcon
          onClick={() => {
            router.push("/auth/login");
          }}
        ></LoginOutlinedIcon>
        <MenuOutlinedIcon
          onClick={() => {
            router.push("/menu");
          }}
        ></MenuOutlinedIcon>
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
