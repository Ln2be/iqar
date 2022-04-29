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
import NumberFormat from "react-number-format";
import { useForm } from "react-hook-form";

export default function Page() {
  const user = useUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [imagesUrl, setImagesUrl] = useState([]);

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

  var post = {
    type: "",
    departement: "",
    region: "",
    details: "",
    images: [],
    price: 0,
    tel: "",
    user: user?.username,
    userTel: user?.tel,
  };

  var imPromises = [];

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
    // const im = await resizeFile(post.images[0]);
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
          id="outlined-select-currency"
          select
          label="نوع الاعلان"
          {...register("type", { required: true })}
          // value={currency}
          onChange={(event) => {
            post.type = event.target.value;
            setNeedPictures(true);
          }}
          // helperText="اختر المقاطعة"
          required
        >
          {adtypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {errors.type && (
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
                imPromises = [];

                imPromises = [...new Array(nf)].map((file, i) =>
                  resizeFile(files.item(i))
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
            }}
          >
            {imagesUrl.map((url, i) => (
              <img key={i} src={URL.createObjectURL(url)}></img>
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
    </Layout>
  );
}

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
