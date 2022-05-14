import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/layout";

export default function Page() {
  const router = useRouter();
  return (
    <Layout>
      <Button
        onClick={() => {
          router.push("/?tour=true");
        }}
      >
        Take a tour on the website
      </Button>
    </Layout>
  );
}
