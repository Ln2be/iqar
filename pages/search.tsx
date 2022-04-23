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

  function handleSearch() {
    Router.push(
      "/feeds?type=" + search.type + "&departement=" + search.departement
    );
  }
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          p: { sx: 1, md: 2 },
        }}
      >
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">النوعية</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={(event) => {
              const value = event.target.value;
              search.type = value;
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  value="buying"
                  control={<Radio />}
                  label="شراء"
                />
                <FormControlLabel
                  value="selling"
                  control={<Radio />}
                  label="بيع"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  value="demandRent"
                  control={<Radio />}
                  label="طلب ايجار"
                />
                <FormControlLabel
                  value="offerRent"
                  control={<Radio />}
                  label="عرض ايجار"
                />
              </Box>
            </Box>
          </RadioGroup>
        </FormControl>
        <TextField
          id="outlined-select-currency"
          select
          label="المقاطعة"
          // value={currency}
          onChange={(event) => {
            search.departement = event.target.value;
          }}
          helperText="اختر المقاطعة"
        >
          {departements.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box
          sx={{
            alignItem: "right",
            mt: 4,
          }}
        >
          <Button variant="contained" onClick={handleSearch}>
            ارسال
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
