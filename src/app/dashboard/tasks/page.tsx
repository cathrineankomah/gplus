import React from "react";
import { TasksListingComponent } from "@/components/dashboard/tasks-listing";
import { getAllAvailableTasks } from "@/server/api/task";
import { getUserTasks } from "@/server/api/user";

export const runtime = "edge";
export default async function TasksPage() {
  const tasks = await getAllAvailableTasks();
  const userTasks = await getUserTasks();
  return <TasksListingComponent tasks={tasks} taskCompletions={userTasks} />;
}
