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
    10
  );
  const [newUser] = await db
    .insert(usersTable)
    .values({
      id,
      email,
      name: `${firstName} ${lastName}`.trim(),
      referralCode: nanoid(),
    })
    .returning();

  await db.insert(activitiesTable).values({
    userId: newUser.id,
    type: "USER_CREATED",
    message: `User ${newUser.name} created`,
  });

  console.log("User created", newUser);
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
    type: "USER_UPDATED",
    message: `User ${updatedUser.name} updated`,
  });

  console.log("User updated", updatedUser);
}

export async function deleteUser({ id }: { id: string }) {
  const [deletedUser] = await db
    .update(usersTable)
    .set({ isDeleted: true })
    .where(eq(usersTable.id, id))
    .returning();

  await db.insert(activitiesTable).values({
    userId: deletedUser.id,
    type: "USER_DELETED",
    message: `User ${deletedUser.name} deleted`,
  });

  console.log("User deleted", deletedUser);
}
