"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Gift,
  Gamepad,
  TrendingUp,
  Info,
  Camera,
} from "lucide-react";
import confetti from "canvas-confetti";

export function FirstTask() {
  const [isStarted, setIsStarted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isStarted && countdown === 0) {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    return () => clearTimeout(timer);
  }, [isStarted, countdown]);

  const startTask = () => {
    setIsStarted(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Welcome to Your First Task!
          </CardTitle>
          <CardDescription>
            Get started with Gain Plus and earn your first reward
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Your First Task</h2>
            <p className="text-gray-600">
              Congratulations on joining Gain Plus! Your first task is simple:
              learn about our platform and complete a quick simulation. This
              will help you understand how tasks work and earn your first gains.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              How to Complete This Task
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Read through the information about Gain Plus below</li>
              <li>
                Click the &quot;Click here to perform task&quot; button at the
                bottom of this page
              </li>
              <li>Wait for the 5-second countdown to complete</li>
              <li>
                Once the countdown finishes, you&apos;ll see a celebration
                animation
              </li>
              <li>
                Your first task will be complete, and you&apos;ll earn your
                first gains!
              </li>
              <li className="flex items-center">
                <Camera className="mr-2 h-5 w-5 text-green-500" />
                Take a screenshot of this completed page and submit it to
                complete the task
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 flex items-center">
              <Info className="mr-2 h-6 w-6 text-green-500" />
              Learn More About Gain Plus
            </h2>
            <p className="text-gray-600 mb-4">
              Gain Plus is an innovative platform that allows you to earn
              rewards by completing various tasks, participating in games, and
              joining exciting raffles. Our mission is to provide you with
              multiple opportunities to increase your gains and potentially win
              amazing prizes.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Gift className="mr-2 h-5 w-5 text-green-500" />
                    Raffles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Use your gains to join raffles and win exciting prizes!
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Gamepad className="mr-2 h-5 w-5 text-green-500" />
                    Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Play fun games to earn more gains and boost your rewards!
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                    Investment Pool
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Invest cash in our pool to earn money without active work!
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Ready for Your First Task?
            </h2>
            {!isStarted ? (
              <Button
                onClick={startTask}
                size="lg"
                className="bg-green-500 hover:bg-green-600"
              >
                Click here to perform task
              </Button>
            ) : !isCompleted ? (
              <div className="space-y-2">
                <p className="text-xl font-semibold">Task in Progress</p>
                <Badge variant="outline" className="text-2xl p-2">
                  <Clock className="mr-2 h-5 w-5 inline" />
                  {countdown}
                </Badge>
              </div>
            ) : (
              <div className="space-y-2">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <p className="text-2xl font-semibold text-green-600">
                  Task Completed!
                </p>
                <p className="text-gray-600">
                  Great job! You&apos;ve completed your first task and earned
                  your first gains.
                </p>
                <p className="text-gray-600">
                  Don&apos;t forget to take a screenshot of this page and submit
                  it to finalize your task!
                </p>
              </div>
            )}
          </section>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 text-center w-full">
            This is just the beginning! Complete more tasks to earn more gains
            and unlock exciting opportunities with Gain Plus.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
