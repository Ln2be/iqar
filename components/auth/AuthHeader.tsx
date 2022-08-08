import React from "react";

import { Box } from "@mui/system";
import { useUser } from "../../lib/auth/hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { WhatsappShareButton } from "react-share";

export default function AuthHeader() {
  const user = useUser();
  return (
    <Box>
      <Box>
        {user?.role == "admin" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "orange",
              color: "white",
              pl: 2,
              pr: 2,
            }}
          >
            <Link href={"/settings"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <AccountCircleIcon></AccountCircleIcon>
                <Box
                  sx={{
                    pl: 1,
                  }}
                >
                  {user?.username}
                </Box>
              </Box>
            </Link>
            <Box
              sx={{
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link href="/workboard">العمل</Link>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box>
        {user?.role == "user" && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: (theme) => theme.palette.primary.light,
                color: "white",
                p: { sx: 1, md: 1 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <AccountCircleIcon></AccountCircleIcon>
                <Box
                  sx={{
                    pl: 1,
                  }}
                >
                  {user?.username}
                </Box>
              </Box>
              <Box>
                <Link href={"/samsar?userTel=" + user.tel}>بنك المعلومات</Link>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box>
        {user?.role == "rep" && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: (theme) => theme.palette.primary.light,
                color: "white",
                pl: 2,
                pr: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <AccountCircleIcon></AccountCircleIcon>
                <Box
                  sx={{
                    pl: 1,
                  }}
                >
                  {user?.username}
                </Box>
              </Box>
              <Box>
                <Link href={"/feeds?user=rep&departement=" + user.departement}>
                  الطلبات
                </Link>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
