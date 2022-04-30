import React from "react";
import { Box } from "@mui/system";
import { WhatsappShareButton } from "react-share";
import { useRouter } from "next/router";
import { DBPost, DBUserCode } from "../../lib/mongo";

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
      return [...new Array(100)].map((v) => getRndInteger(999999, 10000000));
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
                <WhatsappShareButton
                  url={
                    "https://iqar.store/auth/signup?space=admin&code=" +
                    post.code
                  }
                >
                  <Box
                    sx={{
                      color: "blue",
                      fontSize: "small",
                    }}
                  >
                    مشاركة
                  </Box>
                </WhatsappShareButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          sendCodes();
          router.push("/code/user2");
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
