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
import { Button } from "@mui/material";

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
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.primary.main,
          p: 1,
          color: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <p></p>
          عقار نواكشوط
        </Box>
        {router.pathname.startsWith("/rent") ? (
          <Button
            variant="contained"
            sx={{
              background: "white",
              color: "red",
            }}
            onClick={() => {
              router.push("/buy");
            }}
          >
            البيع
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              background: "white",
              color: "red",
            }}
            onClick={() => {
              router.push("/rent");
            }}
          >
            الايجار
          </Button>
        )}
      </Box>
      <Box
        sx={{
          // color: (theme) => theme.palette.primary.main,
          display: "flex",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        {router.pathname.startsWith("/rent") ? (
          router.pathname == "/rent" ? (
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
                  router.push("/rent");
                }}
                style={{}}
              ></HomeIcon>
            </Box>
          ) : (
            <HomeOutlinedIcon></HomeOutlinedIcon>
          )
        ) : (
          router.pathname.startsWith("/buy") &&
          (router.pathname == "buy" ? (
            <Box
              sx={{
                borderBottom: "3px solid",
                borderColor: (theme) => theme.palette.primary.main,
                // color: "#0039e6",
                color: (theme) => theme.palette.primary.main,
                // width: "100%",
              }}
            >
              <HomeIcon></HomeIcon>
            </Box>
          ) : (
            <HomeOutlinedIcon
              onClick={() => {
                router.push("/buy");
              }}
              style={{}}
            ></HomeOutlinedIcon>
          ))
        )}

        {user?.role == "admin" &&
          (router.pathname.startsWith("/rent") ? (
            <CreateOutlinedIcon
              onClick={() => {
                router.push("/posts?action=rentform");
              }}
            ></CreateOutlinedIcon>
          ) : (
            router.pathname.startsWith("/buy") && (
              <CreateOutlinedIcon
                onClick={() => {
                  router.push("/posts?action=buyform");
                }}
              ></CreateOutlinedIcon>
            )
          ))}

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
              router.push("/sign?action=login");
            }}
          ></LoginOutlinedIcon>
        )}

        {/* {router.pathname == "/menu" ? (
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
        )} */}
      </Box>
    </Box>
  );
}
