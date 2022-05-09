import React from "react";

import { Box } from "@mui/system";
import { useUser } from "../../lib/auth/hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

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
              pl: { sx: 2, md: 2 },
              pr: { sx: 2, md: 2 },
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
            <Box
              sx={{
                cursor: "pointer",
              }}
            >
              <Link href="/reps">الممثلين</Link>
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
                <Link href={"/?user=" + user.username}>منشوراتي</Link>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
