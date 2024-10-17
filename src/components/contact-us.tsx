"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";

export function ContactUsComponent() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to your server or a third-party service
    console.log("Form submitted");
  };

  return (
    <div className="bg-white min-h-screen">
      <MaxWidthWrapper>
        <header className="bg-green-500 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-xl">Get in touch with the Gain Plus team</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-700">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-700">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-500" />
                    <span>info@gainplus.pro</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-500" />
                    <span>+233 20 123 4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-green-500" />
                    <span>123 Innovation Street, Accra, Ghana</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-700">
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
