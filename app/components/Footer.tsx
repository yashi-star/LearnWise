"use client";
import Link from "next/link";
import React, { FC } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer: FC = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About LearnWise</h3>
            <p className="text-muted-foreground mb-4">
              LearnWise is an AI-powered learning platform that connects
              students with personalized mentors and courses tailored to their
              needs.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">AI Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features#mentorship"
                  className="text-muted-foreground hover:text-primary"
                >
                  AI-Powered Mentorship
                </Link>
              </li>
              <li>
                <Link
                  href="/features#face-recognition"
                  className="text-muted-foreground hover:text-primary"
                >
                  Face Recognition Verification
                </Link>
              </li>
              <li>
                <Link
                  href="/features#voice-assistant"
                  className="text-muted-foreground hover:text-primary"
                >
                  Voice Assistant Chatbot
                </Link>
              </li>
              <li>
                <Link
                  href="/features#recommendations"
                  className="text-muted-foreground hover:text-primary"
                >
                  Personalized Recommendations
                </Link>
              </li>
              <li>
                <Link
                  href="/features#kyc"
                  className="text-muted-foreground hover:text-primary"
                >
                  KYC Identity Verification
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                <strong>Email:</strong> support@learnwise.com
              </li>
              <li className="text-muted-foreground">
                <strong>Phone:</strong> +1 (555) 123-4567
              </li>
              <li className="text-muted-foreground">
                <strong>Address:</strong> 123 AI Street, Tech City, TC 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} LearnWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
