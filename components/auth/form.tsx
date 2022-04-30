import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Link from "next/link";
import { useForm } from "react-hook-form";

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

const Form = ({ isLogin, errorMessage, onSubmit }: formType) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={onSubmit}>
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
          <TextField name="tel" label="الهاتف"></TextField>
          <TextField name="password" label="الرقم السري"></TextField>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // alignItem: "right",
            }}
          >
            <Button type="submit" variant="contained">
              ارسال
            </Button>
            <Link href="/auth/signup?space=user">
              <a
                style={{
                  color: "blue",
                }}
              >
                ليس لدي حساب
              </a>
            </Link>
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
          <TextField name="password" label="الرقم السري"></TextField>
          <TextField name="rpassword" label="اعادة الرقم السري"></TextField>
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
          <TextField name="tel" label="الهاتف"></TextField>
          <Box
            sx={{
              alignItem: "right",
            }}
          >
            <Button type="submit" variant="contained">
              ارسال
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
