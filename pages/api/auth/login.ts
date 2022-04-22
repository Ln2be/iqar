import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "../../../lib/auth/password-local";
import { serialize } from "cookie";
import { NextApiResponse } from "next";

export const MAX_AGE = 60 * 60 * 8; // 8 hours
const TOKEN_NAME = "iqarToken";

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async function (req, res: NextApiResponse) {
    try {
      const user = await new Promise<string>((resolve, reject) => {
        passport.authenticate("local", { session: false }, (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        })(req, res);
      });

      // const session = { ...JSON.parse(user) };

      const cookie = serialize(TOKEN_NAME, JSON.stringify(user), {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      res.setHeader("set-Cookie", cookie);

      res.status(200).send({ done: true });
    } catch (error) {
      console.error(error);
    }
  });
