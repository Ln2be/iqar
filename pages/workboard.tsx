import { Box } from "@mui/material";
import React from "react";
import Layout from "../components/layout";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Nktt, priceCat } from "../lib/myfunctions";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";
import VillaIcon from "@mui/icons-material/Villa";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DBPost } from "../lib/mongo";
import { Post } from "../projectTypes";
import StarIcon from "@mui/icons-material/Star";

let deferredPrompt: any; // Allows to show the install prompt

export default function Page({ metadata }: { metadata: string }) {
  const [installb, setInstallb] = useState("none");

  // the metadata

  const metadatao = JSON.parse(metadata);
  // install pwa
  // const installButton = document.getElementById("install_button");

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 76 and earlier from automatically showing a prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Show the install button
      setInstallb("flex");
      // installButton.hidden = false;
      // installButton.addEventListener("click", installApp);
    });
  }

  // iterate

  const workinterface: {
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
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: { xs: 1, md: 2 },
              maxWidth: "500px",
            }}
          >
            {Object.keys(workinterface).map((key) =>
              Object.keys(workinterface[key].location).map(
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
                      {workinterface[key].icon}
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
                          <Box>{"ط: " + metadatao[key][location].demands}</Box>
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
                        <Box>{workinterface[key].location[location]}</Box>
                      </Box>
                    </Box>
                  </Link>
                )
              )
            )}
          </Box>
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

  const allposts = await DBPost.find({}).sort({ createdAt: -1 });
  function mfilter(kind: string) {
    return allposts.filter((post) => {
      const type = post.type;
      const price = post.price;
      const renttype = type == "demandRent" || type == "offerRent";
      const selltype = type == "selling" || type == "buying";

      function pricewithin(low: number, high: number) {
        return low <= price && price <= high;
      }

      const kindSearch: { [key: string]: boolean } = {
        perio: post.periority && post.periority > 1,
        rent: renttype,
        lowPrice: selltype && pricewithin(0, 4),
        mediumPrice: selltype && pricewithin(4, 15),
        highPrice: selltype && pricewithin(15, 30),
        veryhighPrice: selltype && pricewithin(30, 300),
      };
      return kindSearch[kind];
    });
  }

  Object.keys(metadata).map((key) => {
    const mfilterposts = mfilter(key);

    for (const location in Nktt) {
      const posts = crossedDep(mfilterposts, Nktt[location]);
      for (const post of posts) {
        metadata[key][location].total++;

        // increment the compared posts
        post.comparedTo &&
          post.comparedTo.includes("finished") &&
          metadata[key][location].compared++;

        // increment the demand and offers
        post.type == "demandRent" || "buying"
          ? metadata[key][location].demands++
          : metadata[key][location].offers++;
      }
    }
  });

  // for (const intervall of [
  //   "lowprice",
  //   "mediumprice",
  //   "highprice",
  //   "veryhighprice",
  // ]) {
  //   const lowHigh = priceCat[intervall];
  //   const postsintervall = await DBPost.find({
  //     $or: [
  //       {
  //         type: "buying",
  //       },

  //       {
  //         type: "selling",
  //       },
  //     ],
  //     $and: [
  //       {
  //         price: { $gt: lowHigh.low },
  //       },
  //       { price: { $lte: lowHigh.high } },
  //     ],
  //     hidden: false,
  //   }).sort({ createdAt: -1 });

  //   for (const location in Nktt) {
  //     const posts = crossedDep(postsintervall, Nktt[location]);
  //     for (const post of posts) {
  //       metadata[intervall][location].total++;
  //       post.comparedTo &&
  //         post.comparedTo[0] == "finished" &&
  //         metadata[intervall][location].compared++;
  //       if (location == "nw")
  //         post.type == "buying"
  //           ? metadata[intervall][location].demands++
  //           : metadata[intervall][location].offers++;
  //     }
  //   }
  // }

  return {
    props: { metadata: JSON.stringify(metadata) },
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
