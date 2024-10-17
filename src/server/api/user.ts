"use server";

import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

function validateUser() {
  const userId = auth().userId;
  if (!userId) {
    throw new Error("User not found");
  }
  return userId;
}

export async function getUser() {
  const userId = validateUser();
  const response = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  return response;
}
