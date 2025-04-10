"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Data Science Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    content:
      "The AI-powered mentorship has been incredible. My mentor helped me land my dream job at a top tech company!",
    rating: 5,
    feature: "AI Mentor",
  },
  {
    name: "Michael Chen",
    role: "Web Development Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    content:
      "The face recognition feature makes learning so much more engaging. It's like having a personal tutor available 24/7.",
    rating: 5,
    feature: "Face Recognition",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Design Student",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    content:
      "The voice assistant chatbot is a game-changer. It's helped me understand complex design concepts in a way that just clicks.",
    rating: 5,
    feature: "Voice Assistant",
  },
];

const Testimonials: FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our students who have transformed their careers with
            AI-powered learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Fade key={index} triggerOnce direction="up" delay={index * 100}>
              <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-background">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {testimonial.feature}
                  </div>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
