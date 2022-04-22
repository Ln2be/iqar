import div from "../components/layout";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import Layout from "../components/layout";
import { Box } from "@mui/system";
import Router from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../lib/auth/hooks";

export default function Page() {
  const user = useUser();

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

  const handleSubmit = function () {
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

  return (
    <Layout>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          p: { xs: 2, md: 4 },
          maxWidth: "400px",
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
              post.type = value;
              const bool =
                value == "selling" || value == "offerRent" ? true : false;
              setNeedPictures(bool);
            }}
          >
            <div>
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
            </div>
            <div>
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
            </div>
          </RadioGroup>
        </FormControl>

        <TextField
          id="outlined-select-currency"
          select
          label="المقاطعة"
          // value={currency}
          onChange={(event) => {
            post.departement = event.target.value;
          }}
          helperText="اختر المقاطعة"
        >
          {departements.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          label="المنطقة"
          variant="outlined"
          onChange={(event) => {
            post.region = event.target.value;
          }}
        />
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
          variant="outlined"
          onChange={(event) => {
            post.tel = event.target.value;
          }}
        />
        <TextField
          id="outlined-basic"
          label="السعر"
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
                imPromises = [];
                for (let i = 0; i < files.length; i++) {
                  let file = files.item(i);
                  const im = resizeFile(file);
                  imPromises.push(im);
                }
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
          <Button
            variant="contained"
            onClick={async () => {
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

                  var hwPromise = new Promise((resolve, reject) => {
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
                  handleSubmit();
                });
              });
            }}
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
