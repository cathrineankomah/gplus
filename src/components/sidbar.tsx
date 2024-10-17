import React, { ReactNode } from "react";

import DashboardSidbarLinks from "./sidebar-links";

export default function DashboardSideBar({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="fixed hidden h-screen flex-col justify-between border-r-[1px] bg-white md:flex w-48 lg:w-64">
        <div className="flex flex-col items-center">
          <DashboardSidbarLinks />
        </div>
      </div>
      <div className="ml-0  w-full md:ml-48 md:mt-0 lg:ml-64">{children}</div>
    </div>
  );
}
