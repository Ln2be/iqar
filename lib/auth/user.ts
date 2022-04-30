import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { UserType } from "../../projectTypes";
import { DBAdminCode, DBCount, DBUser, DBUserCode } from "../mongo";

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

// const users = [];

export async function createUser(newUser: UserType) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(newUser.password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user: UserType = {
    id: uuidv4(),
    createdAt: Date.now(),
    ...newUser,
    hash,
    salt,
  };

  // This is an in memory store for users, there is no data persistence without a proper DB
  // users.push(user);

  // count the number of user
  const userCounter =
    (await DBCount.findOne({ name: "user" })) ||
    (await new DBCount({ name: "user" }).save());

  await DBCount.updateOne({ name: "user" }, { count: userCounter.count + 1 });
  // using the database now

  user.count = userCounter.count + 1;

  const codeCorrect =
    newUser.role == "user"
      ? await DBUserCode.findOne({ code: newUser.code })
      : await DBAdminCode.findOne({ code: newUser.code });

  if (codeCorrect) {
    const savedUser = await new DBUser(user).save();
    return true;
  } else {
    return false;
  }
}

// Here you should lookup for the user in your DB
export async function findUser({ tel }: { tel: string }) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  // return users.find((user) => user.username === username);

  // use the database
  return DBUser.findOne<UserType>({ tel: tel });
}

export async function getUser({ tel }: { tel: string }) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  // return users.find((user) => user.tel === tel);

  // use the database
  return DBUser.findOne({ tel: tel }).select(["username", "_id", "role"]);
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user: UserType, inputPassword: string) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  // const passwordsMatch = user.password === inputPassword;
  console.log(passwordsMatch);
  return passwordsMatch;
}
