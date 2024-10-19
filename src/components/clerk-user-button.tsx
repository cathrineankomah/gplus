"use client";

import { UserButton } from "@clerk/nextjs";
import {
  DollarSign,
  Gamepad2,
  Gift,
  LayoutDashboard,
  Settings,
  CheckSquare,
} from "lucide-react";

export default function ClerkUserButton() {
  return (
    <div>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            href="/dashboard"
            label="Dashboard"
            labelIcon={<LayoutDashboard className="w-4 h-4" />}
          />
          <UserButton.Link
            href="/dashboard/tasks"
            label="Tasks"
            labelIcon={<CheckSquare className="w-4 h-4" />}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}
