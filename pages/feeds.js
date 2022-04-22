import Layout from "../components/layout";
import Image from "next/image";
import { DBPost } from "../lib/mongo";
import { Box } from "@mui/system";
import Router from "next/router";

export default function Page({ posts }) {
  const postsOb = JSON.parse(posts);

  const typeArabic = {
    buying: "شراء",
    selling: "بيع",
    demandRent: "طلب ايجار",
    offerRent: "عرض ايجار",
  };
  return (
    <Layout>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          maxWidth: "400px",
          p: 2,
        }}
      >
        {postsOb.map((post, i) => {
          const image = post.images[0];
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => {
                Router.push("/post?id=" + post._id);
              }}
            >
              <Box></Box>
              {image ? (
                <Image
                  key={i}
                  layout="responsive"
                  width={image.width}
                  height={image.height}
                  src={image.data}
                ></Image>
              ) : (
                <></>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box>{typeArabic[post.type]}</Box>
                <Box>{post.departement}</Box>
                <Box>{post.region}</Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {post.details}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box>{post._id}</Box>
                <Box>{48692007}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  var postsObject = [];
  if (query.type && query.departement) {
    postsObject = await DBPost.find({
      type: query.type,
      departement: query.departement,
    });
  } else {
    postsObject = await DBPost.find({});
  }

  const posts = JSON.stringify(postsObject);

  return {
    props: {
      posts,
    },
  };
}
