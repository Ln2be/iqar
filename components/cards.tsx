import React from "react";
import {
  Box,
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import NumberFormat from "react-number-format";
import { useUser } from "../lib/auth/hooks";
import {
  correctPhone,
  adtypes,
  departements,
  subtypes,
  translate,
  basepath,
  correctPrice,
  whichSubtype,
} from "../lib/myfunctions";
import { Post, UserType } from "../projectTypes";
import WhatsappButton, { WhatsappShare } from "./whatsapp";
import ShareIcon from "@mui/icons-material/Share";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import Switch from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dynamic from "next/dynamic";
import { PickMap } from "../components/map";

// const PickMap = dynamic(() => import("../components/map"), {
//   ssr: false,
// });
// the post card. How the post is showed
export function PostCard({
  post,
  type = "feed",
  comparaison,
}: {
  post: Post;
  type: string;
  comparaison?: { tel: string; url: string; remove: (id: string) => void };
}) {
  const user = useUser();
  const router = useRouter();

  const image = post.images[0];

  // send the post to a user
  const codeTelObject = {
    codeTel: "0",
  };

  // track
  const track = {
    postid: "",
    postLink: "",
    trackDate: Date.now(),
    trackDelay: 0,
  };

  //
  let trackDelay = 0;

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#ccc" }}>
      <CardContent>
        {/* 
        
        

        The type of post and the departement(s)


        
        */}

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
              {translate(post.subtype, subtypes[whichSubtype(post.type)])}
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

        {/* 
        
        
        The description

        
        */}

        <Typography gutterBottom variant="h6" color="text.secondary">
          {post.details}
        </Typography>

        {/* 
        
        
        The price,  time and whatsapp
        
        
        */}

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

            {post.createdAt && (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {new Date(post.createdAt).toLocaleDateString("ar-MA")}
              </Box>
            )}
          </Box>
          {/* 
          
          Whatsapp may change according to user 


          */}
          {user?.role == "admin" && type == "compared" && comparaison ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <WhatsappButton
                  phone={comparaison.tel}
                  message={comparaison.url}
                >
                  <Button
                    onClick={() => {
                      post._id && comparaison.remove(post._id);
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
            </Box>
          ) : user?.role == "admin" ||
            (user && post.sendTo.includes(user.tel)) ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <WhatsappButton
                  phone={correctPhone(post.tel)}
                  message={basepath + "/posts?id=" + post._id}
                >
                  <Button variant="contained">واتساب</Button>
                </WhatsappButton>

                <Typography variant="body1" color="text.secondary">
                  {post.tel}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <WhatsappButton
                phone={correctPhone("48692007")}
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
        {/* 
        
        
        Admin control. Some controls are showed in feed and others in post.
        
        
        */}
        {user?.role == "admin" && (
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
                (type == "feed" ? (
                  <Link href={"/compare?id=" + post._id}>
                    <Button variant="outlined" style={{ color: "blue" }}>
                      مقارنة
                    </Button>
                  </Link>
                ) : (
                  type == "comparing" && (
                    <Button
                      variant="outlined"
                      style={{ color: "blue" }}
                      onClick={() => {
                        fetch(
                          "/api/compared?action=finished&id=" + post._id
                        ).then(() => {
                          router.back();
                        });
                      }}
                    >
                      انهاء المقارنة
                    </Button>
                  )
                ))}

              {/* delete post only the post view */}
              {type == "post" && user.tel == "22118721" ? (
                <Button
                  variant="outlined"
                  style={{ color: "red" }}
                  onClick={() => {
                    fetch("/api/posts?action=delete&id=" + post._id).then(
                      () => {
                        router.reload();
                      }
                    );
                  }}
                >
                  حذف نهائيا
                </Button>
              ) : (
                type == "feed" && (
                  <Link href={"/posts?id=" + post._id}>
                    <Button variant="outlined" style={{ color: "blue" }}>
                      التحكم
                    </Button>
                  </Link>
                )
              )}
              {post.hidden && (
                <Button
                  onClick={() => {
                    fetch("/api/posts?action=show&id=" + post._id).then(() => {
                      router.reload();
                    });
                  }}
                  variant="outlined"
                  style={{ color: "blue" }}
                >
                  اظهار
                </Button>
              )}
              {type == "post" && (
                <Link href={"/posts?action=update&id=" + post._id}>
                  <Button variant="outlined" style={{ color: "blue" }}>
                    تعديل
                  </Button>
                </Link>
              )}
            </Box>

            {user?.role == "admin" && type == "compared" && (
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
            {/* 
          
          
          track and show the post as a chance
          
          
          
          */}

            {type == "post" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                {/* In this place we can show that this post is tracked */}

                {/* In this place we can show that this post is a chance */}
              </Box>
            )}

            {/* 
          
          
          send the post to a representant
          
          
          */}

            {/* {type == "post" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
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
                        "&id=" +
                        post._id
                    ).then(() => {
                      router.reload();
                    });
                  }}
                >
                  احالة
                </Button>
              </Box>
            )} */}

            {type == "post" && (!post.track || !post.track.postLink) && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "end",
                  mt: 2,
                }}
              >
                <TextField
                  id="codeTel"
                  label="الهاتف"
                  type="tel"
                  style={{
                    backgroundColor: "white",
                  }}
                  variant="outlined"
                  onChange={(event) => {
                    track.postLink = event.target.value;
                  }}
                  required
                />
                <TextField
                  id="codeTel"
                  label="المهلة"
                  type="number"
                  style={{
                    backgroundColor: "white",
                  }}
                  variant="outlined"
                  onChange={(event) => {
                    track.trackDelay = event.target.value as unknown as number;
                  }}
                  required
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (post._id) {
                      track.postid = post._id;
                    }
                    fetch("/api/posts?action=savetrack", {
                      method: "POST",
                      body: JSON.stringify(track),
                      headers: {
                        "content-type": "application/json",
                      },
                    }).then(() => {
                      router.reload();
                    });
                  }}
                >
                  متابعة
                </Button>
              </Box>
            )}
            {type == "post" && post.track && post.track.postLink && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "end",
                  mt: 2,
                }}
              >
                <TextField
                  id="codeTel"
                  label="المهلة"
                  type="number"
                  style={{
                    backgroundColor: "white",
                  }}
                  variant="outlined"
                  onChange={(event) => {
                    trackDelay = event.target.value as unknown as number;
                  }}
                  required
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    fetch(
                      "/api/posts?action=updatetrack&trackDelay=" +
                        trackDelay +
                        "&trackDate=" +
                        Date.now() +
                        "&postid=" +
                        post._id
                    ).then(() => {
                      router.reload();
                    });
                  }}
                >
                  تمديد
                </Button>
              </Box>
            )}

            {type == "post" && post.track && post.track.postLink && (
              <Box>
                <Link href={"/posts?action=posts&tel=" + post.track.postLink}>
                  {post.track.postLink}
                </Link>
                <Button
                  variant="outlined"
                  onClick={() => {
                    fetch(
                      "/api/posts?action=deletetrack&postid=" + post._id
                    ).then(() => {
                      router.reload();
                    });
                  }}
                >
                  الغاء المتابغة
                </Button>
              </Box>
            )}

            {/* {post.sendTo &&
              post.sendTo.length > 0 &&
              (type == "post" || type == "feed") && (
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
                        {router.query.action == "archived" ? (
                          <Button
                            variant="outlined"
                            onClick={() => {
                              fetch(
                                "/api/posts?action=restoreSend&id=" +
                                  post._id +
                                  "&tel=" +
                                  tel
                              ).then(() => {
                                router.reload();
                              });
                            }}
                          >
                            استعادة
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={() => {
                              fetch(
                                "/api/posts?action=takeback&id=" +
                                  post._id +
                                  "&tel=" +
                                  tel
                              ).then(() => {
                                router.reload();
                              });
                            }}
                          >
                            سحب
                          </Button>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )} */}

            {type == "post" && (
              <Box>
                <Link href={"/posts?action=posts&tel=" + post.tel}>
                  منشورات الرقم
                </Link>

                {/* resources for this post from facebook */}
                {post.facelink && (
                  <a href={post.facelink} target="_blank" rel="noreferrer">
                    صور
                  </a>
                )}
              </Box>
            )}
          </Box>
        )}
      </CardContent>
      {/* 
      
      share the post
      
      */}
      <CardActions>
        {
          <WhatsappShare message={basepath + "/posts?id=" + post._id}>
            <Box
              sx={{
                color: "blue",
                fontSize: "small",
                pt: 2,
              }}
            >
              <ShareIcon></ShareIcon>
            </Box>
          </WhatsappShare>
        }
      </CardActions>
    </Card>
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
  // createdAt: Date.now(),
  hidden: false,
  sendTo: [],
  sendToArchive: [],
  facelink: "",
  periority: 1,
  position: [18.0782, -15.965],
};

