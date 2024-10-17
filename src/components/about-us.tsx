"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Target, Globe } from "lucide-react";
import Image from "next/image";
import MaxWidthWrapper from "./max-width-wrapper";

export function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      <MaxWidthWrapper>
        <header className="bg-green-500 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">About Gain Plus</h1>
            <p className="text-xl">
              Empowering young people to thrive in the digital economy
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-green-700">
              Our Mission
            </h2>
            <p className="text-lg mb-6">
              At Heaven Gains Enterprise, we are passionate about creating
              opportunities for people to make money, especially during these
              challenging times. Our app, Gain Plus, is designed to empower
              individuals, with a special focus on the youth of Ghana, to tap
              into the vast potential of the digital economy.
            </p>
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <p className="text-green-800 font-semibold">
                  &quot;We believe that everyone deserves the chance to achieve
                  financial stability and growth. Through Gain Plus, we&apos;re
                  making that belief a reality for the people of Ghana and
                  beyond.&quot;
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-green-700">
              Why Gain Plus?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Community Focused
                  </h3>
                  <p>
                    We&apos;re building a supportive community of earners who
                    help each other succeed.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Target className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Targeted Opportunities
                  </h3>
                  <p>
                    Our platform offers tailored earning opportunities that
                    match your skills and interests.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Globe className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                  <p>
                    While focused on Ghana, we connect you with earning
                    opportunities from around the world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-green-700">
              Our Story
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <p className="text-lg mb-4">
                  Heaven Gains Enterprise was founded in Ghana with a vision to
                  bridge the gap between global digital opportunities and local
                  talent. We recognized the immense potential of Ghana&apos;s
                  youth and set out to create a platform that would allow them
                  to showcase their skills and earn a living in the digital
                  world.
                </p>
                <p className="text-lg mb-4">
                  Gain Plus is the result of our commitment to this vision.
                  It&apos;s more than just an app – it&apos;s a gateway to
                  financial empowerment and personal growth for thousands of
                  Ghanaians and beyond.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt="Team working together"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-green-700">
              Join Us in Making a Difference
            </h2>
            <p className="text-lg mb-6">
              We&apos;re always looking for passionate individuals to join our
              community. Whether you&apos;re looking to earn, or you want to
              provide opportunities, there&apos;s a place for you in the Gain
              Plus family.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Get Started with Gain Plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
