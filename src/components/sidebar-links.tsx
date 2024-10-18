"use client";
import React from "react";
import {
  DollarSign,
  Gamepad2,
  Gift,
  LayoutDashboard,
  Settings,
  CheckSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidbarLinks() {
  const activeTab = usePathname();
  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { name: "Tasks", icon: CheckSquare, url: "/dashboard/tasks" },
    { name: "Raffles", icon: Gift, url: "/dashboard/raffles" },
    { name: "Games", icon: Gamepad2, url: "/dashboard/#" },
    { name: "Investments", icon: DollarSign, url: "/dashboard/#" },
    { name: "Settings", icon: Settings, url: "/dashboard/#" },
  ];

  return (
    <nav className="mt-4 w-full">
      {sidebarItems.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          className={`flex items-center px-4 py-2 text-gray-700 ${
            activeTab === item.url.toLowerCase()
              ? "bg-primary text-white"
              : "hover:bg-gray-100"
          }`}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
