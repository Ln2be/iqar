import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { DBTrack } from "../lib/mongo";
import React from "react";
import Image from "next/image";
import { DBPost } from "../lib/mongo";
import { useUser } from "../lib/auth/hooks";
import { Post, Track } from "../projectTypes";
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
import { TrackCard, TrackForm } from "../components/cards";

export default function Page({ result }: { result: string }) {
  const router = useRouter();
  const { action } = router.query;

  // save the track to the database
  function handleSubmit(result: any) {
    if (action == "form") {
      const track = result;
      track.postid = router.query.postid as string;

      fetch("/api/tracks?action=save", {
        method: "POST",
        body: JSON.stringify(track),
        headers: {
          "content-type": "application/json",
        },
      }).then((data) => {
        data.json().then((d) => {
          router.push("/tracks?action=track&id=" + d._id);
        });
      });
    } else if (action == "update") {
      const updatebody = result;
      const { id } = router.query;
      fetch("/api/tracks?action=update&id=" + id, {
        method: "POST",
        body: JSON.stringify(updatebody),
        headers: {
          "content-type": "application/json",
        },
      }).then((data) => {
        data.json().then((d) => {
          router.push("/tracks?action=track&id=" + d.id);
        });
      });
    }
  }

  // show the tracks if they are what is requested
  function rTracks() {
    const tracks = JSON.parse(result) as Track[];

    return (
      <Box>
        {tracks.map((track, i) => (
          <TrackCard key={i} track={track}></TrackCard>
        ))}
      </Box>
    );
  }

  function rTrack() {
    const track = JSON.parse(result) as Track;

    return (
      <Box>
        <TrackCard track={track}></TrackCard>
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
        {action == "track" && <Box>{rTrack()}</Box>}
        {action == "tracks" && <Box>{rTracks()}</Box>}
        {action == "form" && (
          <Box>
            <TrackForm onSubmit={handleSubmit}></TrackForm>
          </Box>
        )}
        {action == "update" && (
          <Box>
            <TrackForm onSubmit={handleSubmit} update></TrackForm>
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
  // the object to be injected in the track dom
  let injectObject;

  // if requesting all the tracks
  if (query.action == "tracks") {
    const tracks = await DBTrack.find({ archived: false | undefined });
    for (let i = 0; i < tracks.length; i++) {
      const post = await DBPost.findOne({ _id: tracks[i].postid });

      // add the post to the track
      tracks[i]._doc.post = post;
    }
    const result = JSON.stringify(tracks);

    injectObject = {
      result,
    };

    // if requesting one track
  } else if (query.action == "track") {
    const track = await DBTrack.findOne({ _id: query.id });
    const post = await DBPost.findOne({ _id: track.postid });

    track._doc.post = post;
    const result = JSON.stringify(track);

    injectObject = {
      result,
    };

    // if requesting the form to add new track, no is injected
  } else if (query.action == "form" || query.action == "update") {
    injectObject = {
      result: query.action,
    };
  } else if (query.action == "archived") {
    const tracks = await DBTrack.find({ archived: true });
    for (let i = 0; i < tracks.length; i++) {
      const post = await DBPost.findOne({ _id: tracks[i].postid });

      // add the post to the track
      tracks[i]._doc.post = post;
    }
    const result = JSON.stringify(tracks);

    injectObject = {
      result,
    };

    // if requesting one track
  }

  return {
    props: injectObject,
  };
}
