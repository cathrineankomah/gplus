"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import MaxWidthWrapper from "./max-width-wrapper";

export function PrivacyPolicyComponent() {
  const policyItems = [
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, update your profile, or participate in our platform activities. This may include your name, email address, phone number, and payment information. We also collect information about your use of our services, including your task history and earnings.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use the information we collect to operate and improve our services, process your transactions, communicate with you, and personalize your experience on Gain Plus. This includes matching you with suitable tasks, calculating and distributing your earnings, and sending you important updates about our service.",
    },
    {
      title: "Information Sharing and Disclosure",
      content:
        "We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and data analysis. We may also share information when required by law or to protect our rights and the safety of our users.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.",
    },
    {
      title: "Your Rights and Choices",
      content:
        "You can access, update, or delete your account information at any time through your account settings. You may also have rights under applicable data protection laws, including the right to access, correct, or delete your personal information.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'Last Updated' date.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this privacy policy or our practices, please contact us at privacy@gainplus.com.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <MaxWidthWrapper>
        <header className="bg-green-500 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-xl">
              Protecting your data and privacy on Gain Plus
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Card className="p-6 mb-8 bg-green-50">
            <p className="text-lg text-green-800">
              At Gain Plus, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, and safeguard your data when
              you use our platform.
            </p>
          </Card>

          <p className="mb-8 text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <Accordion type="single" collapsible className="w-full">
            {policyItems.map((item, index) => (
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
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Questions or Concerns?
            </h2>
            <p className="text-gray-700">
              If you have any questions or concerns about our Privacy Policy or
              data practices, please don&apos;t hesitate to contact us at{" "}
              <a
                href="mailto:privacy@gainplus.com"
                className="text-green-600 hover:underline"
              >
                privacy@gainplus.com
              </a>
              . We are committed to addressing any issues and ensuring your
              privacy is protected.
            </p>
          </div>
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
