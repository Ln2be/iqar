import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../../lib/auth/user";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const done = await createUser(req.body);

    done && res.status(200).send({ done: done });

    res.status(300).send({ done: done });
  } catch (error: any) {
    res.status(500).end(error.message);
  }
}
