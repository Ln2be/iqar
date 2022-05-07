import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import Layout from "../components/layout";
import { Box } from "@mui/system";
import Router from "next/router";
import { useUser } from "../lib/auth/hooks";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

var post = {
  type: "",
  departement: "",
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

  const [needPictures, setNeedPictures] = useState(false);

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

    const imPromises = pathFiles.map((path) => resizeFile(path));
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
          <TextField
            id="type"
            select
            label="نوع الاعلان"
            {...register("typev", { required: true })}
            // value={currency}
            onChange={(event) => {
              post.type = event.target.value;
              const bool = post.type == "selling" || post.type == "offerRent";
              setNeedPictures(bool);
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
          <TextField
            id="outlined-select-currency"
            select
            label="المقاطعة"
            {...register("departement", { required: true })}
            // value={currency}
            onChange={(event) => {
              post.departement = event.target.value;
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
          {errors.departement && (
            <small
              style={{
                color: "red",
              }}
            >
              ادخل المقاطعة
            </small>
          )}

          <TextField
            id="outlined-basic"
            label="المنطقة"
            {...register("region", { required: true })}
            variant="outlined"
            onChange={(event) => {
              post.region = event.target.value;
            }}
            required
          />
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
            type="number"
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
              display: needPictures ? "flex" : "none",
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
                  const nf = files.length < 5 ? files.length : 5;
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
              ارسال
            </Button>
          </Box>
        </Box>
      )}
    </Layout>
  );
}

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      700,
      700,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
