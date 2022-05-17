import { Box } from "@mui/system";
import React from "react";
import Layout from "../components/layout";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";

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
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: { xs: 1, md: 2 },
            maxWidth: "500px",
          }}
        >
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
              width: "100%",
              height: "100%",
            }}
          >
            <DynamicFeedIcon
              style={{
                width: "100%",
                height: "80%",
              }}
            ></DynamicFeedIcon>
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
              <Box>جميع الاعلانات</Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <LocalHotelIcon
              style={{
                width: "100%",
                height: "80%",
              }}
            ></LocalHotelIcon>
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
              <Box>إقامة</Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <KeyIcon
              style={{
                width: "100%",
                height: "80%",
              }}
            ></KeyIcon>
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
              <Box>عروض الايجار</Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <KeyOffIcon
              style={{
                width: "100%",
                height: "80%",
              }}
            ></KeyOffIcon>
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
              <Box>طلبات الايجار</Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <SellIcon
              style={{
                width: "100%",
                height: "80%",
              }}
            ></SellIcon>
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
              <Box>عروض البيع</Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgColor: "#fff",
              border: "1px solid",
            }}
          >
            <ShoppingCart
              style={{
                width: "100%",
                height: "80%",
              }}
            ></ShoppingCart>
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
              <Box>طلبات الشراء</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
