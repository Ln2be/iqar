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
import { Chance, Post, Track, UserType } from "../projectTypes";
import WhatsappButton from "./whatsapp";
import ShareIcon from "@mui/icons-material/Share";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Router, useRouter } from "next/router";
import Switch from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// the post card. How the post is showed
export function PostCard({
  post,
  type = "feed",
  goto = {
    url: basepath + "/posts?count=" + post.count,
    tel: correctPhone(post.tel),
  },
  position = "notmain",
}: {
  post: Post;
  type: string;
  goto?: {
    url: string;
    tel: string;
    ido?: number;
    idc?: number;
  };
  position?: string;
}) {
  const user = useUser();
  const router = useRouter();

  const image = post.images[0];

  // send the post to a user
  const codeTelObject = {
    codeTel: "0",
  };
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
                    router.push("/posts?action=post&count=" + post.count);
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
                          "/api/compared?count=" +
                            goto.ido +
                            "&post=" +
                            goto.idc
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

                {goto.ido && goto.idc && (
                  <Button
                    style={{
                      marginTop: "8px",
                    }}
                    onClick={() => {
                      fetch(
                        "/api/compared?count=" + goto.ido + "&post=" + goto.idc
                      ).then(() => {
                        router.reload();
                      });
                    }}
                    variant="outlined"
                  >
                    غير مناسب
                  </Button>
                )}
              </Box>
            ) : (router.query.codeTel && user && user.role != "admin") ||
              (router.query.codeTel && !user) ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <WhatsappButton
                  phone={correctPhone(post.tel)}
                  message={basepath + "/posts?count=" + post.count}
                >
                  <Button variant="contained">واتساب</Button>
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
                  message={basepath + "/posts?count=" + post.count}
                >
                  <Button variant="contained">واتساب</Button>
                </WhatsappButton>
                <Typography variant="body1" color="text.secondary">
                  {48692007}
                </Typography>
              </Box>
            )}
            {}
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
                message={basepath + "/posts?count=" + post.count}
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
        {user &&
          user?.role == "guest" &&
          user.tel == post.tel &&
          type != "min" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link href={"/compare?count=" + post.count}>
                <Button
                  style={{
                    margin: "4px",
                    backgroundColor: "#ADD8E6",
                    color: "black",
                  }}
                  variant="contained"
                >
                  إجاد زبون
                </Button>
              </Link>
              <Link href={"/api/posts?action=delete&count=" + post.count}>
                <Button variant="outlined" style={{ color: "red" }}>
                  حذف
                </Button>
              </Link>
              <Link href={"/posts?action=posts&tel=" + post.tel}>
                <Button variant="outlined">منشوراتي</Button>
              </Link>
            </Box>
          )}
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
          <Link href={"/api/posts?action=delete&count=" + post.count}>
            <Button style={{ color: "red" }}>حذف</Button>
          </Link>
        )}

      {/* The special inviter able to edit and delete */}
      {(router.query.codeTel && user && user.role != "admin") ||
        (router.query.codeTel && !user && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              style={{ color: "red" }}
              onClick={() => {
                fetch("/api/posts?action=hide&count=" + post.count).then(() => {
                  router.reload();
                });
              }}
            >
              حذف
            </Button>
            <Link href={"/posts?action=update&count=" + post.count}>
              <Button variant="outlined" style={{ color: "blue" }}>
                تعديل
              </Button>
            </Link>
          </Box>
        ))}
      {user && user?.role == "admin" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          {position == "main" && (
            <Button
              variant="outlined"
              style={{ color: "blue" }}
              onClick={() => {
                fetch("/api/compared?action=finished&count=" + post.count).then(
                  () => {
                    router.back();
                  }
                );
              }}
            >
              انهاء المقارنة
            </Button>
          )}
        </Box>
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
            {!post.comparedTo?.includes("finished") &&
            !router.query.hidden &&
            position != "main" ? (
              <Link href={"/compare?count=" + post.count}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  مقارنة
                </Button>
              </Link>
            ) : (
              router.query.hidden && (
                <Link href={"/posts?count=" + post.count}>
                  <Button variant="outlined" style={{ color: "red" }}>
                    حذف
                  </Button>
                </Link>
              )
            )}

            {position == "main" && (
              <Button
                variant="outlined"
                style={{ color: "blue" }}
                onClick={() => {
                  fetch("/compare?action=finished&count=" + post.count).then(
                    () => {
                      router.back();
                    }
                  );
                }}
              >
                انهاء المقارنة
              </Button>
            )}

            {/* delete post only the post view */}
            {type == "post" && (
              <Button
                variant="outlined"
                style={{ color: "red" }}
                onClick={() => {
                  fetch("/api/posts?action=delete&count=" + post.count).then(
                    () => {
                      router.back();
                    }
                  );
                }}
              >
                حذف نهائيا
              </Button>
            )}

            {router.query.hidden && (
              <Button
                variant="outlined"
                style={{ color: "green" }}
                onClick={() => {
                  fetch("/api/posts?action=show&count=" + post.count).then(
                    () => {
                      router.reload();
                    }
                  );
                }}
              >
                اظهار
              </Button>
            )}
            {type != "post" && !router.query.hidden && (
              <Link href={"/posts?count=" + post.count}>
                <Button variant="outlined" style={{ color: "red" }}>
                  حذف
                </Button>
              </Link>
            )}

            <Link href={"/posts?action=update&count=" + post.count}>
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
            {post.trackcount ? (
              <Link href={"/tracks?action=track&count=" + post.trackcount}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  تحت المتابعة
                </Button>
              </Link>
            ) : (
              <Link href={"/tracks?action=form&postcount=" + post.count}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  متابعة
                </Button>
              </Link>
            )}
            {post.chancecount ? (
              <Link href={"/chances?action=chance&count=" + post.chancecount}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  تعتبر فرصة
                </Button>
              </Link>
            ) : (
              <Link href={"/chances?action=form&postcount=" + post.count}>
                <Button variant="outlined" style={{ color: "blue" }}>
                  فرصة
                </Button>
              </Link>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
              alignItems: "end",
              mt: 2,
            }}
          >
            <TextField
              id="codeTel"
              label="الهاتف"
              // type="tel"
              style={{
                backgroundColor: "white",
              }}
              variant="outlined"
              onChange={(event) => {
                codeTelObject.codeTel = event.target.value;
              }}
              required
            />
            <Button
              variant="outlined"
              onClick={() => {
                fetch(
                  "/api/sendto?action=sendTo&codeTel=" +
                    codeTelObject.codeTel +
                    "&count=" +
                    post.count
                ).then(() => {
                  router.reload();
                });
              }}
            >
              احالة
            </Button>
          </Box>
        </Box>
      )}

      {post.sendTo && (
        <Box>
          {post.sendTo.length > 0 && user && user.role == "admin" && (
            <Box>
              <Box>تمت احالة المنشور الى</Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 1,
                }}
              >
                {post.sendTo.map((tel, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mt: 0.5,
                    }}
                    key={index}
                  >
                    <Link href={"/posts?action=posts&codeTel=" + tel}>
                      <Box>{tel}</Box>
                    </Link>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        fetch(
                          "/api/posts?action=archiveSend&count=" +
                            post.count +
                            "&tel=" +
                            tel
                        ).then(() => {
                          router.reload();
                        });
                      }}
                    >
                      ارشفة
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* resources for this post from facebook */}
      {post.facelink && user && user.role == "admin" && (
        <a href={post.facelink} target="_blank" rel="noreferrer">
          صور
        </a>
      )}

      <CardActions>
        {
          <WhatsappShareButton url={basepath + "/posts?count=" + post.count}>
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
          <Link href={"/api/tracks?action=restore&count=" + track.count}>
            <Button variant="outlined" style={{ color: "red" }}>
              استعادة
            </Button>
          </Link>
          <Link href={"/api/tracks?action=delete&count=" + track.count}>
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
          <Link href={"/tracks?action=update&count=" + track.count}>
            <Button variant="outlined" style={{ color: "blue" }}>
              تحديث
            </Button>
          </Link>
          <Link href={"/api/tracks?action=archive&count=" + track.count}>
            <Button variant="outlined" style={{ color: "red" }}>
              ارشفة
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

// new tracked post
const track = {
  text: "",
  postcount: "",
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
  count: 0,
  userTel: "",
  createdAt: new Date(Date.now()),
  hidden: false,
  sendTo: [],
  sendToArchive: [],
  facelink: "",
};

// let pathFiles = [];

export function PostForm({ upost = post }: { upost?: Post }) {
  if (upost.count) {
    post = upost;
  }
  const user = useUser();
  const router = useRouter();
  // the type is important and many other fields depend on this type, so we will update according to t
  // this value
  const [type, setType] = useState(upost.type);

  // check if it is an update
  const isUpdate = upost.count ? true : false;

  // also know the departements checked, they also important for the checkboxes

  // the checked departements
  const [depcheck, setdepcheck] = useState(upost.departements);
  const [forceRen, setF] = useState(false);

  // get the departements
  function getDeparts(deps: string[]) {
    post.departements = deps;
    setdepcheck(deps);
    setF(!forceRen);
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // sign up the user and save the post to the database
  async function handleSubmitThePost() {
    setDisable(true);
    const result = post;

    if (!isUpdate) {
      // if not a user sign him
      if (!user) {
        const userbody = {
          username: result.tel,
          password: "1212",
          tel: result.tel,
          role: "guest",
        };
        const signup = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify(userbody),
          headers: {
            "Content-Type": "application/json",
          },
        });

        //

        const userlogin = {
          username: result.tel,
          password: "1212",
        };

        const login = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(userlogin),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // save the post
      fetch("/api/posts?action=save", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "content-type": "application/json",
        },
      }).then((data) => {
        data.json().then((rpost) => {
          router.push("/posts?count=" + rpost.count);
        });
      });
    } else {
      fetch("/api/posts?action=update", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "content-type": "application/json",
        },
      }).then((data) => {
        data.json().then((rpost) => {
          router.push("/posts?count=" + rpost.count);
        });
      });
    }
  }

  const [disable, setDisable] = useState(false);

  return (
    <form>
      <Box
        // component={"form"}
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
            // post.departements = [];
            setType(event.target.value);
            setdepcheck([]);
          }}
          value={type}
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
          <Departs
            onDeparts={getDeparts}
            iniDeparts={upost.departements}
          ></Departs>
          // <Box
          //   sx={{
          //     display: "grid",
          //     gridTemplateColumns: "repeat(3, 1fr)",
          //     gap: { xs: 1, md: 2 },
          //     maxWidth: "500px",
          //   }}
          // >
          //   {departements.map((departement, i) => {
          //     return (
          //       <FormControlLabel
          //         key={i}
          //         control={
          //           <Checkbox
          //             value={depcheck.includes(departement.value)}
          //             onChange={handleChange}
          //             name={departement.value}
          //           />
          //         }
          //         label={departement.label}
          //       />
          //     );
          //   })}
          // </Box>
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

        {depcheck.length < 2 && (
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
        {/* <small
        style={{
          color: "red",
        }}
      >
        {messagen}
      </small> */}
        {errors.tel && (
          <small
            style={{
              color: "red",
            }}
          >
            ادخل واتساب
          </small>
        )}
        {post.type && (
          <TextField
            id="outlined-basic"
            label="السعر"
            type="number"
            {...register("price", { required: true, min: 1 })}
            defaultValue={upost.price}
            variant="outlined"
            onChange={(event) => {
              const iprice = event.target.value as unknown as number;
              post.price = correctPrice(iprice, post.type);
              // post.price = iprice;
            }}
          />
        )}

        {errors.price && (
          <small
            style={{
              color: "red",
            }}
          >
            ادخل السعر بالالاف و بالعملة القديمة
          </small>
        )}

        {user && user.role == "admin" && (
          <Box>
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
            <TextField
              id="outlined-basic"
              label="صور"
              defaultValue={upost.facelink}
              variant="outlined"
              onChange={(event) => {
                post.facelink = event.target.value;
              }}
            />
          </Box>
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
    </form>
  );
}

let depvalues: string[] = [];

export function Departement() {
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
        display: "flex",
        flexDirection: "column",
        mb: 4,
        maxWidth: "400px",
      }}
    >
      <Departs
        onDeparts={(deps) => {
          depvalues = deps;
        }}
        iniDeparts={[]}
      ></Departs>
      <Box>
        <Button variant="contained" onClick={submit}>
          بحث
        </Button>
      </Box>
    </Box>

    //   <Box
    //     sx={{
    //       display: "flex",
    //     }}
    //   >
    //     <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
    //       <FormLabel component="legend">اختر المقاطعات</FormLabel>
    //       <FormGroup>
    //         <Box>
    //           {departements.slice(0, 3).map((departement, i) => {
    //             return (
    //               <FormControlLabel
    //                 key={i}
    //                 control={
    //                   <Checkbox
    //                     checked={depcheck[departement.value]}
    //                     onChange={handleChange}
    //                     name={departement.value}
    //                   />
    //                 }
    //                 label={departement.label}
    //               />
    //             );
    //           })}
    //         </Box>
    //         <Box>
    //           {departements.slice(3, 6).map((departement, i) => {
    //             return (
    //               <FormControlLabel
    //                 key={i}
    //                 control={
    //                   <Checkbox
    //                     checked={depcheck[departement.value]}
    //                     onChange={handleChange}
    //                     name={departement.value}
    //                   />
    //                 }
    //                 label={departement.label}
    //               />
    //             );
    //           })}
    //         </Box>
    //         <Box>
    //           {departements.slice(6, 9).map((departement, i) => {
    //             return (
    //               <FormControlLabel
    //                 key={i}
    //                 control={
    //                   <Checkbox
    //                     checked={depcheck[departement.value]}
    //                     onChange={handleChange}
    //                     name={departement.value}
    //                   />
    //                 }
    //                 label={departement.label}
    //               />
    //             );
    //           })}
    //         </Box>
    //       </FormGroup>
    //       <FormHelperText>
    //         اختر بعض المقاطعات من اجل مزيد من التحديد
    //       </FormHelperText>
    //     </FormControl>
    //   </Box>
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
        <Link href={"/api/chances?action=delete&count=" + chance.count}>
          <Button variant="outlined" style={{ color: "red" }}>
            حذف
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

const chance = {
  postcount: "",
  text: "",
};
export function ChanceForm() {
  const router = useRouter();
  const postcount = router.query.postcount as unknown as string;
  chance.postcount = postcount;

  function handleSubmit() {
    fetch("api/chances?action=save", {
      method: "POST",
      body: JSON.stringify(chance),
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((rchance) => {
        router.push("/chances?action=chance&count=" + rchance.count);
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
        label="لماذا"
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

// User Model
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

  const [disable, setDisable] = useState(false);

  function handleChangeLogin(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    userlogin[name] = value;
  }

  function submitLogin() {
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
    if (errorMsg) setErrorMsg("");

    if (userbody.password !== userbody.rpassword) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    setDisable(true);
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
            <Button
              onClick={submitSignup}
              variant="contained"
              disabled={disable}
            >
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

// The user card
export function UserCard({
  user,
  type = "min",
  message = "السلام عليكم",
  actionlabel = "واتساب",
  handleSentTo = () => {
    console.log("empty");
  },
}: {
  user: UserType;
  type: string;
  message?: string;
  actionlabel?: string;
  handleSentTo?: () => void;
}) {
  const router = useRouter();
  const admin = useUser();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* for all type demanding UserCard */}
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
            alignItems: "center",
            // p: 2,
          }}
        >
          <Avatar sx={{ bgcolor: red[500], m: 1 }} aria-label="recipe">
            {user.username.charAt(0)}
          </Avatar>
          {user.username}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: 1,
          }}
        >
          <Box>
            {translate(user.departements && user.departements[0], departements)}
          </Box>
          <Box>{user.region}</Box>
        </Box>
      </Box>

      {/* handle delete  */}
      {type != "board" && admin && admin.role == "admin" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          {type == "rep" ? (
            <Button
              onClick={() => {
                fetch("/api/deleteuser?count=" + user.count).then(() => {
                  router.back();
                });
              }}
              variant="outlined"
            >
              حذف
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/reps?count=" + user.count);
              }}
              variant="outlined"
            >
              حذف
            </Button>
          )}

          {sendLink(user.lastNotified) && (
            <WhatsappButton
              phone={correctPhone(user.tel ? user.tel : "no phone")}
              message={basepath + "/posts?notifyuser=" + user.count}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  // handleSentTo()
                  const now = Date.now();
                  fetch(
                    "/api/usertrust?action=notification&now=" +
                      now +
                      "&count=" +
                      user.count
                  ).then(() => {
                    router.reload();
                  });
                }}
              >
                {"الرابط"}
              </Button>
            </WhatsappButton>
          )}

          <WhatsappButton
            phone={correctPhone(user.tel ? user.tel : "no phone")}
            message={message}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleSentTo();
              }}
            >
              {actionlabel}
            </Button>
          </WhatsappButton>
        </Box>
      )}

      {/* handle the trust */}
      {(type == "full" || type == "rep") && admin && admin.role == "admin" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                fetch(
                  "/api/usertrust?action=incrtrust&count=" + user.count
                ).then(() => {
                  router.reload();
                });
              }}
            >
              <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>{"الثقة"}</Box>
              <Box>{user.trust}</Box>
            </Box>
            <Button
              variant="outlined"
              onClick={() => {
                fetch(
                  "/api/usertrust?action=decrtrust&count=" + user.count
                ).then(() => {
                  router.reload();
                });
              }}
            >
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                fetch(
                  "/api/usertrust?action=incractivity&count=" + user.count
                ).then(() => {
                  router.reload();
                });
              }}
            >
              <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>{"الحيوية"}</Box>
              <Box>{user.activity}</Box>
            </Box>
            <Button
              variant="outlined"
              onClick={() => {
                fetch(
                  "/api/usertrust?action=decractivity&count=" + user.count
                ).then(() => {
                  router.reload();
                });
              }}
            >
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </Button>
          </Box>
        </Box>
      )}

      {/* handle the board for rep */}
      {type == "board" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Button
            variant={!router.query.notifyuser ? "outlined" : "contained"}
            onClick={() => {
              router.push(basepath + "posts?notifyuser=" + user.count);
            }}
          >
            {translate(user.departements[0], departements)}
          </Button>
          <Button
            variant={router.query.notifyuser ? "outlined" : "contained"}
            onClick={() => {
              router.push(basepath + "/posts?action=posts&codeTel=" + user.tel);
            }}
          >
            {"منشوراتي"}
          </Button>
          <WhatsappButton
            phone={"+22248692007"}
            message={
              "اريد الغاء الاشتراك" +
              "\n" +
              basepath +
              "/reps?count=" +
              user.count
            }
          >
            <Button variant="outlined" color="warning">
              {"الغاء الاشتراك"}
            </Button>
          </WhatsappButton>
        </Box>
      )}
    </Box>
  );
}

