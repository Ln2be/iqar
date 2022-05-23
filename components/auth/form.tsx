import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

interface formType {
  isLogin: boolean;
  errorMessage: string;
  space: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const currencies = [
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

const post = {
  nature: "",
  text: "",
  departement: "",
  region: "",
  images: [],
};

const names = [
  "repName",
  "password",
  "rpassword",
  "departement",
  "region",
  "tel",
];

let validateMessage = "";
const Form = ({ isLogin, errorMessage, onSubmit }: formType) => {
  const [render, setRender] = useState(false);

  function validate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLogin) {
      onSubmit(e);
    } else {
      let validated = true;
      names.map((name) => {
        const value = e.currentTarget[name].value;
        if (!value) {
          validated = false;
        }
      });

      if (!validated) {
        validateMessage = "الرجاء ادخال جميع الحقول";
        setRender(true);
      }
      validated && onSubmit(e);
    }
  }
  return (
    <form onSubmit={validate}>
      {isLogin ? (
        <Box
          sx={{
            maxWidth: "400px",
            p: 2,
            display: "grid",
            gap: 2,
          }}
        >
          <Box
            sx={{
              fontSize: "25px",
            }}
          >
            الدخول
          </Box>
          <TextField name="tel" label="واتساب"></TextField>
          <TextField name="password" label="كلمة المرور"></TextField>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // alignItem: "right",
            }}
          >
            <Button type="submit" variant="contained">
              الدخول
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: "400px",
            p: 2,
            display: "grid",
            gap: 2,
          }}
        >
          <Box
            sx={{
              fontSize: "25px",
            }}
          >
            التسجيل
          </Box>
          <TextField name="repName" label="الاسم"></TextField>
          <TextField name="password" label="كلمة المرور"></TextField>
          <TextField name="rpassword" label="اعادة كلمة المرور"></TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="المقاطعة"
            helperText="اختر المقاطعة"
            name="departement"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField name="region" label="المنطقة"></TextField>
          <TextField name="tel" label="واتساب"></TextField>
          <Box
            sx={{
              alignItem: "right",
            }}
          >
            {validateMessage && (
              <p
                style={{
                  color: "red",
                }}
              >
                {validateMessage}
              </p>
            )}
            <Button type="submit" variant="contained">
              التسجيل
            </Button>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          color: (theme) => theme.palette.error,
        }}
      >
        {errorMessage && <p className="error">{errorMessage}</p>}
      </Box>
    </form>
  );
};

export default Form;
