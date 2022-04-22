import Layout from "../components/layout";
import Image from "next/image";
import { Box } from "@mui/system";
import { DBPost } from "../lib/mongo";
import { Button as a } from "@mui/material";
import { useUser } from "../lib/auth/hooks";

export default function Page({ postjson }) {
  const user = useUser();

  const post = JSON.parse(postjson);
  // const post = null;

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
        {post ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
            <Box>
              {post.images &&
                post.images.map((image, i) => (
                  <Image
                    key={i}
                    layout="responsive"
                    width={image.width}
                    height={image.height}
                    src={image.data}
                  ></Image>
                ))}
            </Box>
            {(user?.role == "admin" || user?.username == post.user) && (
              <a href={"/api/delete?id=" + post._id}>حذف</a>
            )}
          </Box>
        ) : (
          <Box>{"no post"}</Box>
        )}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const postObject = await DBPost.findOne({ _id: query.id });

  const postjson = JSON.stringify(postObject);

  return {
    props: {
      postjson,
    },
  };
}
