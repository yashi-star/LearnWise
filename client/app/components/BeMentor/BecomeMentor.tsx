'use client'
import React from 'react';
import Image from 'next/image';
import { styles } from '../../styles/style';
import {
  FaCheckCircle,
  FaClipboardList,
  FaUserEdit,
  FaShareAlt,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaUsers,
} from 'react-icons/fa';
import Link from 'next/link';


const BecomeMentor = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8 rounded-lg ">
        <div className="md:w-1/2">
          <h1 className={styles.title}>
            Why should you be{' '}
            <span className="text-blue-600">Unstop Mentor?</span>
          </h1>
          <ul className="mt-2 text-black dark:text-white space-y-2">
            {[
              'Build your personal brand',
              'Teach to reach new heights',
              'Give back to society',
              'Mentor & earn',
            ].map((text, index) => (
              <li key={index} className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <Link href="/profile" passHref>
            <button className="flex flex-row justify-center items-center rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] p-2 text-[16px] font-Poppins font-semibold mt-2">
              Apply Now
            </button>
          </Link>
          
        </div>
        <div className="md:w-1/2 mt-2 md:mt-0">
          <Image
            src="/images/mentor2.png"
            alt="Mentor"
            width={500}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* How to be a Mentor Section */}
      <div className=" text-center">
        <h2 className={styles.title}>How can you be a Mentor?</h2>
        <p className={styles.label}>
          Join the clan of 2000+ unstoppable mentors who connect 1:1 with our
          ever-growing community of 21Mn+ students & early talent!
        </p>
      </div>

      {/* Steps Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-12">
        {[
          {
            step: '1',
            text: 'Fill the form',
            bg: 'bg-purple-100',
            icon: <FaClipboardList className="text-2xl text-black" />,
          },
          {
            step: '2',
            text: 'Add your details & social media handles',
            bg: 'bg-blue-100',
            icon: <FaUserEdit className="text-2xl text-black" />,
          },
          {
            step: '3',
            text: 'Share your Mentor profile link on social media',
            bg: 'bg-red-100',
            icon: <FaShareAlt className="text-2xl text-black" />,
          },
          {
            step: '4',
            text: 'Start with your first mentorship session',
            bg: 'bg-yellow-100',
            icon: <FaChalkboardTeacher className="text-2xl text-black" />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md ${item.bg} flex flex-col items-center`}
          >
            {item.icon}
            <h3 className="text-xl font-bold text-black mt-2">{item.step}</h3>
            <p className="text-black text-[16px] font-Poppins">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}

      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center flex flex-col items-center">
          <FaCalendarCheck className="text-3xl text-blue-600 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">1000+</h3>
          <p className="text-[16px] font-Poppins text-black">Sessions Booked</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center flex flex-col items-center">
          <FaUsers className="text-3xl text-green-600 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">200+</h3>
          <p className="text-[16px] font-Poppins text-black">Mentors Joined</p>
        </div>
      </div>
    </div>
  );
};

export default BecomeMentor;
