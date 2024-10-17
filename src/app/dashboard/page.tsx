import { getUser } from "@/server/api/query/user";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export const runtime = "edge";
export default async function DashboardPage() {
  const userId = auth().userId;
  const user = await getUser(userId + "");
  return <div>{JSON.stringify(user)}</div>;
}
