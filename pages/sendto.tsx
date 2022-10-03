import React from "react";
import { Box } from "@mui/material";
import { PostCard, UserCard } from "../components/cards";
import Layout from "../components/layout";
import { DBPost, DBUser } from "../lib/mongo";
import { Post, UserType } from "../projectTypes";
import { basepath } from "../lib/myfunctions";

interface SendUnit {
  post: Post;
  users: UserType[];
}

export default function Page({ result }: { result: string }) {
  const sendUnits = JSON.parse(result) as SendUnit[];
  return (
    <Layout>
      <Box>
        {sendUnits.map((sendUnit, i) => (
          <Box
            key={i}
            sx={{
              mb: 2,
              maxWidth: "350px",
            }}
          >
            <PostCard type="full" post={sendUnit.post}></PostCard>
            {sendUnit.users.map((user, ius) => {
              console.log(user);
              return (
                <UserCard
                  message={basepath + "/posts?id=" + sendUnit.post._id}
                  key={ius}
                  type="min"
                  user={user}
                ></UserCard>
              );
            })}
          </Box>
        ))}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  const posts = (await DBPost.find({})) as Post[];
  const users = (await DBUser.find({})) as UserType[];

  const sendUnits: SendUnit[] = [];

  if (query.action == "active") {
    const postsWithSendTo = posts.filter(
      (post) => post.sendTo && post.sendTo.length > 0
    );

    postsWithSendTo.map((post) => {
      const postUsers = users.filter(
        (user) =>
          post.sendTo.includes(user.tel) &&
          (!post.sendToArchive || !post.sendToArchive.includes(user.tel))
      );

      if (postUsers.length > 0) {
        sendUnits.push({ post, users: postUsers });
      }
    });

    
  } else if (query.action == "archived") {
    const postsWithSendTo = posts.filter(
      (post) => post.sendToArchive && post.sendToArchive.length > 0
    );

    postsWithSendTo.map((post) => {
      const postUsers = users.filter((user) => post.sendTo.includes(user.tel));

      sendUnits.push({ post, users: postUsers });
    });
  }

  const result = JSON.stringify(sendUnits);

  return {
    props: {
      result: result,
    },
  };
}
