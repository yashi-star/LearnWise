/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Fade, Slide } from "react-awesome-reveal";
import { Parallax } from "react-parallax";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const Hero: FC = () => {
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <motion.div
            className="lg:w-1/2 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent leading-tight">
              AI-Powered Learning Experience
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover personalized learning paths with AI mentors, face
              recognition verification, and intelligent course recommendations
              tailored just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
                onClick={() => router.push("/courses")}
              >
                Explore Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 hover:bg-primary/10"
                onClick={() => router.push("/about")}
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative max-w-lg mx-auto lg:ml-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-card rounded-lg overflow-hidden shadow-2xl border border-primary/10">
                <div className="aspect-w-16 aspect-h-9 min-h-[320px] bg-gradient-to-r from-primary/5 to-secondary/5 flex items-center justify-center">
                  <Image
                    src="/images/ai-learning.svg"
                    alt="AI-Powered Learning"
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-lg shadow-xl backdrop-blur-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    AI Mentor Available
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-secondary text-white p-3 rounded-lg shadow-xl backdrop-blur-sm"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    Personalized Learning
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
