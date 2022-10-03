import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import { Box } from "@mui/material";
import Layout from "../components/layout";
import Link from "next/link";
import { DBPost, DBUser } from "../lib/mongo";
import { Nktt } from "../lib/myfunctions";
import { Post, UserType } from "../projectTypes";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

export default function Page({ metadata }: { metadata: string }) {
  const metadatao = JSON.parse(metadata);

  // show the reps in each region
  const repinterface: {
    [key: string]: { location: { [key: string]: string }; icon: JSX.Element };
  } = {
    rep: {
      location: {
        nn: "الشمالية",
        ns: "الجنوبية",
        nw: "الغربية",
      },
      icon: (
        <FaceIcon
          style={{
            width: "20%",
            height: "20%",
          }}
        ></FaceIcon>
      ),
    },
  };

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: { xs: 1, md: 2 },
            maxWidth: "500px",
          }}
        >
          {Object.keys(repinterface).map((key) =>
            Object.keys(repinterface[key].location).map(
              (location, ilocation) => (
                <Link
                  key={ilocation}
                  href={"/reps?type=" + key + "&location=" + location}
                >
                  <Box
                    sx={{
                      bgColor: "#fff",
                      border: "1px solid",
                      width: "100%",
                      height: "150px",
                    }}
                  >
                    {repinterface[key].icon}
                    <Box
                      style={{
                        width: "100%",
                        height: "60%",
                      }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        // alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "space-around",
                          alignItems: "center",
                          fontSize: 40,
                        }}
                      >
                        {metadatao[key][location].total}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "20%",
                        // textAlign: "center",
                        backgroundColor: (theme) => theme.palette.primary.main,
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box>{repinterface[key].location[location]}</Box>
                    </Box>
                  </Box>
                </Link>
              )
            )
          )}
          {
            <Link href={"/posts?action=posts&hidden=true"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <VisibilityOffIcon></VisibilityOffIcon>
                <Box
                  style={{
                    width: "100%",
                    height: "60%",
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    // alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "space-around",
                      alignItems: "center",
                      fontSize: 40,
                    }}
                  >
                    {metadatao.rep.hidden.total}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    // textAlign: "center",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>{"المخفية"}</Box>
                </Box>
              </Box>
            </Link>
          }

          {
            <Link href={"/sendto?action=active"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <ForwardToInboxIcon></ForwardToInboxIcon>
                <Box
                  style={{
                    width: "100%",
                    height: "60%",
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    // alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "space-around",
                      alignItems: "center",
                      fontSize: 40,
                    }}
                  >
                    {metadatao.rep.sendto.total}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    // textAlign: "center",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>{"المتابعة النشطة"}</Box>
                </Box>
              </Box>
            </Link>
          }

          {
            <Link href={"/sendto?action=archived"}>
              <Box
                sx={{
                  bgColor: "#fff",
                  border: "1px solid",
                  width: "100%",
                  height: "150px",
                }}
              >
                <ForwardToInboxIcon></ForwardToInboxIcon>
                <Box
                  style={{
                    width: "100%",
                    height: "60%",
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    // alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "space-around",
                      alignItems: "center",
                      fontSize: 40,
                    }}
                  >
                    {metadatao.rep.archivedSend.total}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    // textAlign: "center",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>{"المتابعة المارشفة"}</Box>
                </Box>
              </Box>
            </Link>
          }
        </Box>
      </Box>
    </Layout>
  );
}

// this function excuted in the server
export async function getServerSideProps() {
  // the object to be injected in the post dom
  // let injectObject;

  interface SendUnit {
    post: Post;
    users: UserType[];
  }

  const metadata: {
    [key: string]: { [key: string]: { [key: string]: number } };
  } = {
    rep: {
      nn: {
        total: 0,
      },
      ns: {
        total: 0,
      },

      nw: {
        total: 0,
      },
      hidden: {
        total: 0,
      },
      sendto: {
        total: 0,
      },
      archivedSend: {
        total: 0,
      },
    },
  };
  const usersObjectall = (await DBUser.find({}).sort({})) as UserType[];
  const users = usersObjectall.filter((user) => user.role != "admin");

  const hiddenPosts = await DBPost.find({ hidden: true });
  metadata.rep.hidden.total = hiddenPosts.length;

  for (const location in Nktt) {
    const posts = crossedDep(users, Nktt[location]);
    metadata.rep[location].total = posts.length;
  }

  const allPosts = (await DBPost.find({})) as Post[];

  const sendUnits: SendUnit[] = [];

  const postsWithSendTo = allPosts.filter(
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

  metadata.rep.sendto.total = sendUnits.length;

  const postsSentArchive = allPosts.filter(
    (post) => post.sendToArchive && post.sendToArchive.length > 0
  );

  metadata.rep.archivedSend.total = postsSentArchive.length;

  return {
    props: { metadata: JSON.stringify(metadata) },
  };
}

function crossedDep(posts: UserType[], departements: string[]) {
  return posts.filter((post) => {
    // look for a cross between the departements
    const cross = post.departements.filter((departement) =>
      departements.includes(departement)
    );
    // return the post if there is cross
    return cross.length > 0;
  });
}
