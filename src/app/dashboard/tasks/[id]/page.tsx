import { getTaskById } from "@/server/api/task";
import { notFound } from "next/navigation";
import { SubmitTask } from "@/components/dashboard/submit-task";

interface TaskPageProps {
  params: { id: string };
}

export const runtime = "edge";

export default async function TaskPage({ params }: TaskPageProps) {
  try {
    if (!params.id || typeof params.id !== "string") {
      throw new Error("Invalid task ID");
    }

    const taskArray = await getTaskById(params.id);
    const task = taskArray[0]; // Get the first task from the array

    if (!task) {
      return notFound();
    }

    return <SubmitTask task={task} />;
  } catch (error) {
    console.error("Error fetching task:", error);
    return notFound();
  }
}
