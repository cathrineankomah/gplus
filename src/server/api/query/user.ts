"use server";

import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema";

export async function getUsers() {
  const response = await db.select().from(usersTable);
  return response;
}
