import { Box } from "@mui/material";
import React from "react";
import Layout from "../components/layout";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Nktt } from "../lib/myfunctions";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";
import VillaIcon from "@mui/icons-material/Villa";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DBPost } from "../lib/mongo";
import { Post } from "../projectTypes";
import StarIcon from "@mui/icons-material/Star";
import { Tab, Tabpanel } from "../components/cards";
import MyLocationIcon from "@mui/icons-material/MyLocation";

// let deferredPrompt: any; // Allows to show the install prompt

export default function Page({
  metadata,
  sremainLength,
}: {
  metadata: string;
  sremainLength: string;
}) {
  // const [installb, setInstallb] = useState("none");
  const [value, setValue] = useState(1);

  // the metadata

  const metadatao = JSON.parse(metadata);
  const remainLength = JSON.parse(sremainLength);

  const workinterface1: {
    [key: string]: { location: { [key: string]: string }; icon: JSX.Element };
  } = {
    perio: {
      location: {
        nn: "الشمالية",
        ns: "الجنوبية",
        nw: "الغربية",
      },
      icon: (
        <StarIcon
          style={{
            width: "20%",
            height: "20%",
          }}
        ></StarIcon>
      ),
    },
    rent: {
      location: {
        nn: "الشمالية",
        ns: "الجنوبية",
        nw: "الغربية",
      },
      icon: (
        <KeyIcon
          style={{
            width: "20%",
            height: "20%",
          }}
        ></KeyIcon>
      ),
    },
  };

  const workinterface2: {
    [key: string]: { location: { [key: string]: string }; icon: JSX.Element };
  } = {
    highprice: {
      location: {
        nn: "الشمالية",
        ns: "الجنوبية",
        nw: "الغربية",
      },
      icon: (
        <MapsHomeWorkIcon
          style={{
            width: "20%",
            height: "20%",
          }}
        ></MapsHomeWorkIcon>
      ),
    },
    veryhighprice: {
      location: {
        nn: "الشمالية",
        ns: "الجنوبية",
        nw: "الغربية",
      },

      icon: (
        <AttachMoneyIcon
          style={{
            width: "20%",
            height: "20%",
          }}
        ></AttachMoneyIcon>
      ),
    },
  };

  const workinterface3: {
    [key: string]: { location: { [key: string]: string }; icon: JSX.Element };
  } = {
    lowprice: {
      location: {
        nn: "الشمالية",
        ns: "الجنوبية",
        nw: "الغربية",
      },
      icon: (
        <CropLandscapeIcon
          style={{
            width: "20%",
            height: "20%",
          }}
        ></CropLandscapeIcon>
      ),
    },
    mediumprice: {
      location: {
        nn: "الشمالية",
        ns: "الجنوبية",
        nw: "الغربية",
      },
      icon: (
        <VillaIcon
          style={{
            width: "20%",
            height: "20%",
          }}
        ></VillaIcon>
      ),
    },
  };

  function handleChange(index: number) {
    setValue(index);
  }

  // const router = useRouter();
  return (
    <>
      <Head>
        <title>
          مؤسسة وسيطة لبيع و شراء و ايجار المنازل و الشقق و العقارات بشكل عام في
          نواكشوط موريتانيا الصفحة الرئيسية
        </title>
      </Head>
      <Layout>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Tab
              value={value}
              name={"اولوية 1"}
              index={1}
              handleChange={handleChange}
            />
            <Tab
              value={value}
              name={"اولوية 2"}
              index={2}
              handleChange={handleChange}
            />
            <Tab
              value={value}
              name={"اولوية 3"}
              index={3}
              handleChange={handleChange}
            />
          </Box>
          <Tabpanel value={value} index={1}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: { xs: 1, md: 2 },
                maxWidth: "500px",
              }}
            >
              {Object.keys(workinterface1).map((key) =>
                Object.keys(workinterface1[key].location).map(
                  (location, ilocation) => (
                    <Link
                      key={ilocation}
                      href={
                        "/posts?action=posts&type=" +
                        key +
                        "&location=" +
                        location
                      }
                    >
                      <Box
                        sx={{
                          bgColor: "#fff",
                          border: "1px solid",
                          width: "100%",
                          height: "150px",
                        }}
                      >
                        {workinterface1[key].icon}
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
                            }}
                          >
                            {metadatao[key][location].total}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              // textAlign: "center",
                              backgroundColor: (theme) =>
                                theme.palette.primary.light,
                              color: "white",
                            }}
                          >
                            <Box>
                              {"ط: " + metadatao[key][location].demands}
                            </Box>
                            <Box>{"ع: " + metadatao[key][location].offers}</Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                            }}
                          >
                            {
                              metadatao[key][location].compared
                                ? Math.floor(
                                    (metadatao[key][location].compared /
                                      metadatao[key][location].total) *
                                      100
                                  ) + "%"
                                : "0%"
                              // metadatao[key][location].compared
                            }
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "20%",
                            // textAlign: "center",
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box>{workinterface1[key].location[location]}</Box>
                        </Box>
                      </Box>
                    </Link>
                  )
                )
              )}
              <Link href={"/posts?action=posts&position=position"}>
                <Box
                  sx={{
                    bgColor: "#fff",
                    border: "1px solid",
                    width: "100%",
                    height: "150px",
                  }}
                >
                  <MyLocationIcon></MyLocationIcon>
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
                      }}
                    >
                      {remainLength[1]}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {
                        remainLength[1]
                          ? Math.floor(
                              (remainLength[1] / remainLength[0]) * 100
                            ) + "%"
                          : "0%"
                        // metadatao[key][location].compared
                      }
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
                    <Box>الخريطة</Box>
                  </Box>
                </Box>
              </Link>
            </Box>
          </Tabpanel>
          <Tabpanel value={value} index={2}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: { xs: 1, md: 2 },
                maxWidth: "500px",
              }}
            >
              {Object.keys(workinterface2).map((key) =>
                Object.keys(workinterface2[key].location).map(
                  (location, ilocation) => (
                    <Link
                      key={ilocation}
                      href={
                        "/posts?action=posts&type=" +
                        key +
                        "&location=" +
                        location
                      }
                    >
                      <Box
                        sx={{
                          bgColor: "#fff",
                          border: "1px solid",
                          width: "100%",
                          height: "150px",
                        }}
                      >
                        {workinterface2[key].icon}
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
                            }}
                          >
                            {metadatao[key][location].total}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              // textAlign: "center",
                              backgroundColor: (theme) =>
                                theme.palette.primary.light,
                              color: "white",
                            }}
                          >
                            <Box>
                              {"ط: " + metadatao[key][location].demands}
                            </Box>
                            <Box>{"ع: " + metadatao[key][location].offers}</Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                            }}
                          >
                            {
                              metadatao[key][location].compared
                                ? Math.floor(
                                    (metadatao[key][location].compared /
                                      metadatao[key][location].total) *
                                      100
                                  ) + "%"
                                : "0%"
                              // metadatao[key][location].compared
                            }
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "20%",
                            // textAlign: "center",
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box>{workinterface2[key].location[location]}</Box>
                        </Box>
                      </Box>
                    </Link>
                  )
                )
              )}
            </Box>
          </Tabpanel>
          <Tabpanel value={value} index={3}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: { xs: 1, md: 2 },
                maxWidth: "500px",
              }}
            >
              {Object.keys(workinterface3).map((key) =>
                Object.keys(workinterface3[key].location).map(
                  (location, ilocation) => (
                    <Link
                      key={ilocation}
                      href={
                        "/posts?action=posts&type=" +
                        key +
                        "&location=" +
                        location
                      }
                    >
                      <Box
                        sx={{
                          bgColor: "#fff",
                          border: "1px solid",
                          width: "100%",
                          height: "150px",
                        }}
                      >
                        {workinterface3[key].icon}
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
                            }}
                          >
                            {metadatao[key][location].total}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              // textAlign: "center",
                              backgroundColor: (theme) =>
                                theme.palette.primary.light,
                              color: "white",
                            }}
                          >
                            <Box>
                              {"ط: " + metadatao[key][location].demands}
                            </Box>
                            <Box>{"ع: " + metadatao[key][location].offers}</Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                            }}
                          >
                            {
                              metadatao[key][location].compared
                                ? Math.floor(
                                    (metadatao[key][location].compared /
                                      metadatao[key][location].total) *
                                      100
                                  ) + "%"
                                : "0%"
                              // metadatao[key][location].compared
                            }
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: "20%",
                            // textAlign: "center",
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box>{workinterface3[key].location[location]}</Box>
                        </Box>
                      </Box>
                    </Link>
                  )
                )
              )}
            </Box>
          </Tabpanel>
        </Box>
      </Layout>
    </>
  );
}

