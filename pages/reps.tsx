import Layout from "../components/layout";
import { DBUser } from "../lib/mongo";
import { Box } from "@mui/system";

export default function Page({ usersJson }) {
  const users = JSON.parse(usersJson);

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
        {users.map((user, i) => {
          return (
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
                <Box>{user.username}</Box>
                <Box>{user.departement}</Box>
                <Box>{user.region}</Box>
                <Box>{user.tel}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const usersObject = await DBUser.find({});
  const usersJson = JSON.stringify(usersObject);

  return {
    props: {
      usersJson,
    },
  };
}
