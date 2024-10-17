import MaxWidthWrapper from "@/components/max-width-wrapper";
import Sidebar from "@/components/sidbar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaxWidthWrapper>
      <Sidebar>
        <div className="min-h-[calc(100vh-6rem)] bg-background">{children}</div>
      </Sidebar>
    </MaxWidthWrapper>
  );
}
