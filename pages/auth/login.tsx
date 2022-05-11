import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "../../lib/auth/hooks";
import Layout from "../../components/layout";
import Form from "../../components/auth/form";
import { Box } from "@mui/system";
import { text } from "stream/consumers";
import WhatsappButton from "../../components/whatsapp";
import { Button } from "@mui/material";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  //  useAdmin({ redirectTo: "/", redirectIfFound: true });

  const test_space = useRouter().query.space;

  const space = typeof test_space === "string" ? test_space : "";
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.tel.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/");
      } else {
        const txt = await res.text();
        console.log(["txt"]);
        // throw new Error(txt);
      }
    } catch (error: any) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <Box>
        <Box>
          <Form
            space={space}
            isLogin
            errorMessage={errorMsg}
            onSubmit={handleSubmit}
          />
        </Box>
        <Box>
          <p>
            لفتح حساب و لاستقادة من بنك معلومات او العمل معنا كممثل اتصل بنا
          </p>
          {/* <Box>
            <WhatsappButton phone={"+22248692007"} message={"salam"}>
              <Button variant="contained">واتساب</Button>
            </WhatsappButton>
          </Box> */}
        </Box>

        <style jsx>{`
          .login {
            max-width: 21rem;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
        `}</style>
      </Box>
    </Layout>
  );
};

export default Login;
