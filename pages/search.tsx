import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Layout from "../components/layout";
import { Button } from "@mui/material";
import Router, { useRouter } from "next/router";
import Departement from "../components/search";

const departements = [
  {
    value: "Tayaret",
    label: "تيارت",
  },
  {
    value: "Ksar",
    label: "لكصر",
  },
  {
    value: "DarNaim",
    label: "دار النعيم",
  },
  {
    value: "TevreghZeina",
    label: "تفرغ زينة",
  },
  {
    value: "Sebkha",
    label: "السبخة",
  },
  {
    value: "Elmina",
    label: "الميناء",
  },
  {
    value: "Arafat",
    label: "عرفات",
  },
  {
    value: "Toujounine",
    label: "توجنين",
  },
  {
    value: "Riyadh",
    label: "الرياض",
  },
];

const search: { [key: string]: string } = {
  type: "",
  departement: "",
};
export default function Page() {
  // const router = useRouter();

  function handleDepChange(dep: any) {
    console.log(dep);
  }
  return (
    <Layout>
      <Departement onChangeDep={handleDepChange}></Departement>
    </Layout>
  );
}
