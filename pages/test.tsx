import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { PickMap } from "../components/map";
import { getMapregion } from "../lib/myfunctions";

export default function Page() {
  const [mapregion, setRegion] = useState("");
  return (
    <>
      <PickMap
        handlePosition={function (position: [number, number]): void {
          setRegion(getMapregion(position));
        }}
      ></PickMap>
      <Box>{mapregion}</Box>
    </>
  );
}
