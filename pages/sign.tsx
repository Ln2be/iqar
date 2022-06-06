import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { UserForm } from "../components/cards";
import Layout from "../components/layout";
import { useUser } from "../lib/auth/hooks";

export default function Page() {
  const router = useRouter();
  useUser({ redirectTo: "/", redirectIfFound: true });

  const { action, role } = router.query;

  return (
    <Layout>
      <Box>
        {action == "login" && <UserForm isLogin></UserForm>}
        {action == "signup" && role == "admin" && <UserForm isAdmin></UserForm>}
        {action == "signup" && role == "rep" && <UserForm></UserForm>}
      </Box>
    </Layout>
  );
}
