import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const TOKEN_NAME = "iqarToken";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
  res.writeHead(302, { Location: "/" });
  res.end();
}
