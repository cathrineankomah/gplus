import { DashboardOverviewComponent } from "@/components/dashboard/dashboard-overview";
import { getUser, getUserTasks, getUserActivities } from "@/server/api/user";
import React from "react";

export const runtime = "edge";
export default async function DashboardPage() {
  const user = await getUser();
  const tasks = await getUserTasks();
  const activities = await getUserActivities();
  return (
    <div>
      <DashboardOverviewComponent
        user={user}
        tasks={tasks}
        activities={activities}
      />
    </div>
  );
}
