'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TermsOfServiceComponent() {
  const termsItems = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using Gain Plus, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service."
    },
    {
      title: "User Eligibility",
      content: "You must be at least 18 years old to use Gain Plus. By using our service, you represent and warrant that you meet this eligibility requirement."
    },
    {
      title: "User Account",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
    },
    {
      title: "Acceptable Use",
      content: "You agree not to use Gain Plus for any unlawful purpose or in any way that could damage, disable, overburden, or impair our service. This includes not engaging in any fraudulent activities or misrepresenting information."
    },
    {
      title: "Intellectual Property",
      content: "The content, features, and functionality of Gain Plus are owned by Heaven Gains Enterprise and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws."
    },
    {
      title: "Payment and Earnings",
      content: "We will make every effort to process payments for completed tasks in a timely manner. However, we reserve the right to withhold payment in cases of suspected fraud or violation of these terms."
    },
    {
      title: "Termination",
      content: "We reserve the right to terminate or suspend your account and access to Gain Plus at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason."
    },
    {
      title: "Limitation of Liability",
      content: "To the fullest extent permitted by applicable law, Heaven Gains Enterprise and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues."
    },
    {
      title: "Governing Law",
      content: "These Terms of Service shall be governed by and construed in accordance with the laws of Ghana, without regard to its conflict of law provisions."
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify or replace these Terms of Service at any time. We will provide notice of any significant changes. Your continued use of Gain Plus after such modifications will constitute your acknowledgment and acceptance of the modified terms."
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-green-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-xl">Guidelines for using Gain Plus</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Card className="p-6 mb-8 bg-green-50">
          <p className="text-lg text-green-800">
            Welcome to Gain Plus. These Terms of Service govern your use of our platform and services. Please read these terms carefully before using Gain Plus.
          </p>
        </Card>

        <p className="mb-8 text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>

        <Accordion type="single" collapsible className="w-full">
          {termsItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-green-700">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:terms@gainplus.com" className="text-green-600 hover:underline">
              terms@gainplus.com
            </a>
            .
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}