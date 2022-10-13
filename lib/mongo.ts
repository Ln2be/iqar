import mongoose, { Schema } from "mongoose";
import { UserType, Post } from "../projectTypes";

const isProduction = process.env.NODE_ENV === "production";

const db = isProduction ? "iqardb" : "iqardb";

mongoose.connect("mongodb://localhost:27017/" + db);

const userSchema = new Schema<UserType>({
  username: String,
  password: String,
  role: String,
  departement: String,
  departements: [String],
  region: String,
  tel: String,
  code: String,
  hash: String,
  salt: String,
  id: String,
  createdAt: Number,
  trust: { type: Number, default: 1 },
  activity: { type: Number, default: 1 },
  lastNotified: Number,
});

export const DBUser =
  mongoose.models.DBUser || mongoose.model("DBUser", userSchema);

const postSchema = new Schema<Post>({
  type: String,
  subtype: String,
  departement: String,
  departements: [String],
  region: String,
  details: String,
  images: [
    {
      data: String,
      width: Number,
      height: Number,
    },
  ],
  price: Number,
  tel: String,
  id: String,
  createdAt: { type: Date, default: Date.now() },
  user: String,
  userTel: String,
  comparedTo: [String],
  hidden: { type: Boolean, default: false },
  archived: Boolean,
  sendTo: [String],
  facelink: String,
  sendToArchive: [String],
  periority: { type: Number, default: 1 },
  position: [Number],
  track: {
    postid: String,
    postLink: String,
    trackDate: Number,
    trackDelay: Number,
  },
});

export const DBPost =
  mongoose.models.DBPost || mongoose.model("DBPost", postSchema);
