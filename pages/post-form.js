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

const post = {
  type: "",
  subtype: "",
  departement: "",
  departements: [],
  region: "",
  details: "",
  images: [],
  price: 0,
  tel: "",
  user: "",
  userTel: "",
  createdAt: Date.now(),
};

var pathFiles = [];

export default function Page() {
  const user = useUser();

  // console.log(post.departements);
  post.user = user?.username;
  post.userTel = user?.tel;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // initialize the departements checkboxes
  const inicheck = {
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

  const [imagesUrl, setImagesUrl] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [depcheck, setdepcheck] = useState(inicheck);

  // If is there two departements no needs for the region
  const [depa, setDepa] = useState([]);

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

  const [type, setType] = useState("");

  const handleSubmitToServer = function () {
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((d) => {
        Router.push("/post?id=" + d._id);
      });
    });
  };

  const handleSubmitThePost = async () => {
    setSpinner(true);
    // const im = await resizeFile(post.images[0]);

    // const imPromises = pathFiles.map((path) => resizeFile(path));

    const imPromises = pathFiles.map((path) => handleImageUpload(path));

    Promise.all(imPromises).then((values) => {
      var hwPromises = [];
      values.map((value) => {
        var image = {
          data: "",
          width: 0,
          height: 0,
        };
        image.data = value;

        var imageWH = new Image();
        imageWH.src = value;

        var hwPromise = new Promise((resolve) => {
          imageWH.onload = (event) => {
            image.width = event.target.width;
            image.height = event.target.height;

            resolve(image);
          };
        });
        hwPromises.push(hwPromise);
      });
      Promise.all(hwPromises).then((images) => {
        post.images = [];
        images.map((image) => {
          post.images.push(image);
        });
        handleSubmitToServer();
      });
    });
  };

  function handleChange(e) {
    const name = e.target.name;

    setdepcheck((prev) => {
      let prevdep = { ...prev };
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
    <>
      <Head>
        <title>{"ضع اعلانك "}</title>
        <meta
          name="description"
          content={"انشر اعلانك على موقع عقار نواكشوط"}
          key="desc"
        />
        <meta property="og:title" content={"ضع اعلانك"} />
        <meta
          property="og:description"
          content={"انشر اعلانك على موقع عقار نواكشوط"}
        />
        {/* <meta property="og:image" content={post.images[0]?.data} /> */}
      </Head>
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
            >
              <Button variant="outlined" component="label">
                صور
                <input
                  multiple
                  type="file"
                  onChange={(event) => {
                    const files = event.target.files;

                    // Only files are allowed
                    const nf = files.length < 3 ? files.length : 3;
                    pathFiles = [];

                    pathFiles = [...new Array(nf)].map((file, i) =>
                      files.item(i)
                    );

                    setImagesUrl(
                      [...new Array(nf)].map((file, i) => files.item(i))
                    );
                  }}
                  accept="image/*"
                  hidden
                />
              </Button>
            </Box>
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
                نشر
              </Button>
            </Box>
          </Box>
        )}
      </Layout>
    </>
  );
}

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600,
      600,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

async function handleImageUpload(imageFile) {
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    // const arrayBuffer = await compressedFile.arrayBuffer();
    // const image = Buffer.from(arrayBuffer).toString("base64");

    const image = blobToBase64(compressedFile);
    console.log(image);
    return image;
    // await uploadToServer(compressedFile); // write your own logic
  } catch (error) {
    console.log(error);
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
