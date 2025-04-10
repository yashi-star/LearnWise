/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import React, { FC } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";
import Features from "./components/Route/Features";
import Testimonials from "./components/Route/Testimonials";

const Page: FC = () => {
  return (
    <>
      <Heading
        title="LearnWise - AI-Powered Learning Platform"
        description="LearnWise is a modern learning platform with AI-powered features"
        keywords="learning, education, AI, online courses"
      />
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
};

export default Page;
