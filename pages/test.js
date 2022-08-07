import React from "react";
import { UserCard } from "../components/cards";

export default function Page() {
  return <UserCard user={user}></UserCard>;
}

const user = {
  username: "محمد",
  departement: "Arafat",
  trust: 1,
  region: "carafour",
};
