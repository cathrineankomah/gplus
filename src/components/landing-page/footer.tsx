"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import MaxWidthWrapper from "../max-width-wrapper";

export function FooterComponent() {
  return (
    <footer className="w-full py-6 bg-green-900 text-white">
      <MaxWidthWrapper>
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold">GainPlus</h3>
              <p className="text-sm text-green-200">
                Make money online through micro-tasks, games, and more!
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <Link href="/about-us" className="text-sm hover:text-green-300">
                About Us
              </Link>
              <Link href="/contact-us" className="text-sm hover:text-green-300">
                FAQ
              </Link>
              <Link href="/contact-us" className="text-sm hover:text-green-300">
                Contact
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold">Legal</h3>
              <Link href="/privacy" className="text-sm hover:text-green-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-green-300">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-green-200">
              © {new Date().getFullYear()} Heaven Gains Enterprise. All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="https://facebook.com"
                className="text-green-200 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-green-200 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.youtube.com/@gainplus-v8h"
                className="text-green-200 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
              <Link
                href="https://www.instagram.com/gain_plus24"
                className="text-green-200 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
