"use server";

import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { taskCompletionsTable, tasksTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function getAllAvailableTasks() {
  try {
    let tasks = await db.select().from(tasksTable);

    if (tasks.length === 0) {
      // create a first task
      const task = await db
        .insert(tasksTable)
        .values({
          name: "Complete the first task",
          description: "Complete the first task",
          howTo: `Visit https://gainplus.pro/first-task. \n
        Scroll down to the butom and click on get started. \n
        take a screenshot and upload on the task submission page. \n
        `,
          gains: 100,
          submissionType: "image",
          taskLevel: "easy",
          duration: 1,
          category: "blog",
          createdBy: "system",
        })
        .returning();
      revalidatePath("/dashboard/tasks");
    }
    console.log("tasks", tasks);
    return tasks;
  } catch (error) {
    console.error("Error in getAllAvailableTasks:", error);
    throw error;
  }
}

export async function getTaskById(id: string) {
  try {
    const task = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id));
    return task;
  } catch (error) {
    console.error("Error in getTaskById:", error);
    throw error;
  }
}

export async function getTaskCompletionsByTaskId(taskId: string) {
  try {
    const taskCompletions = await db
      .select()
      .from(taskCompletionsTable)
      .where(eq(taskCompletionsTable.taskId, taskId));
    return taskCompletions;
  } catch (error) {
    console.error("Error in getTaskCompletionsByTaskId:", error);
    return null;
  }
}

export async function submitTaskCompletion({
  submissionData,
  submissionType,
  taskId,
  userId,
  taskStatus,
}: typeof taskCompletionsTable.$inferSelect) {
  try {
    const taskCompletion = await db
      .insert(taskCompletionsTable)
      .values({
        submissionData,
        submissionType,
        taskId,
        userId,
        taskStatus,
      })
      .returning();
    return taskCompletion;
  } catch (error) {
    console.error("Error in submitTaskCompletion:", error);
    return null;
  }
}
