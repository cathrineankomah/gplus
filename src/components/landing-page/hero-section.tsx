import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Gift, Gamepad2, CheckSquare } from "lucide-react";
import Image from "next/image";
import MaxWidthWrapper from "../max-width-wrapper";
import Link from "next/link";

export default function Component() {
  return (
    <section className="relative w-full pt-12 md:pt-16 bg-green-50 overflow-hidden">
      <MaxWidthWrapper>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-48 h-48 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="flex flex-col items-center lg:items-start space-y-4 text-center lg:text-left lg:w-1/2">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Earn Money. Have Fun.{" "}
                  <span className="text-green-500">Gain Plus.</span>
                </h1>
                <p className="mx-auto lg:mx-0 max-w-[600px] text-gray-600 md:text-lg dark:text-gray-400">
                  Join our crowd-sourcing platform to complete micro-tasks, play
                  exciting games, and participate in raffles for amazing
                  rewards.
                </p>
              </div>

              <div className="w-full max-w-sm space-y-2">
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                    className:
                      "w-full bg-green-500 hover:bg-green-600 text-white text-lg",
                  })}
                >
                  Start Earning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium">
                    Complete Micro-tasks
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium">Play Games</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium">
                    Win Amazing Prizes
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative w-full mx-auto">
                <Image
                  src="/hero1.webp"
                  width={898}
                  height={834}
                  alt="App mockup"
                />
                <div className="absolute -top-2 -left-2 w-16 h-16 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
