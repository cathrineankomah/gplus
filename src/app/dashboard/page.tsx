import { DashboardOverviewComponent } from "@/components/dashboard/dashboard-overview";
import { getUser } from "@/server/api/user";
import React from "react";

export const runtime = "edge";
export default async function DashboardPage() {
  const user = await getUser();
  return (
    <div className="space-y-4 py-4 pl-4">
      <DashboardOverviewComponent />
    </div>
  );
}
