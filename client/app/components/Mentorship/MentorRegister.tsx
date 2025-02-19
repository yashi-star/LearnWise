'use client';
import React from 'react';
import Image from 'next/image';


const MentorRegister = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Become a Mentor Today!</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join our mentor community and guide aspiring professionals to success.
          </p>
          <button 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <Image
            src="/images/mentor1.png"
            alt="Apply as Mentor"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MentorRegister;
