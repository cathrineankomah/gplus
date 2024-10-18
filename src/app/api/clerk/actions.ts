import { db } from "@/server/db";
import { usersTable, activitiesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

interface CreateUserParams {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export async function createUser({
  id,
  email,
  firstName,
  lastName,
}: CreateUserParams) {
  if (!id || !email) {
    throw new Error("User id and email are required");
  }
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    5
  );
  const [newUser] = await db
    .insert(usersTable)
    .values({
      id,
      email,
      name: `${firstName} ${lastName}`.trim(),
      referralCode: nanoid(),
    })
    .onConflictDoUpdate({
      target: usersTable.id,
      set: {
        email,
        name: `${firstName} ${lastName}`.trim(),
      },
    })
    .returning();

  await db.insert(activitiesTable).values({
    userId: newUser.id,
    type: "user_created",
    message: `User ${newUser.name} created`,
  });
}

export async function updateUser({
  id,
  email,
  firstName,
  lastName,
}: CreateUserParams) {
  if (!id) {
    throw new Error("User id is required for update");
  }

  const [updatedUser] = await db
    .update(usersTable)
    .set({
      email,
      name: `${firstName} ${lastName}`.trim(),
    })
    .where(eq(usersTable.id, id))
    .returning();

  await db.insert(activitiesTable).values({
    userId: updatedUser.id,
    type: "user_updated",
    message: `User ${updatedUser.name} updated`,
  });
}

export async function deleteUser({ id }: { id: string }) {
  const [deletedUser] = await db
    .update(usersTable)
    .set({ isDeleted: true })
    .where(eq(usersTable.id, id))
    .returning();

  if (!deletedUser) {
    return;
  }

  await db.insert(activitiesTable).values({
    userId: deletedUser.id,
    type: "user_updated",
    message: `User ${deletedUser.name} deleted`,
  });
}
