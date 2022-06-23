import React from "react";
import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import NumberFormat from "react-number-format";
import { WhatsappShareButton } from "react-share";
import { useUser } from "../lib/auth/hooks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  correctPhone,
  adtypes,
  departements,
  subtypes,
  translate,
  basepath,
  correctPrice,
} from "../lib/myfunctions";
import { Chance, Post, Track } from "../projectTypes";
import WhatsappButton from "./whatsapp";
import ShareIcon from "@mui/icons-material/Share";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Router, useRouter } from "next/router";
import Switch from "@mui/material/Switch";

// the post card. How the post is showed
export function PostCard({
  post,
  type = "feed",
  goto = {
    url: basepath + "/posts?id=" + post._id,
    tel: correctPhone(post.tel),
  },
}: {
  post: Post;
  type: string;
  goto?: {
    url: string;
    tel: string;
    ido?: string;
    idc?: string;
  };
}) {
  const user = useUser();
  const router = useRouter();

  const image = post.images[0];

  //
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#ccc" }}>
      {type != "full" && image && (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            // height="140"
            image={image?.data}
            alt="green iguana"
          />

          <Box
            sx={{
              position: "absolute",
              bottom: "4px",
              right: "4px",
            }}
          >
            {post.images?.length > 1 && (
              <Box
                sx={{
                  backgroundColor: (theme) => {
                    return theme.palette.primary.light;
                  },
                  color: "white",
                }}
              >
                <Button
                  onClick={() => {
                    router.push("/posts?action=post&id=" + post._id);
                  }}
                  size="small"
                  style={{
                    color: "white",
                  }}
                >
                  <ArrowBackIosIcon></ArrowBackIosIcon>
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <CardContent
        style={{
          backgroundColor: "#ccc",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">
              {translate(post.type, adtypes)}
            </Typography>
            <Typography gutterBottom variant="h5">
              {translate(post.subtype, subtypes)}
            </Typography>
          </Box>

          {post.departements.length == 1 && (
            <Box>
              <Typography gutterBottom variant="h5">
                {translate(post.departements[0], departements)}
              </Typography>
              <Typography gutterBottom variant="h5">
                {post.region}
              </Typography>
            </Box>
          )}
          {post.departements.length > 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {post.departements.map((departement, i) => (
                <Typography key={i} variant="h5">
                  {translate(departement, departements)}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
        <Typography gutterBottom variant="h6" color="text.secondary">
          {post.details}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="body1" color="text.secondary">
              {"السعر :"}
            </Typography>
            <NumberFormat value={post.price} thousandSeparator={true} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {user?.role == "admin" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <WhatsappButton phone={goto.tel} message={goto.url}>
                  <Button
                    onClick={() => {
                      if (goto.ido && goto.idc) {
                        fetch(
                          "/api/compared?id=" + goto.ido + "&post=" + goto.idc
                        ).then(() => {
                          router.reload();
                        });
                      }
                    }}
                    variant="contained"
                  >
                    واتساب
                  </Button>
                </WhatsappButton>
                <Typography variant="body1" color="text.secondary">
                  {post.tel}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <WhatsappButton
                  phone={"+22248692007"}
                  message={basepath + "/posts?id=" + post._id}
                >
                  <Button variant="contained">واتساب</Button>
                </WhatsappButton>
                <Typography variant="body1" color="text.secondary">
                  {48692007}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        {post.createdAt && (
          <Box
            sx={{
              display: "flex",
            }}
          >
            {new Date(post.createdAt).toLocaleDateString("ar-MA")}
          </Box>
        )}

        {/* the possiblity to contact the owner for more information while comparing */}
        <Box>
          {goto.idc && user?.role == "admin" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: 1,
              }}
            >
              <WhatsappButton
                phone={correctPhone(post.tel)}
                message={basepath + "/posts?id=" + post._id}
              >
                <Button variant="contained">استفسار</Button>
              </WhatsappButton>
              <Typography variant="body1" color="text.secondary">
                {post.tel}
              </Typography>
            </Box>
          )}
        </Box>

        {/* see all this phone posts */}
        {user?.role == "admin" && (
          <Link href={"/posts?action=posts&tel=" + post.tel}>
            منشورات الرقم
          </Link>
        )}

        {/* give the user the opportinuty to find customers */}
        {/* {(!user || user.role != "admin") && type != "min" && (
          <Link href={"/compare?id=" + post._id}>
            <Button
              style={{
                margin: "4px",
                backgroundColor: "#ADD8E6",
                color:"black"
              }}
              variant="contained"
            >
              إجاد زبون
            </Button>
          </Link>
        )} */}
      </CardContent>

      {/* if to show the full post */}
      {type == "full" &&
        post.images?.map((image, i) => (
          <Box
            key={i}
            sx={{
              display: "grid",
              gap: 2,
              maxWidth: "400px",
              pb: 2,
            }}
          >
            <CardMedia
              key={i}
              component="img"
              // height="140"
              image={image?.data}
              alt="green iguana"
            />
          </Box>
        ))}

      {/* make the user able to delete his posts. */}
      {type != "min" &&
        user &&
        user.role != "admin" &&
        user?.username == post.user && (
          <Link href={"/api/posts?action=delete&id=" + post._id}>
            <Button style={{ color: "red" }}>حذف</Button>
          </Link>
        )}

      {/* The admin control */}
      {type != "min" && user && user?.role == "admin" && (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            {/* only show comparison if the comparaison is not finished */}
            {!post.comparedTo?.includes("finished") && (
              <Link href={"/compare?id=" + post._id}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  مقارنة
                </Button>
              </Link>
            )}

            {type == "post" ? (
              <Link href={"/api/posts?action=delete&id=" + post._id}>
                <Button variant="outlined" style={{ color: "red" }}>
                  حذف
                </Button>
              </Link>
            ) : (
              <Link href={"/posts?id=" + post._id}>
                <Button variant="outlined" style={{ color: "red" }}>
                  حذف
                </Button>
              </Link>
            )}

            <Link href={"/posts?action=update&id=" + post._id}>
              <Button variant="outlined" style={{ color: "blue" }}>
                تعديل
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            {post.trackid ? (
              <Link href={"/tracks?action=track&id=" + post.trackid}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  تحت المتابعة
                </Button>
              </Link>
            ) : (
              <Link href={"/tracks?action=form&postid=" + post._id}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  متابعة
                </Button>
              </Link>
            )}
            {post.chanceid ? (
              <Link href={"/chances?action=chance&id=" + post.chanceid}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  تعتبر فرصة
                </Button>
              </Link>
            ) : (
              <Link href={"/chances?action=form&postid=" + post._id}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  فرصة
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      )}

      <CardActions>
        {
          <WhatsappShareButton url={basepath + "/posts?id=" + post._id}>
            <Box
              sx={{
                color: "blue",
                fontSize: "small",
                pt: 2,
              }}
            >
              <ShareIcon></ShareIcon>
            </Box>
          </WhatsappShareButton>
        }
      </CardActions>
    </Card>
  );
}

// the card for the track
export function TrackCard({ track }: { track: Track }) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
      }}
    >
      <Box>
        {track.updates
          .slice(0)
          .reverse()
          .map((update, i) => (
            <Box key={i}>
              <Box>{new Date(update.date).toLocaleString("ar-MA")}</Box>
              <Box>{update.text}</Box>
            </Box>
          ))}
      </Box>

      <Box>{track.text}</Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <WhatsappButton phone={correctPhone(track.tel1)} message={""}>
            <Button variant="contained">واتساب</Button>
          </WhatsappButton>
          <Typography variant="body1" color="text.secondary">
            {track.name1}
          </Typography>
        </Box>
        {track.tel2 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <WhatsappButton phone={correctPhone(track.tel1)} message={""}>
              <Button variant="contained">واتساب</Button>
            </WhatsappButton>
            <Typography variant="body1" color="text.secondary">
              {track.name2}
            </Typography>
          </Box>
        )}
      </Box>

      <PostCard post={track.post} type="min"></PostCard>

      {track.archived ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Link href={"/api/tracks?action=restore&id=" + track._id}>
            <Button variant="outlined" style={{ color: "red" }}>
              استعادة
            </Button>
          </Link>
          <Link href={"/api/tracks?action=delete&id=" + track._id}>
            <Button variant="outlined" style={{ color: "red" }}>
              حذف
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Link href={"/tracks?action=update&id=" + track._id}>
            <Button variant="outlined" style={{ color: "blue" }}>
              تحديث
            </Button>
          </Link>
          <Link href={"/api/tracks?action=archive&id=" + track._id}>
            <Button variant="outlined" style={{ color: "red" }}>
              ارشفة
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

// the track form

// new tracked post
const track = {
  text: "",
  postid: "",
  name1: "",
  tel1: "",
  name2: "",
  tel2: "",
};
// an update to a tracked post
const updatebody = {
  text: "",
  date: Date.now(),
};

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

// initialize the departements checkboxes
const inicheckD: { [key: string]: boolean } = {
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
export function TrackForm({
  onSubmit,
  update = false,
}: {
  onSubmit: any;
  update?: boolean;
}) {
  function handleSubmit() {
    if (update) {
      onSubmit(updatebody);
    } else {
      onSubmit(track);
    }
  }
  return (
    <Box>
      {!update && (
        <Box
          // component={"form"}
          sx={{
            display: "grid",
            gap: 2,
            p: { xs: 2, md: 4 },
            maxWidth: "400px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="النص"
            // type="tel"
            variant="outlined"
            onChange={(event) => {
              track.text = event.target.value;
            }}
            required
          />
          <TextField
            id="outlined-basic"
            label="الاسم"
            // type="tel"
            variant="outlined"
            onChange={(event) => {
              track.name1 = event.target.value;
            }}
            required
          />
          <TextField
            id="outlined-basic"
            label="واتساب "
            type="tel"
            variant="outlined"
            onChange={(event) => {
              track.tel1 = event.target.value;
            }}
            required
          />
          <TextField
            id="outlined-basic"
            label="الاسم"
            // type="tel"
            variant="outlined"
            onChange={(event) => {
              track.name2 = event.target.value;
            }}
          />
          <TextField
            id="outlined-basic"
            label="واتساب 2"
            type="tel"
            variant="outlined"
            onChange={(event) => {
              track.tel2 = event.target.value;
            }}
          />
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            اضافة
          </Button>
        </Box>
      )}
      {update && (
        <Box>
          <TextField
            id="outlined-basic"
            label="النص"
            // type="tel"
            variant="outlined"
            onChange={(event) => {
              updatebody.text = event.target.value;
            }}
          />
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            تحديث
          </Button>
        </Box>
      )}
    </Box>
  );
}

// The post form here.

let post: Post = {
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
  createdAt: new Date(Date.now()),
  hidden: false,
};

let pathFiles = [];

export function PostForm({
  upost = post,
  onSubmit,
  update = false,
}: {
  upost?: Post;
  onSubmit: any;
  update?: boolean;
}) {
  // update post is provided
  if (upost._id) {
    post = upost;
  }
  const user = useUser();
  // the type is important and many other fields depend on this type, so we will update according to t
  // this value
  const [type, setType] = useState(upost.type);

  // also know the departements checked, they also important for the checkboxes

  if (upost.departements.length > 0) {
    upost.departements.map((departement) => {
      inicheck[departement] = true;
    });
  }
  const [depcheck, setdepcheck] = useState(inicheck);

  // show thumbnails of the images being uplaoded
  const [imagesUrl, setImagesUrl] = useState<(File | null)[]>([]);

  // If is there two departements no needs for the region
  const [depa, setDepa] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // handle the change in fields
  function handleChange(e: any) {
    const name = e.target.name as string;

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

  // remind the user to enter a valid number

  const [messagen, setmn] = useState("");
  function handleSubmitThePost() {
    setDisable(true);
    // validate
    // const nvalidations = [
    //   {
    //     condition: post.tel.length != 8 && !user,
    //     message: "ادخل رقم واتساب صحيح",
    //   },
    //   {
    //     condition: post.price == "0" || post.price == "",
    //     message: "ادخل السعر بالالاف و بالعملة القديمة",
    //   },
    //   {
    //     condition: post.departements.length == 0,
    //     message: "اختر مقاطعات",
    //   },
    //   {
    //     condition: post.departements.length == 1 && post.region == "",
    //     message: "اختر المنطقة",
    //   },
    //   {
    //     condition: post.type == "",
    //     message: "اختر نوع الاعلان",
    //   },
    //   {
    //     condition: post.subtype == "",
    //     message: "ادخل اعلان فرعي ",
    //   },
    //   {
    //     condition: post.details == "",
    //     message: "ادخل تفاصيل ",
    //   },
    // ];

    // function validate() {
    //   return nvalidations.map((nvalidation) => {
    //     if (nvalidation.condition) {
    //       return nvalidation.message;
    //     }
    //   });
    // }

    // if (validate().length > 0) {
    //   setmn(validate().join(" \n  "));
    //   setDisable(false);
    // } else {
    //   onSubmit(post);
    // }

    if (post.tel.length != 8 && !user) {
      setmn("ادخل رقم هاتف صحيح");
    } else {
      onSubmit(post);
    }
  }

  // disable the submit button once clicked
  const [disable, setDisable] = useState(false);

  return (
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
        defaultValue={upost.type}
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
            defaultValue={upost.subtype}
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
            <FormHelperText>Be careful</FormHelperText>
          </FormControl>
        </Box>
      )}

      {(type == "selling" || type == "offerRent" || type == "stay") && (
        <TextField
          id="outlined-select-currency"
          select
          label="المقاطعة"
          defaultValue={upost.departements[0]}
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
          defaultValue={upost.region}
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
        defaultValue={upost.details}
        variant="outlined"
        onChange={(event) => {
          post.details = event.target.value;
        }}
        helperText="مساحة المنزل   الشارع  الخ"
      />
      <TextField
        id="outlined-basic"
        label="واتساب"
        defaultValue={upost.tel}
        {...register("tel", { required: true })}
        type="tel"
        variant="outlined"
        onChange={(event) => {
          post.tel = event.target.value;
        }}
        required
      />
      <small
        style={{
          color: "red",
        }}
      >
        {messagen}
      </small>
      {errors.tel && (
        <small
          style={{
            color: "red",
          }}
        >
          ادخل واتساب
        </small>
      )}

      <TextField
        id="outlined-basic"
        label="السعر"
        type="number"
        {...register("price", { required: true, min: 1 })}
        defaultValue={upost.price}
        variant="outlined"
        onChange={(event) => {
          const iprice = event.target.value as unknown as number;
          post.price = correctPrice(iprice);
        }}
      />
      {errors.price && (
        <small
          style={{
            color: "red",
          }}
        >
          ادخل السعر بالالاف و بالعملة القديمة
        </small>
      )}

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
              if (files) {
                const nf = files.length < 3 ? files.length : 3;
                pathFiles = [];

                pathFiles = [...new Array(nf)].map((file, i) => files.item(i));

                setImagesUrl(
                  [...new Array(nf)].map((file, i) => files.item(i))
                );
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
        <Box
          sx={{
            display: "flex",
            mb: 2,
            overflow: "scroll",
          }}
        >
          {imagesUrl.map(
            (url, i) =>
              url && (
                <img
                  style={{
                    width: "100%",
                    marginRight: "5px",
                  }}
                  key={i}
                  src={URL.createObjectURL(url)}
                ></img>
              )
          )}
        </Box>
      </Box>
      {user && user.role == "admin" && (
        <FormControlLabel
          label="اخفاء"
          control={
            <Switch
              onChange={() => {
                post.hidden = true;
              }}
            />
          }
        ></FormControlLabel>
      )}
      {/* This button needs to be viewed again */}
      {/* show the message of validation */}
      {/* <p>{messagen}</p> */}
      <Box>
        <Button
          type="submit"
          disabled={disable}
          variant="contained"
          onClick={handleSubmit(handleSubmitThePost)}
        >
          نشر
        </Button>
      </Box>
    </Box>
  );
}

const depvalues: any = [];

export default function Departement() {
  const router = useRouter();

  const [depcheck, setdepcheck] = useState(inicheckD);

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

    // onChangeDep(depvalues);
  }

  // submit the search query
  function submit() {
    const { type } = router.query;
    const depsjson = JSON.stringify(depvalues);
    if (type) {
      router.push(
        "/posts?action=posts&type=" + type + "&departements=" + depsjson
      );
    } else {
      router.push("/posts?action=posts&departements=" + depsjson);
    }
  }

  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
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
      <Button variant="contained" onClick={submit}>
        بحث
      </Button>
    </Box>
  );
}

// Cards for the Chance crud
export function ChanceCard({ chance }: { chance: Chance }) {
  return (
    <Box
      sx={{
        dispay: "flex",
        flexDirection: "column",
      }}
    >
      <Box>{chance.text}</Box>
      <PostCard post={chance.post} type="min"></PostCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Link href={"/api/chances?action=delete&id=" + chance._id}>
          <Button variant="outlined" style={{ color: "red" }}>
            حذف
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

const chance = {
  postid: "",
  text: "",
};
export function ChanceForm() {
  const router = useRouter();
  const postid = router.query.postid as unknown as string;
  chance.postid = postid;

  function handleSubmit() {
    fetch("api/chances?action=save", {
      method: "POST",
      body: JSON.stringify(chance),
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((rchance) => {
        router.push("/chances?action=chance&id=" + rchance._id);
      });
    });
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        id="outlined-basic"
        label="النص"
        // type="tel"
        variant="outlined"
        onChange={(event) => {
          chance.text = event.target.value;
        }}
      />
      <Button
        style={{
          marginTop: "16px",
        }}
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        اضافة
      </Button>
    </Box>
  );
}

const userbody: { [key: string]: string | string[] } = {
  username: "",
  departements: [],
  region: "",
  code: "",
  tel: "",
  password: "",
  rpassword: "",
  role: "",
};

const userlogin: { [key: string]: string } = {
  username: "",
  password: "",
};
// The user form
export function UserForm({
  isLogin = false,
  isAdmin = false,
}: {
  isLogin?: boolean;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const { role } = router.query;
  const [errorMsg, setErrorMsg] = useState("");

  function handleChangeLogin(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    userlogin[name] = value;
  }

  function submitLogin() {
    console.log(userlogin);

    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(userlogin),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      data.json().then((response) => {
        router.push("/");
      });
    });
  }
  function submitSignup() {
    console.log(userbody);
    if (errorMsg) setErrorMsg("");

    if (userbody.password !== userbody.rpassword) {
      setErrorMsg(`The passwords don't match`);
      return;
    }
    userbody.role = role ? role : "";
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userbody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      data.json().then((response) => {
        router.push("/sign?action=login&role=" + role);
      });
    });
  }
  //
  function handleChangeSignup(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "departements") {
      userbody.departements = [];
      userbody.departements.push(value);
    } else {
      userbody[name] = value;
    }
  }

  return (
    <Box>
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
          <TextField
            onChange={handleChangeLogin}
            name="username"
            label="واتساب"
          ></TextField>
          <TextField
            onChange={handleChangeLogin}
            name="password"
            label="كلمة المرور"
          ></TextField>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // alignItem: "right",
            }}
          >
            <Button onClick={submitLogin} variant="contained">
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
          <TextField
            onChange={handleChangeSignup}
            name="username"
            defaultValue={userbody.username}
            label="الاسم"
          ></TextField>
          <TextField
            onChange={handleChangeSignup}
            name="password"
            defaultValue={userbody.password}
            label="كلمة المرور"
          ></TextField>

          <TextField
            onChange={handleChangeSignup}
            defaultValue={userbody.rpassword}
            name="rpassword"
            label="اعادة كلمة المرور"
          ></TextField>

          {!isAdmin && (
            <Box>
              <TextField
                onChange={handleChangeSignup}
                defaultValue={userbody.departements[0]}
                id="outlined-select-currency"
                select
                label="المقاطعة"
                helperText="اختر المقاطعة"
                name="departements"
              >
                {departements.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                onChange={handleChangeSignup}
                defaultValue={userbody.region}
                name="region"
                label="المنطقة"
              ></TextField>
            </Box>
          )}

          <TextField
            onChange={handleChangeSignup}
            defaultValue={userbody.tel}
            name="tel"
            label="واتساب"
          ></TextField>
          <Box
            sx={{
              alignItem: "right",
            }}
          >
            <Button onClick={submitSignup} variant="contained">
              التسجيل
            </Button>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          color: "red",
        }}
      >
        {<p className="error">{errorMsg}</p>}
      </Box>
    </Box>
  );
}
