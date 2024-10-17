'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Award, BarChart } from "lucide-react"

type Task = {
  id: number
  name: string
  description: string
  gains: number
  type: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  howTo: string[]
}

const tasks: Task[] = [
  {
    id: 1,
    name: "Website Testing",
    description: "Test a new e-commerce website and provide feedback on user experience.",
    gains: 100,
    type: "User Testing",
    duration: "30 minutes",
    level: "Beginner",
    howTo: [
      "Sign up for an account on the provided website",
      "Browse through the product categories",
      "Add items to your cart and go through the checkout process (don't actually purchase)",
      "Test search functionality and filters",
      "Write a detailed report on your experience, including any bugs or suggestions for improvement"
    ]
  },
  {
    id: 2,
    name: "Data Entry",
    description: "Enter product information into a spreadsheet from provided images.",
    gains: 150,
    type: "Data Entry",
    duration: "1 hour",
    level: "Intermediate",
    howTo: [
      "Download the provided spreadsheet template",
      "Review the product images and information provided",
      "Enter the product details accurately into the spreadsheet",
      "Double-check your entries for accuracy",
      "Submit the completed spreadsheet"
    ]
  },
  {
    id: 3,
    name: "Content Writing",
    description: "Write a 500-word article on sustainable living practices.",
    gains: 200,
    type: "Writing",
    duration: "2 hours",
    level: "Advanced",
    howTo: [
      "Research current sustainable living practices",
      "Create an outline for your article",
      "Write a 500-word article with an engaging introduction, informative body, and strong conclusion",
      "Proofread and edit your article",
      "Submit your completed article for review"
    ]
  }
]

export function TasksListingComponent() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const getLevelColor = (level: Task['level']) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Tasks</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{task.name}</CardTitle>
              <Badge className={`${getLevelColor(task.level)} mt-2`}>{task.level}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  {task.gains} Gains
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {task.duration}
                </span>
              </div>
              <Badge variant="outline" className="mt-2">
                {task.type}
              </Badge>
            </CardContent>
            <CardFooter className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setSelectedTask(task)}>View Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{selectedTask?.name}</DialogTitle>
                    <DialogDescription>Task Details</DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh]">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Description</h3>
                        <p>{selectedTask?.description}</p>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          {selectedTask?.gains} Gains
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {selectedTask?.duration}
                        </span>
                        <span className="flex items-center">
                          <BarChart className="h-4 w-4 mr-1" />
                          {selectedTask?.level}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">How to Complete</h3>
                        <ol className="list-decimal list-inside">
                          {selectedTask?.howTo.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}