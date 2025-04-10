"use client";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Fingerprint,
  MessageSquare,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "AI-Powered Mentorship",
    description:
      "Get personalized guidance from AI mentors that adapt to your learning style and pace.",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Face Recognition Verification",
    description:
      "Secure your learning journey with advanced face recognition technology for identity verification.",
    icon: Fingerprint,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Voice Assistant Chatbot",
    description:
      "Ask questions and get instant answers from our AI voice assistant for each course.",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Personalized Course Recommendations",
    description:
      "Receive tailored course suggestions based on your interests, goals, and learning history.",
    icon: Sparkles,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "KYC Identity Verification",
    description:
      "Ensure a safe learning environment with our Know Your Customer verification system.",
    icon: UserCheck,
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Real-time Learning Analytics",
    description:
      "Track your progress with AI-powered analytics that provide insights into your learning journey.",
    icon: Zap,
    color: "from-indigo-500 to-violet-500",
  },
];

const Features: FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            AI-Powered Learning Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the future of education with our cutting-edge AI
            technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Fade key={index} triggerOnce direction="up" delay={index * 100}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-background">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