// this function excuted in the server
export async function getServerSideProps() {
  // the object to be injected in the post dom
  // let injectObject;

  const metadata: {
    [key: string]: { [key: string]: { [key: string]: number } };
  } = {
    perio: {
      nn: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
      ns: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      nw: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
    },
    rent: {
      nn: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
      ns: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      nw: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
    },

    lowprice: {
      nn: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
      ns: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      nw: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
    },

    mediumprice: {
      nn: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      ns: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      nw: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
    },

    highprice: {
      nn: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      ns: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      nw: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
    },

    veryhighprice: {
      nn: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      ns: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },

      nw: {
        total: 0,
        compared: 0,
        demands: 0,
        offers: 0,
      },
    },
  };

  const allposts = (await DBPost.find({}).sort({ createdAt: -1 })) as Post[];
  function mfilter(posts: Post[], kind: string) {
    return posts.filter((post) => {
      const type = post.type;
      const price = post.price;
      const renttype = type == "demandRent" || type == "offerRent";
      const selltype = type == "selling" || type == "buying";

      function pricewithin(low: number, high: number) {
        return low <= price && price <= high;
      }

      const kindSearch: { [key: string]: boolean } = {
        perio: typeof post.periority != "undefined" && post.periority > 1,
        rent: renttype,
        lowprice: selltype && pricewithin(0, 4),
        mediumprice: selltype && pricewithin(4, 15),
        highprice: selltype && pricewithin(15, 30),
        veryhighprice: selltype && pricewithin(30, 300),
      };
      return kindSearch[kind];
    });
  }

  Object.keys(metadata).map((key) => {
    const mfilterposts = mfilter(allposts, key);

    for (const location in Nktt) {
      const posts = crossedDep(mfilterposts, Nktt[location]);
      for (const post of posts) {
        metadata[key][location].total++;

        // increment the compared posts
        post.comparedTo &&
          post.comparedTo.includes("finished") &&
          metadata[key][location].compared++;

        // increment the demand and offers
        post.type == "demandRent" || post.type == "buying"
          ? metadata[key][location].demands++
          : metadata[key][location].offers++;
      }
    }
  });

  const allPostsAdmin = allposts.filter((post) => {
    return post.user == "22118721" || post.user == "22405904";
  });

  const remainmap = allPostsAdmin.filter((post) => {
    return !post.position || post.position.length < 1;
  });
  return {
    props: {
      metadata: JSON.stringify(metadata),
      sremainLength: JSON.stringify([
        allPostsAdmin.length,
        allPostsAdmin.length - remainmap.length,
      ]),
    },
  };
}

function crossedDep(posts: Post[], departements: string[]) {
  return posts.filter((post) => {
    // look for a cross between the departements
    const cross = post.departements.filter((departement) =>
      departements.includes(departement)
    );
    // return the post if there is cross
    return cross.length > 0;
  });
}
