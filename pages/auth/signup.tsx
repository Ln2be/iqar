import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "../../lib/auth/hooks";
import Layout from "../../components/layout";
import Form from "../../components/auth/form";
import { Box } from "@mui/system";

const Signup = () => {
  const space1 = useRouter().query.space;
  const space = typeof space1 === "string" ? space1 : "";
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.repName.value,
      departement: e.currentTarget.departement.value,
      region: e.currentTarget.region.value,
      tel: e.currentTarget.tel.value,
      code: e.currentTarget.code.value,
      password: e.currentTarget.password.value,
      rpassword: e.currentTarget.rpassword.value,
      role: space,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/auth/login");
      } else if (res.status === 300) {
        setErrorMsg("الكود غير صحيح");
      } else {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <Box>
        <Form
          isLogin={false}
          space={space}
          errorMessage={errorMsg}
          onSubmit={handleSubmit}
        />
      </Box>
    </Layout>
  );
};

export default Signup;
