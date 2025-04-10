'use client';
import React from 'react';
import { styles } from '../styles/style';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaLightbulb, FaRocket } from 'react-icons/fa';
import { Reveal } from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            What is <span className="text-gradient">LearnWise?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A revolutionary platform connecting students with expert mentors to accelerate learning and career growth.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <FaGraduationCap className="w-12 h-12 text-blue-500" />,
              title: "Expert Mentorship",
              description: "Connect with industry professionals who guide you through your learning journey."
            },
            {
              icon: <FaUsers className="w-12 h-12 text-purple-500" />,
              title: "Community Learning",
              description: "Join a vibrant community of learners and grow together."
            },
            {
              icon: <FaLightbulb className="w-12 h-12 text-yellow-500" />,
              title: "Practical Skills",
              description: "Learn through real-world projects and hands-on experience."
            },
            {
              icon: <FaRocket className="w-12 h-12 text-green-500" />,
              title: "Career Growth",
              description: "Accelerate your career with industry-relevant skills and guidance."
            }
          ].map((feature, index) => (
            <Reveal key={index} keyframes={fadeInUp} delay={index * 200}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
          <Reveal keyframes={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At LearnWise, we're dedicated to transforming the way people learn programming and technical skills. 
              We believe that everyone deserves access to quality education and mentorship, regardless of their background 
              or location. Our platform connects passionate learners with experienced mentors who provide personalized 
              guidance and support throughout the learning journey.
            </p>
          </Reveal>
        </div>

        {/* Founders Section */}
        <div className="text-center">
          <Reveal keyframes={fadeInUp}>
            <h2 className="text-3xl font-bold mb-8">Meet Our Founders</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {['Yashi', 'Arjun', 'Anusha'].map((founder, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">{founder}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Co-Founder</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default About;
