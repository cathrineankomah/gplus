import { getUsers } from "@/server/api/query/user";
import React from "react";

export const runtime = "edge";
export default async function DashboardPage() {
  const users = await getUsers();

  return <div>{JSON.stringify(users)}</div>;
}
