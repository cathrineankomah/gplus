'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, Award, BarChart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type Task = {
  id: number
  name: string
  description: string
  gains: number
  type: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

// This would typically come from your API or state management
const selectedTask: Task = {
  id: 1,
  name: "Website Testing",
  description: "Test a new e-commerce website and provide feedback on user experience.",
  gains: 100,
  type: "User Testing",
  duration: "30 minutes",
  level: "Beginner"
}

export function TaskSubmissionComponent() {
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // This is where you'd typically make an API call to submit the code
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      toast({
        title: "Task Submitted Successfully!",
        description: "Your submission has been received and is being reviewed.",
      })
      router.push('/dashboard') // Redirect to dashboard after successful submission
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Submit Task</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">{selectedTask.name}</h2>
            <Badge className={`${getLevelColor(selectedTask.level)} mb-2`}>{selectedTask.level}</Badge>
            <p className="text-gray-600 mb-4">{selectedTask.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {selectedTask.gains} Gains
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {selectedTask.duration}
              </span>
              <span className="flex items-center">
                <BarChart className="h-4 w-4 mr-1" />
                {selectedTask.type}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Code</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Textarea
                placeholder="Paste your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[200px] mb-4"
                required
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Task'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}