import { Box } from "@mui/system";
import React from "react";
import { WhatsappShareButton } from "react-share";
import { useRouter } from "next/router";
import { DBPost, DBUserCode } from "../../lib/mongo";
import Link from "next/link";
import Button from "@mui/material/Button";

const isProduction = process.env.NODE_ENV === "production";
const urlbase = isProduction ? "https://iqar.store/" : "http://localhost:3000/";

export default function Page({ posts }: { posts: any }) {
  const postsOb = JSON.parse(posts);
  const router = useRouter();

  function sendCodes() {
    const random = generateCodes();
    const body = [...new Array(30)].map((v, i) => {
      return {
        code: random.code[i],
        used: random.used[i],
      };
    });

    fetch("/api/code?role=user", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  function generateCodes() {
    const data: { [key: string]: number[] } = {
      used: [],
      code: [],
    };

    function getColumnOfRandom() {
      return [...new Array(100)].map((v) => getRndInteger(99999, 1000000));
    }

    function getRndInteger(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    data.code = getColumnOfRandom();
    data.used = data.code.map((v) => 0);

    return data;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Used</th>
          </tr>
        </thead>
        <tbody>
          {postsOb.map((post: any, i: number) => (
            <tr key={i}>
              <td>{post.code}</td>
              <td>{post.used}</td>
              <td>
                <Link href={"auth/signup?space=user&code=" + post.code}>
                  gosamsar
                </Link>
              </td>
              <td>
                <Link href={"auth/signup?space=rep&code=" + post.code}>
                  gorep
                </Link>
              </td>
              <td>
                <WhatsappShareButton
                  url={urlbase + "auth/signup?space=user&code=" + post.code}
                >
                  <Box
                    sx={{
                      color: "blue",
                      fontSize: "small",
                    }}
                  >
                    صمصار
                  </Box>
                </WhatsappShareButton>
              </td>
              <td>
                <WhatsappShareButton
                  url={urlbase + "auth/signup?space=rep&code=" + post.code}
                >
                  <Box
                    sx={{
                      color: "blue",
                      fontSize: "small",
                    }}
                  >
                    ممثل
                  </Box>
                </WhatsappShareButton>
              </td>
              <td>
                <Button
                  onClick={() => {
                    fetch("/api/useCode?count=" + post.count).then(() => {
                      router.reload();
                    });
                  }}
                >
                  use
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          sendCodes();
          router.push("/code/user");
        }}
      >
        add another 30
      </button>
    </>
  );
}

export async function getServerSideProps() {
  const postsObject = await DBUserCode.find({}).sort({ code: 1 });
  const posts = JSON.stringify(postsObject);

  return {
    props: {
      posts,
    },
  };
}
