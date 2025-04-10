"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CourseCard from "../Course/CourseCard";
import { Fade } from "react-awesome-reveal";

// Static course data for use when API is unavailable
const staticCourses = [
  {
    id: "1",
    name: "Complete AI Masterclass",
    price: 299,
    estimatedPrice: 599,
    thumbnail: {
      url: "/images/ai-learning.svg",
    },
    tags: "AI, Machine Learning",
    level: "Beginner to Advanced",
    daysLeft: 20,
    ratings: 4.7,
    purchased: 1200,
  },
  {
    id: "2",
    name: "Web Development Bootcamp",
    price: 199,
    estimatedPrice: 399,
    thumbnail: {
      url: "/images/ai-learning.svg",
    },
    tags: "HTML, CSS, JavaScript",
    level: "Beginner",
    daysLeft: 30,
    ratings: 4.9,
    purchased: 1800,
  },
  {
    id: "3",
    name: "Data Science Fundamentals",
    price: 249,
    estimatedPrice: 499,
    thumbnail: {
      url: "/images/ai-learning.svg",
    },
    tags: "Python, Statistics, Data Analysis",
    level: "Intermediate",
    daysLeft: 25,
    ratings: 4.8,
    purchased: 1500,
  },
];

const Courses: FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    // In a real scenario, we would fetch from API
    // For now, just use static data to avoid unnecessary API calls
    setCourses(staticCourses);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Popular Courses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Explore our most sought-after courses designed to help you master
            new skills and achieve your learning goals
          </p>
        </motion.div>

        <Fade cascade damping={0.1} triggerOnce>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses && courses.length > 0 ? (
              courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="col-span-full text-center">
                No courses available at the moment.
              </p>
            )}
          </div>
        </Fade>

        <div className="text-center mt-12 md:mt-16">
          <Link href="/courses">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
            >
              Browse All Courses
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
