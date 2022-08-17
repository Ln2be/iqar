import mongoose, { Schema } from "mongoose";
import { UserType, Post, Track, Chance } from "../projectTypes";

const isProduction = process.env.NODE_ENV === "production";

const db = isProduction ? "iqardb" : "iqardb";

mongoose.connect("mongodb://localhost:27017/" + db);

const countSchema = new Schema({
  name: String,
  count: { type: Number, default: 0 },
});
export const DBCount =
  mongoose.models.DBCount || mongoose.model("DBCount", countSchema);

// a counter for the database
const counterSchema = new Schema({
  name: String,
  counter: { type: Number, default: 0 },
});

export const DBCounter =
  mongoose.models.DBCounter || mongoose.model("DBCounter", counterSchema);

const userSchema = new Schema<UserType>({
  username: String,
  password: String,
  role: String,
  departement: String,
  departements: [String],
  region: String,
  tel: String,
  code: String,
  count: Number,
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
  count: Number,
  createdAt: Date,
  user: String,
  userTel: String,
  comparedTo: [String],
  trackcount: String,
  chancecount: String,
  hidden: { type: Boolean, default: false },
  archived: Boolean,
  sendTo: [String],
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

const TracksSchema = new Schema<Track>({
  postcount: String,
  updates: [
    {
      date: Date,
      text: String,
    },
  ],
  text: String,
  name1: String,
  tel1: String,
  name2: String,
  tel2: String,
  archived: { type: Boolean, default: false },
  count: Number,
});

export const DBTrack =
  mongoose.models.DBTrack || mongoose.model("DBTrack", TracksSchema);

// a model for the chance crud
const ChancesSchema = new Schema<Chance>({
  count: Number,
  postcount: String,
  text: String,
});

export const DBChance =
  mongoose.models.DBChance || mongoose.model("DBChance", ChancesSchema);

export async function updateCounter(nameCol: string): Promise<number> {
  // add the counter
  const pCounter =
    (await DBCounter.findOne({ name: nameCol })) ||
    (await new DBCounter({ name: nameCol }).save());
  const counter = pCounter.counter + 1;

  await DBCounter.updateOne({ name: nameCol }, { counter: counter });
  return counter;
}
