import { Representant } from "../lib/mongo";
import Box from "@mui/material/Box";

export default function Page({ reps }) {
  const repsfoo = [
    {
      name: "elhassen",
      tel: 2211871,
      dep: "Arafat",
      region: "souk mekka",
    },
  ];
  return (
    <Box>
      {repsfoo.map((rep) => (
        <Box>
          <Box>{rep.name}</Box>
          <Box>{rep.tel} </Box>
          <Box>{rep.dep}</Box>
          <Box>{rep.region}</Box>
        </Box>
      ))}
    </Box>
  );
}

export async function getServerSideProps(context) {
  // const articleStream = await getArticle();
  // const article = await articleStream.json();

  const articleObject = await Representant.find({});

  const reps = JSON.stringify(articleObject);

  return {
    props: {
      reps,
    },
  };
}
