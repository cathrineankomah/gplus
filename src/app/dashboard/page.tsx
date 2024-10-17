import { getUsers } from "@/server/api/query/user";
import React from "react";

// export const runtime = "edge";
export default async function DashboardPage() {
  const users = await getUsers();
  console.log(users);
  return <div>Dashboard</div>;
}
