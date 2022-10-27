import React from "react";

import { Box } from "@mui/system";
import { useUser } from "../../lib/auth/hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { basepath } from "../../lib/myfunctions";
import { useRouter } from "next/router";

export default function AuthHeader() {
  const user = useUser();
  const router = useRouter();
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
            {user.tel == "22405904" ? (
              <Box
                sx={{
                  pl: 1,
                }}
                onClick={() => {
                  router.back();
                }}
              >
                رجوع
              </Box>
            ) : (
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
            )}

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
                {router.pathname.startsWith("/rent") ? (
                  <Link href="/rent">الخريطة</Link>
                ) : (
                  router.pathname.startsWith("/buy") && (
                    <Link href="/buy">الخريطة</Link>
                  )
                )}
              </Box>
            </Box>
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
                <Link href={basepath + "/posts?notifyuser=" + user._id}>
                  حسابي
                </Link>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
