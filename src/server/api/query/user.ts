"use server";

import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
export async function getUsers() {
  const response = await db.select().from(usersTable);
  return response;
}

export async function getUser(id: string) {
  const response = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  return response;
}
