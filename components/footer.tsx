import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useRouter } from "next/router";

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  return (
    <Box sx={{ position: "fixed", width: "100%", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={() => {
            router.push("/search");
          }}
          label="بحث"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            router.push("/post-form");
          }}
          label="إضافة إعلان"
          icon={<PostAddIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            router.push("/contactUs");
          }}
          label="إتصل بنا"
          icon={<WhatsAppIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
