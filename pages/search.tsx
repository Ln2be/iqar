import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Link from "next/link";

export default function Page() {
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

  const search = {
    type: "",
    departement: "",
  };
  return (
    <Box>
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
          <>
            <FormControlLabel value="buying" control={<Radio />} label="شراء" />
            <FormControlLabel value="selling" control={<Radio />} label="بيع" />
          </>
          <>
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
          </>
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
      <Link
        href={
          "/feeds?type=" + search.type + ";departement=" + search.departement
        }
      ></Link>
    </Box>
  );
}