// let pathFiles = [];
export function PostForm({ upost = post }: { upost?: Post }) {
  if (upost._id) {
    post = upost;
  }
  const user = useUser();

  const router = useRouter();
  // the type is important and many other fields depend on this type, so we will update according to t
  // this value
  const [type, setType] = useState(upost.type);
  const [disable, setDisable] = useState(false);

  // check if it is an update
  const isUpdate = upost._id ? true : false;

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
    formState: { errors },
  } = useForm();

  // sign up the user and save the post to the database
  async function handleSubmitThePost() {
    // I think this make the submission get stuck
    setDisable(true);
    const result = post;

    if (user?.role != "admin") {
      post.periority = 0;
    }

    // save the post
    if (!isUpdate) {
      fetch("/api/posts?action=save", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "content-type": "application/json",
        },
      }).then((data) => {
        data.json().then((rpost) => {
          router.push("/posts?id=" + rpost.id);
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
          router.push("/posts?id=" + rpost.id);
        });
      });
    }
  }

  function handlePosition(position: [number, number]) {
    post.position = position;
  }

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
              {subtypes[whichSubtype(type)].map((option, i) => (
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

        {user?.role == "admin" && (
          <PickMap
            handlePosition={
              handlePosition
              //   (position) => {
              //   post.position = position;
              // }
            }
          ></PickMap>
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
        {user?.role == "admin" && (
          <TextField
            id="outlined-basic"
            label="الاولوية"
            type="number"
            variant="outlined"
            onChange={(event) => {
              const prio = event.target.value as unknown as number;
              post.periority = prio;
              // post.price = iprice;
            }}
          />
        )}

        {user && user.role == "admin" && (
          <Box>
            <FormControlLabel
              label="اخفاء"
              control={
                <Switch
                  onChange={(event) => {
                    post.hidden = event.target.value as unknown as boolean;
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
export function SearchForm() {
  const router = useRouter();

  // const [depcheck, setdepcheck] = useState(inicheckD);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
        }}
      >
        <Button variant="contained" onClick={submit}>
          بحث
        </Button>
      </Box>
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
      data.json().then(() => {
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

  const signin = user._id + "iqar" + user.tel + "iqar" + user.password;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* for all type demanding UserCard */}
      {type != "board" && (
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
              {translate(
                user.departements && user.departements[0],
                departements
              )}
            </Box>
            <Box>{user.region}</Box>
          </Box>
        </Box>
      )}

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
                fetch("/api/deleteuser?id=" + user._id).then(() => {
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
                router.push("/reps?id=" + user._id);
              }}
              variant="outlined"
            >
              حذف
            </Button>
          )}

          {sendLink(user.lastNotified) && (
            <WhatsappButton
              phone={correctPhone(user.tel ? user.tel : "no phone")}
              message={basepath + "/posts?notifyuser=" + signin}
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
                      "&id=" +
                      user._id
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
                fetch("/api/usertrust?action=incrtrust&id=" + user._id).then(
                  () => {
                    router.reload();
                  }
                );
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
                fetch("/api/usertrust?action=decrtrust&id=" + user._id).then(
                  () => {
                    router.reload();
                  }
                );
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
                fetch("/api/usertrust?action=incractivity&id=" + user._id).then(
                  () => {
                    router.reload();
                  }
                );
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
                fetch("/api/usertrust?action=decractivity&id=" + user._id).then(
                  () => {
                    router.reload();
                  }
                );
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
              router.push(basepath + "posts?notifyuser=" + user._id);
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
              "اريد الغاء الاشتراك" + "\n" + basepath + "/reps?id=" + user._id
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

export function Tabpanel({
  value,
  index,
  children,
}: {
  value: number;
  index: number;
  children: JSX.Element;
}) {
  return <Box> {value == index && <Box>{children}</Box>}</Box>;
}

export function Tab({
  value,
  index,
  name,
  handleChange,
}: {
  value: number;
  index: number;
  name: string;
  handleChange: (hi: number) => void;
}) {
  return (
    <Box>
      <Button
        style={{
          color: value == index ? "blue" : "GrayText",
          borderBottom: value == index ? "3px solid blue" : "none",
        }}
        onClick={() => {
          handleChange(index);
        }}
      >
        {name}
      </Button>
    </Box>
  );
}
