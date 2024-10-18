"use server";

import { db } from "@/server/db";
import {
  taskCompletionsTable,
  usersTable,
  activitiesTable,
} from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createUser } from "@/app/api/clerk/actions";

async function getOrCreateUser() {
  try {
    const session = auth();
    if (!session.userId) {
      throw new Error("Not authenticated");
    }

    let user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.userId))
      .then((res) => res[0]);

    if (!user) {
      const clerkUser = await currentUser();
      if (!clerkUser) {
        throw new Error("User not found in Clerk");
      }
      await createUser({
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName ?? "",
        lastName: clerkUser.lastName ?? "",
      });
      user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, session.userId))
        .then((res) => res[0]);
    }

    return user;
  } catch (error) {
    console.error("Error in getOrCreateUser:", error);
    throw error;
  }
}

export async function getUser() {
  try {
    return await getOrCreateUser();
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
}

export async function getUserTasks() {
  try {
    const user = await getOrCreateUser();
    const response = await db
      .select()
      .from(taskCompletionsTable)
      .where(eq(taskCompletionsTable.userId, user.id));
    return response;
  } catch (error) {
    console.error("Error in getUserTasks:", error);
    throw error;
  }
}

export async function getUserActivities() {
  try {
    const user = await getOrCreateUser();
    const response = await db
      .select()
      .from(activitiesTable)
      .where(eq(activitiesTable.userId, user.id))
      .orderBy(desc(activitiesTable.createdAt))
      .limit(10);
    return response;
  } catch (error) {
    console.error("Error in getUserActivities:", error);
    throw error;
  }
}

export async function setReferrer(referralCode: string) {
  try {
    const user = await getOrCreateUser();
    const referredBy = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.referralCode, referralCode))
      .then((res) => res[0]);
    if (!referredBy) {
      throw new Error("Referrer not found");
    }
    const response = await db
      .update(usersTable)
      .set({ referredBy: referredBy.id })
      .where(eq(usersTable.id, user.id));
    return response;
  } catch (error) {
    console.error("Error in setReferrer:", error);
    throw error;
  }
}
