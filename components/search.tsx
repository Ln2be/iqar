import React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

// initialize the departements checkboxes
const inicheck: { [key: string]: boolean } = {
  Tayaret: false,
  Ksar: false,
  DarNaim: false,
  TevreghZeina: false,
  Sebkha: false,
  Elmina: false,
  Arafat: false,
  Toujounine: false,
  Riyadh: false,
};

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
const depvalues: any = [];

export default function Departement({ onChangeDep }: { onChangeDep: any }) {
  const [depcheck, setdepcheck] = useState(inicheck);

  function handleChange(e: any) {
    const name = e.target.name;

    setdepcheck((prev) => {
      const prevdep: any = { ...prev };
      prevdep[name] = !prevdep[name];
      return prevdep;
    });

    if (!e.target.checked) {
      const index = depvalues.indexOf(name);
      if (index > -1) {
        depvalues.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      depvalues.push(name);
    }

    onChangeDep(depvalues);
  }

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">اختر المقاطعات</FormLabel>
          <FormGroup>
            <Box>
              {departements.slice(0, 3).map((departement, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        checked={depcheck[departement.value]}
                        onChange={handleChange}
                        name={departement.value}
                      />
                    }
                    label={departement.label}
                  />
                );
              })}
            </Box>
            <Box>
              {departements.slice(3, 6).map((departement, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        checked={depcheck[departement.value]}
                        onChange={handleChange}
                        name={departement.value}
                      />
                    }
                    label={departement.label}
                  />
                );
              })}
            </Box>
            <Box>
              {departements.slice(6, 9).map((departement, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        checked={depcheck[departement.value]}
                        onChange={handleChange}
                        name={departement.value}
                      />
                    }
                    label={departement.label}
                  />
                );
              })}
            </Box>
          </FormGroup>
          <FormHelperText>
            اختر بعض المقاطعات من اجل مزيد من التحديد
          </FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}
