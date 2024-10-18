"use client";

import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Award, BarChart, Search, Maximize2 } from "lucide-react";
import { taskCompletionsTable, tasksTable } from "@/server/db/schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { parseSeconds, formatTime } from "@/lib/utils";

interface TaskListProps {
  tasks: (typeof tasksTable.$inferSelect)[];
  taskCompletions: (typeof taskCompletionsTable.$inferSelect)[];
}

export function TasksListingComponent({
  tasks,
  taskCompletions,
}: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<
    typeof tasksTable.$inferSelect | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFullImage, setShowFullImage] = useState(false);
  const tasksPerPage = 6;

  const getLevelColor = (level: string | null) => {
    switch (level) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      case "expert":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTasks =
    taskCompletions.length === 0
      ? tasks.filter((task) => task.createdBy === "system")
      : tasks.filter(
          (task) =>
            (task.multipleSubmissions ||
              !taskCompletions.some(
                (completion) => completion.taskId === task.id
              )) &&
            task.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedLevel === "All" || task.taskLevel === selectedLevel)
        );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLevel]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Tasks</h1>
      <div className="flex justify-between mb-4">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Select onValueChange={setSelectedLevel} defaultValue="All">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentTasks.map((task) => (
          <Card key={task.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{task.name}</CardTitle>
              <Badge className={`${getLevelColor(task.taskLevel)} mt-2`}>
                {task.taskLevel}
              </Badge>
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
                  {formatTime(parseSeconds(task.duration || 0))}
                </span>
              </div>
              <Badge variant="outline" className="mt-2">
                {task.category}
              </Badge>
            </CardContent>
            <CardFooter className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    onClick={() => setSelectedTask(task)}
                  >
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{selectedTask?.name}</DialogTitle>
                    <DialogDescription>Task Details</DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[70vh]">
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
                          {formatTime(
                            parseSeconds(selectedTask?.duration || 0)
                          )}
                        </span>
                        <span className="flex items-center">
                          <BarChart className="h-4 w-4 mr-1" />
                          {selectedTask?.taskLevel}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">How to Complete</h3>
                        <p>{selectedTask?.howTo}</p>
                      </div>
                      {selectedTask?.guideImageUrl && (
                        <div className="relative">
                          <h3 className="font-semibold mb-2">Guide Image</h3>
                          <div className="relative w-full h-64">
                            <Image
                              src={selectedTask.guideImageUrl}
                              alt="Task guide"
                              layout="fill"
                              objectFit="contain"
                              className="cursor-pointer"
                              onClick={() => setShowFullImage(true)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute bottom-2 right-2"
                              onClick={() => setShowFullImage(true)}
                            >
                              <Maximize2 className="h-4 w-4 mr-1" />
                              View Full Image
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <DialogFooter>
                    <Link
                      href={`/dashboard/tasks/${selectedTask?.id}/`}
                      className={buttonVariants({ className: "w-full" })}
                    >
                      Start Task
                    </Link>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {showFullImage && selectedTask?.guideImageUrl && (
                <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Full Guide Image</DialogTitle>
                    </DialogHeader>
                    <div className="relative w-full h-[80vh]">
                      <Image
                        src={selectedTask.guideImageUrl}
                        alt="Full task guide"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setShowFullImage(false)}>
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
        ))}
        {taskCompletions.length === 0 && (
          <Card className="flex flex-col justify-center items-center">
            <CardContent className="text-center">
              <p className="text-lg font-semibold mb-2 py-4">
                Complete First Task
              </p>
              <p className="text-sm text-gray-600">
                Complete and get accepted to view more tasks.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="mt-6 flex justify-center">
        {Array.from(
          { length: Math.ceil(filteredTasks.length / tasksPerPage) },
          (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className="mx-1"
            >
              {i + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