// The departements
export function Departs({
  onDeparts,
  iniDeparts = [],
}: {
  onDeparts: (departs: string[]) => void;
  iniDeparts: string[];
}) {
  const iniDepartsObject: { [key: string]: boolean } = {};
  iniDeparts.map((dep) => {
    iniDepartsObject[dep] = true;
  });
  const [depcheck, setdepcheck] = useState<{ [key: string]: boolean }>(
    iniDepartsObject
  );

  function handleChange(e: any) {
    const name = e.target.name as string;
    const checked = e.target.checked;

    if (checked) {
      const temp = depcheck;
      temp[name] = true;
      setdepcheck(temp);
    } else {
      const temp = depcheck;
      delete depcheck[name];
      setdepcheck(temp);
    }
    onDeparts(Object.keys(depcheck));
  }

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: { xs: 1, md: 2 },
          maxWidth: "500px",
        }}
      >
        {departements.map((departement, i) => {
          return (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  value={Object.keys(depcheck).includes(departement.value)}
                  onChange={handleChange}
                  name={departement.value}
                />
              }
              label={departement.label}
            />
          );
        })}
      </Box>
    </Box>
  );
}

// verifiy how long the rep has get a notification
function sendLink(lastnotified: number) {
  // throw new Error("Function not implemented.");

  if (lastnotified) {
    const now = Date.now();
    const hours = (now - lastnotified) / 3600000;

    const hoursFloored = Math.floor(hours);

    return hoursFloored > 48;
  } else {
    return true;
  }
}
