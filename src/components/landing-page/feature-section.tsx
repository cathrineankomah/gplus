"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckSquare,
  Gamepad2,
  Gift,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import MaxWidthWrapper from "../max-width-wrapper";

export function FeatureSection() {
  const features = [
    {
      icon: <CheckSquare className="h-8 w-8 text-green-500" />,
      title: "Micro-Tasks",
      description:
        "Complete small, easy tasks and earn money for each one you finish. Perfect for your spare time!",
    },
    {
      icon: <Gamepad2 className="h-8 w-8 text-green-500" />,
      title: "Play Games",
      description:
        "Have fun and earn rewards by playing our selection of exciting online games. Gaming has never been so rewarding!",
    },
    {
      icon: <Gift className="h-8 w-8 text-green-500" />,
      title: "Win Prizes",
      description:
        "Participate in raffles for a chance to win amazing prizes like cash, gift cards, phones, and other electronic gadgets.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: "Investment Pool",
      description:
        "Grow your earnings by contributing to our community investment pool. Watch your money work for you!",
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Community",
      description:
        "Join a vibrant community of earners, share tips, and collaborate on tasks to maximize your earning potential.",
    },
    {
      icon: <Zap className="h-8 w-8 text-green-500" />,
      title: "Fast Payouts",
      description:
        "Get your earnings fast! We use the best payment processors to ensure your money is sent to you quickly and securely.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <MaxWidthWrapper>
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Make Money Online with Ease
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover multiple ways to earn money, have fun, and grow your
              wealth on our platform.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 border-green-100 hover:border-green-500 transition-colors duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {feature.icon}
                    <CardTitle className="text-xl font-bold">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
