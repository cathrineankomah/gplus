"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  DollarSign,
  TrendingUp,
  Award,
  Bell,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  taskCompletionsTable,
  activitiesTable,
  usersTable,
} from "@/server/db/schema";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
interface DashboardOverviewComponentProps {
  tasks: (typeof taskCompletionsTable.$inferSelect)[];
  activities: (typeof activitiesTable.$inferSelect)[];
  user: typeof usersTable.$inferSelect;
}

export function DashboardOverviewComponent({
  tasks,
  activities,
  user,
}: DashboardOverviewComponentProps) {
  const [isCopied, setIsCopied] = useState(false);

  const referralLink = `${user.referralCode}`;
  const tasksCompleted = tasks.filter(
    (task) => task.taskStatus === "approved"
  ).length;

  const userStats = [
    {
      title: "Tasks Completed",
      value: tasksCompleted,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Gains Earned",
      value: user.gains,
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Cash Available",
      value: formatCurrency(user.cash, user.currency),
      icon: <DollarSign className="h-4 w-4 text-green-500" />,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setIsCopied(true);
      toast.success("Referral Link Copied!");
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="mt-4 md:mt-0 flex items-center">
          <p className="text-sm text-gray-500 mr-2">
            Referral Code: {referralLink}
          </p>
          <Button
            onClick={copyToClipboard}
            className="ml-2 bg-green-500 hover:bg-green-600 text-white"
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isCopied ? "Copied" : "Copy referral link"}
            </span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Investment Pool Rate
            </CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Coming Soon</div>
            <p className="text-xs text-gray-500 mt-1">
              Grow your Gains in our community pool
            </p>
          </CardContent>
        </Card> */}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index}>
                <div className="flex items-start">
                  <Badge
                    className="mr-2 mt-1 min-w-28 text-center"
                    variant={
                      activity.type === "cash_added" ||
                      activity.type === "raffle_won"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {activity.type}
                  </Badge>
                  <div>
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500">
                      {formatRelativeTime(activity.createdAt)}
                    </p>
                  </div>
                </div>
                {index < activities.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/tasks"
            className={buttonVariants({ variant: "default" })}
          >
            Find New Tasks
          </Link>
          <Link
            href="/dashboard/raffles"
            className={buttonVariants({ variant: "outline" })}
          >
            View Raffles
          </Link>
          <Link
            href="/dashboard/withdraw"
            className={buttonVariants({ variant: "outline" })}
          >
            Withdraw Cash
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
