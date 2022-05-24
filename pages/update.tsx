import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import Layout from "../components/layout";
import Router from "next/router";
import { useUser } from "../lib/auth/hooks";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import imageCompression from "browser-image-compression";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { Post, Image } from "../projectTypes";
import { DBPost } from "../lib/mongo";

let initialized = false;
let post: Post;

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

export default function Page({ postjson }: { postjson: string }) {
  const user = useUser();
  const postq = JSON.parse(postjson) as Post;

  // If is there two departements no needs for the region
  const [depa, setDepa] = useState<string[]>([]);
  const [depcheck, setdepcheck] = useState(inicheck);

  if (!initialized) {
    post = postq;
    initialized = true;
    setDepa(post.departements);
    post.departements.map((value) => {
      // setDepa
      setdepcheck((prev) => {
        const ob = {
          ...prev,
        };
        ob[value] = true;

        return ob;
      });
    });
  }
  // console.log(post.departements);
  post.user = user?.username;
  post.userTel = user?.tel;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [imagesUrl, setImagesUrl] = useState([]);
  const [spinner, setSpinner] = useState(false);

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

  const adtypes = [
    {
      value: "stay",
      label: "إقامة",
    },
    {
      value: "selling",
      label: "بيع",
    },
    {
      value: "buying",
      label: "شراء",
    },
    {
      value: "demandRent",
      label: "طلب ايجار",
    },
    {
      value: "offerRent",
      label: "عرض ايجار",
    },
  ];

  const subtypes = [
    {
      value: "land",
      label: "قطعة ارضية",
    },
    {
      value: "appartment",
      label: "شقق",
    },
    {
      value: "house",
      label: "منزل",
    },
    {
      value: "villa",
      label: "فيلا",
    },
    {
      value: "other",
      label: "اخرى",
    },
  ];

  const [type, setType] = useState(post.type);

  const handleSubmitToServer = function () {
    fetch("/api/updatepost?id=" + post._id, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((d) => {
        Router.push("/post?id=" + post._id);
      });
    });
  };

  const handleSubmitThePost = async () => {
    setSpinner(true);
    handleSubmitToServer();
  };

  function handleChange(e: any) {
    const name: string = e.target.name as string;

    setdepcheck((prev) => {
      const prevdep = { ...prev };
      prevdep[name] = !prevdep[name];
      return prevdep;
    });

    if (!e.target.checked) {
      const index = post.departements.indexOf(name);
      if (index > -1) {
        post.departements.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      post.departements.push(name);
    }
    console.log(post.departements);

    setDepa(post.departements);
  }

  // function show() {
  //   console.log(post.departements);
  // }
  return (
    <Layout>
      {spinner ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          component={"form"}
          sx={{
            display: "grid",
            gap: 2,
            p: { xs: 2, md: 4 },
            maxWidth: "400px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // flexDirection: "column",
              pb: 2,
            }}
          >
            انشر إعلان
          </Box>
          <TextField
            id="type"
            select
            label="نوع الاعلان"
            defaultValue={post.type}
            {...register("typev", { required: true })}
            // value={currency}
            onChange={(event) => {
              post.type = event.target.value;
              post.departements = [];
              setType(event.target.value);
              setdepcheck(inicheck);
            }}
          >
            {adtypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {errors.typev && (
            <small
              style={{
                color: "red",
              }}
            >
              ادخل الاعلان
            </small>
          )}

          {type != "stay" && (
            <>
              <TextField
                id="type"
                select
                label="اختيار فرعي"
                defaultValue={post.subtype}
                {...register("subtype", { required: true })}
                // value={currency}
                onChange={(event) => {
                  post.subtype = event.target.value;
                }}
              >
                {subtypes.map((option, i) => (
                  <MenuItem key={i} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {errors.subtype && (
                <small
                  style={{
                    color: "red",
                  }}
                >
                  ادخل الاختيار الفرعي
                </small>
              )}
            </>
          )}

          {(type == "buying" || type == "demandRent") && (
            <Box sx={{ display: "flex" }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
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
                <FormHelperText>Be careful</FormHelperText>
              </FormControl>
            </Box>
          )}

          {/* <button name="Tayaret" onClick={show}>
            show
          </button> */}

          {(type == "selling" || type == "offerRent" || type == "stay") && (
            <TextField
              id="outlined-select-currency"
              select
              label="المقاطعة"
              defaultValue={post.departements[0]}
              {...register("departement", { required: true })}
              onChange={(event) => {
                const value = event.target.value;
                post.departements = [];
                post.departements.push(value);
              }}
              helperText="اختر المقاطعة"
              required
            >
              {departements.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          {errors.departement && (
            <small
              style={{
                color: "red",
              }}
            >
              ادخل المقاطعة
            </small>
          )}

          {depa.length < 2 && (
            <TextField
              id="outlined-basic"
              label="المنطقة"
              defaultValue={post.region}
              {...register("region", { required: true })}
              variant="outlined"
              inputProps={{ maxLength: 12 }}
              onChange={(event) => {
                post.region = event.target.value;
              }}
              required
            />
          )}

          {errors.region && (
            <small
              style={{
                color: "red",
              }}
            >
              ادخل المنطقة
            </small>
          )}
          <TextField
            id="outlined-basic"
            multiline
            label="المواضقات"
            defaultValue={post.details}
            variant="outlined"
            onChange={(event) => {
              post.details = event.target.value;
            }}
            helperText="مساحة المنزل   الشارع  الخ"
          />
          <TextField
            id="outlined-basic"
            label="الهاتف"
            {...register("tel", { required: true })}
            type="tel"
            defaultValue={post.tel}
            variant="outlined"
            onChange={(event) => {
              post.tel = event.target.value;
            }}
            required
          />
          {errors.tel && (
            <small
              style={{
                color: "red",
              }}
            >
              ادخل الهاتف
            </small>
          )}

          <TextField
            id="outlined-basic"
            label="السعر"
            type="number"
            defaultValue={post.price}
            variant="outlined"
            onChange={(event) => {
              post.price = event.target.value;
            }}
          />

          <Box
            sx={{
              display:
                type == "stay" || type == "selling" || type == "offerRent"
                  ? "flex"
                  : "none",
              // alignItem: "right",
              flexDirection: "row",
            }}
          ></Box>
          <Box
            sx={{
              diplay: "flex",
              // alignItem: "right",
              flexDirection: "row-reverse",
            }}
          >
            <Box
              sx={{
                display: "flex",
                mb: 2,
                overflow: "scroll",
              }}
            >
              {imagesUrl.map((url, i) => (
                <img
                  style={{
                    width: "100%",
                    marginRight: "5px",
                  }}
                  key={i}
                  src={URL.createObjectURL(url)}
                ></img>
              ))}
            </Box>
            {/* This button needs to be viewed again */}
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(handleSubmitThePost)}
            >
              تعديل
            </Button>
          </Box>
        </Box>
      )}
    </Layout>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { [key: string]: string };
}) {
  const postObject = await DBPost.findOne({ _id: query.id });

  const postjson = JSON.stringify(postObject);

  return {
    props: {
      postjson,
    },
  };
}
