import mongoose, { Schema } from "mongoose";
import { UserType, Post } from "../projectTypes";

const isProduction = process.env.NODE_ENV === "production";

const db = isProduction ? "iqardb" : "iqardb3";

mongoose.connect("mongodb://localhost:27017/" + db);

const countSchema = new Schema({
  name: String,
  count: { type: Number, default: 0 },
});
export const DBCount =
  mongoose.models.DBCount || mongoose.model("DBCount", countSchema);

const userSchema = new Schema<UserType>({
  username: String,
  password: String,
  role: String,
  departement: String,
  region: String,
  tel: String,
  code: String,
  count: Number,
  hash: String,
  salt: String,
  id: String,
  createdAt: Number,
});

export const DBUser =
  mongoose.models.DBUser || mongoose.model("DBUser", userSchema);

const postSchema = new Schema<Post>({
  type: String,
  departement: String,
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
  count: Number,
  createdAt: Date,
  user: String,
});

export const DBPost =
  mongoose.models.DBPost || mongoose.model("DBPost", postSchema);

const userCodesSchema = new Schema({
  code: Number,
  used: Number,
});

export const DBUserCode =
  mongoose.models.DBUserCode || mongoose.model("DBUserCode", userCodesSchema);

const adminCodesSchema = new Schema({
  code: Number,
  used: Number,
});

export const DBAdminCode =
  mongoose.models.DBAdminCode ||
  mongoose.model("DBAdminCode", adminCodesSchema);
