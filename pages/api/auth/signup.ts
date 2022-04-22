import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../../lib/auth/user";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await createUser(req.body);
    res.status(200).send({ done: true });
  } catch (error: any) {
    res.status(500).end(error.message);
  }
}
