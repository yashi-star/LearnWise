"use client";

import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How does the AI-powered mentorship work?",
    answer:
      "Our AI mentors analyze your learning style, progress, and goals to provide personalized guidance. They adapt to your pace and offer targeted feedback to help you succeed in your learning journey.",
  },
  {
    question: "What is the face recognition verification system?",
    answer:
      "Our face recognition system verifies your identity during exams and assessments to ensure academic integrity. It's a secure and convenient way to confirm your identity without additional passwords or codes.",
  },
  {
    question: "How does the voice assistant chatbot help with learning?",
    answer:
      "The AI voice assistant provides instant answers to your questions about course content. You can ask follow-up questions to deepen your understanding, and the assistant adapts to your learning style over time.",
  },
  {
    question: "What is the KYC verification process?",
    answer:
      "Know Your Customer (KYC) verification ensures a safe learning environment by verifying the identity of all users. This process helps prevent fraud and creates a trusted community of learners.",
  },
  {
    question: "How are course recommendations personalized?",
    answer:
      "Our AI analyzes your learning history, interests, and career goals to suggest courses that match your needs. The recommendation system improves over time as it learns more about your preferences.",
  },
  {
    question: "Can I switch mentors if I'm not satisfied?",
    answer:
      "Yes, you can request a different AI mentor at any time. Our system will match you with a mentor whose teaching style better aligns with your learning preferences.",
  },
];

const FAQ: FC = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our AI-powered learning
            platform
          </p>
        </motion.div>

        <Fade triggerOnce direction="up">
          <div className="max-w-3xl mx-auto bg-card/50 rounded-lg p-6 border border-primary/10 shadow-lg backdrop-blur-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-primary/10 last:border-b-0"
                >
                  <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="pt-1 pb-4">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Fade>

        <div className="flex justify-center mt-12">
          <Button
            className="bg-primary hover:bg-primary/90 text-black px-6 py-2 rounded-full font-medium"
            onClick={() => (window.location.href = "/support")}
          >
            Still have questions?
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
