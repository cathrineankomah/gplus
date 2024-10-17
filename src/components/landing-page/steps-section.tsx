"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CreditCard, UserPlus } from "lucide-react";
import MaxWidthWrapper from "../max-width-wrapper";
import Link from "next/link";
export function StepsSectionComponent() {
  const steps = [
    {
      icon: <UserPlus className="h-12 w-12 text-green-500" />,
      title: "Sign Up",
      description:
        "Create your account in just a few clicks. It's quick and easy!",
    },
    {
      icon: <CreditCard className="h-12 w-12 text-green-500" />,
      title: "Pay Sign-Up Fee",
      description:
        "Make a small investment to unlock all our earning opportunities.",
    },
    {
      icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
      title: "Start Earning",
      description:
        "Complete tasks, play games, and participate in raffles to earn money!",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <MaxWidthWrapper>
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get Started in 3 Simple Steps
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Join our platform and start earning money online today. It&apos;s
              easy, fun, and rewarding!
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative bg-white border-2 border-green-100"
              >
                <CardContent className="pt-12 pb-8 px-8 text-center">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 border-2 border-green-500">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold",
              })}
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
