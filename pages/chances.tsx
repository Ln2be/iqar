import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { DBChance } from "../lib/mongo";
import React from "react";
import Image from "next/image";
import { DBPost } from "../lib/mongo";
import { useUser } from "../lib/auth/hooks";
import { Post, Chance } from "../projectTypes";
import Head from "next/head";
import WhatsappButton from "../components/whatsapp";
import NumberFormat from "react-number-format";
import ShareIcon from "@mui/icons-material/Share";
import { WhatsappShareButton } from "react-share";
import { DEPARTEMENTS } from "../lib/translate";
import Link from "next/link";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { ChanceCard, ChanceForm } from "../components/cards";

export default function Page({ result }: { result: string }) {
  const router = useRouter();
  const { action } = router.query;

  // save the chance to the database
  function handleSubmit(result: any) {
    if (action == "form") {
      const chance = result;
      chance.postid = router.query.postid as string;

      fetch("/api/chances?action=save", {
        method: "POST",
        body: JSON.stringify(chance),
        headers: {
          "content-type": "application/json",
        },
      }).then((data) => {
        data.json().then((d) => {
          router.push("/chances?action=chance&id=" + d._id);
        });
      });
    } else if (action == "update") {
      const updatebody = result;
      const { id } = router.query;
      fetch("/api/chances?action=update&id=" + id, {
        method: "POST",
        body: JSON.stringify(updatebody),
        headers: {
          "content-type": "application/json",
        },
      }).then((data) => {
        data.json().then((d) => {
          router.push("/chances?action=chance&id=" + d.id);
        });
      });
    }
  }

  // show the chances if they are what is requested
  function rChances() {
    const chances = JSON.parse(result) as Chance[];

    return (
      <Box>
        {chances.map((chance, i) => (
          <ChanceCard key={i} chance={chance}></ChanceCard>
        ))}
      </Box>
    );
  }

  function rChance() {
    const chance = JSON.parse(result) as Chance;

    return (
      <Box>
        <ChanceCard chance={chance}></ChanceCard>
      </Box>
    );
  }
  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "400px",
        }}
      >
        {action == "chance" && <Box>{rChance()}</Box>}
        {action == "chances" && <Box>{rChances()}</Box>}
        {action == "form" && (
          <Box>
            <ChanceForm></ChanceForm>
          </Box>
        )}
        {action == "update" && (
          <Box>
            <ChanceForm></ChanceForm>
          </Box>
        )}
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
  // the object to be injected in the chance dom
  let injectObject;

  // if requesting all the chances
  if (query.action == "chances") {
    const chances = await DBChance.find({});
    for (let i = 0; i < chances.length; i++) {
      const post = await DBPost.findOne({ _id: chances[i].postid });

      // add the post to the chance
      chances[i]._doc.post = post;
    }
    const result = JSON.stringify(chances);

    injectObject = {
      result,
    };

    // if requesting one chance
  } else if (query.action == "chance") {
    const chance = await DBChance.findOne({ _id: query.id });
    const post = await DBPost.findOne({ _id: chance.postid });

    chance._doc.post = post;
    const result = JSON.stringify(chance);

    injectObject = {
      result,
    };

    // if requesting the form to add new chance, no is injected
  } else if (query.action == "form" || query.action == "update") {
    injectObject = {
      result: query.action,
    };
  }

  return {
    props: injectObject,
  };
}
