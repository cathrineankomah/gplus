'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, DollarSign, TrendingUp, Award, Bell, Copy, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function DashboardOverviewComponent() {
  const [isCopied, setIsCopied] = useState(false)
  const referralLink = "https://gainplus.com/ref/user123" // Replace with actual referral link

  const userStats = [
    { title: "Tasks Completed", value: 127, icon: <CheckCircle className="h-4 w-4 text-green-500" /> },
    { title: "Gains Earned", value: 5430, icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
    { title: "Cash Available", value: "$215.50", icon: <DollarSign className="h-4 w-4 text-green-500" /> },
  ]

  const notifications = [
    { type: "Task Submitted", message: "You submitted the task 'Data Entry for E-commerce'", time: "2 hours ago" },
    { type: "Gains Received", message: "You received 50 Gains for completing a survey", time: "5 hours ago" },
    { type: "Raffle Won", message: "Congratulations! You won a $10 gift card in the weekly raffle", time: "1 day ago" },
    { type: "Task Completed", message: "Your task 'Website Testing' has been approved", time: "2 days ago" },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setIsCopied(true)
      toast({
        title: "Referral Link Copied!",
        description: "The link has been copied to your clipboard.",
      })
      setTimeout(() => setIsCopied(false), 3000)
    })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="mt-4 md:mt-0 flex items-center">
          <Input
            value={referralLink}
            readOnly
            className="w-64 bg-white"
          />
          <Button
            onClick={copyToClipboard}
            className="ml-2 bg-green-500 hover:bg-green-600 text-white"
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">{isCopied ? "Copied" : "Copy referral link"}</span>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Investment Pool Rate</CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Coming Soon</div>
            <p className="text-xs text-gray-500 mt-1">Grow your Gains in our community pool</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <Bell className="h-5 w-5 text-green-500 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index}>
                <div className="flex items-start">
                  <Badge className="mr-2 mt-1" variant={notification.type === "Raffle Won" ? "default" : "secondary"}>
                    {notification.type}
                  </Badge>
                  <div>
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
                {index < notifications.length - 1 && (
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
          <Button className="bg-green-500 hover:bg-green-600 text-white">Find New Tasks</Button>
          <Button variant="outline">View All Gains</Button>
          <Button variant="outline">Withdraw Cash</Button>
        </CardContent>
      </Card>
    </div>
  )
}