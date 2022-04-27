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
      <HomeIcon
        onClick={() => {
          router.push("/");
        }}
      ></HomeIcon>

      {user ? (
        <LogoutIcon
          onClick={() => {
            router.push("/api/auth/logout");
          }}
        ></LogoutIcon>
      ) : (
        <LoginIcon
          onClick={() => {
            router.push("/auth/login?space=user");
          }}
        ></LoginIcon>
      )}
    </Box>
  );
}
