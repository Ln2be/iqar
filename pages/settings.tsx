import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import { Box } from "@mui/material";
import Layout from "../components/layout";
import Link from "next/link";
import { DBPost, DBUser } from "../lib/mongo";
import { Nktt } from "../lib/myfunctions";
import { UserType } from "../projectTypes";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Page({ metadata }: { metadata: string }) {
  const metadatao = JSON.parse(metadata);

  // show the reps in each region
  const repinterface: { [key: string]: { location: any; icon: any } } = {
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
          {Object.keys(repinterface).map((key, index) =>
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
        </Box>
      </Box>
    </Layout>
  );
}

// this function excuted in the server
export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  // the object to be injected in the post dom
  let injectObject;

  const metadata: { [key: string]: { [key: string]: any } } = {
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
    },
  };
  const usersObjectall = await DBUser.find({}).sort({});
  const users = usersObjectall.filter((user) => user.role != "admin");

  const hiddenPosts = await DBPost.find({ hidden: true });
  metadata.rep.hidden.total = hiddenPosts.length;

  for (const location in Nktt) {
    console.log(users.length);
    const posts = crossedDep(users, Nktt[location]);
    for (const post of posts) {
      metadata.rep[location].total++;
    }
  }

  console.log(metadata);

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
    console.log([departements, post.departement, cross]);
    return cross.length > 0;
  });
}
