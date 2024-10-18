"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Clock, Award, BarChart2, Tag } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { tasksTable } from "@/server/db/schema";

type Task = typeof tasksTable.$inferSelect;

interface SubmitTaskProps {
  task: Task;
}

export function SubmitTask({ task }: SubmitTaskProps) {
  const [textSubmission, setTextSubmission] = useState("");
  const [imageSubmission, setImageSubmission] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    task.duration
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev! - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (task.submissionType === "image" && !imageSubmission) {
      toast.error("Please upload an image to complete this task.");
      return;
    }
    if (task.submissionType === "text" && !textSubmission.trim()) {
      toast.error("Please enter your submission to complete this task.");
      return;
    }

    setIsSubmitting(true);

    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: "Submitting task...",
      success: () => {
        router.push("/dashboard/tasks");
        return "Task Submitted Successfully!.";
      },
      error: "Failed to submit task. Please try again.",
    });
  };

  const isSubmitDisabled = timeRemaining !== null && timeRemaining > 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{task.name}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Award className="h-4 w-4 mr-1" />
              {task.gains} Gains
            </span>
            {task.duration !== null && (
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {timeRemaining !== null && timeRemaining > 0
                  ? `${timeRemaining}s`
                  : "Ready"}
              </span>
            )}
            <span className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-1" />
              {task.taskLevel}
            </span>
            <span className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              {task.category}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">How to Complete:</h3>
            <p className="whitespace-pre-line text-gray-600">{task.howTo}</p>
          </div>

          {task.guideImageUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Guide Image:</h3>
              <Image
                src={task.guideImageUrl}
                alt="Task guide"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          )}

          <div className="space-y-4">
            {task.submissionType === "text" ? (
              <div className="space-y-2">
                <Label htmlFor="textSubmission">Your Submission</Label>
                <Textarea
                  id="textSubmission"
                  value={textSubmission}
                  onChange={(e) => setTextSubmission(e.target.value)}
                  placeholder="Enter your submission here"
                  className="min-h-[100px]"
                  required
                  disabled={isSubmitDisabled}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="imageSubmission">Upload Screenshot</Label>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      setImageSubmission(res[0].url);
                      toast.success("Image uploaded successfully");
                      handleSubmit();
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload error: ${error.message}`);
                  }}
                  disabled={isSubmitDisabled}
                />
                {imageSubmission && (
                  <div className="mt-4">
                    <Image
                      src={imageSubmission}
                      alt="Submission preview"
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 text-center w-full">
            Make sure your submission meets all the requirements before
            uploading.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
