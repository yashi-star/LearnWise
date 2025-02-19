'use client';
import { styles } from '@/app/styles/style';
import React from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const MentorPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <div className="flex flex-col md:flex-row items-center px-6 md:px-16">
        <div className="md:w-1/2 text-left">
          <h1 className={' text-[50px] font-bold text-blue-500  text-center'}>Unlock
             <span className='text-gray-600'>Guidance</span></h1>
          <p className="text-lg font-Poppins">
            Book a session with unstoppable mentors across domains & work
            together to build your career!
          </p>
          <div className="flex mt-4">
            <Link href="/MentorDetailsPage" className={styles.button + ' py-2 text-sm'}>
              <FaSearch className="mr-2" /> Find Mentor
            </Link>
            <Link href="/MentorRegister"
            className={styles.button + ' ml-4 px-4 py-2 text-sm'}>
              Be a mentor</Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <Image
            src="/images/mentor1.png"
            alt="mentors"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="py-10 text-center">
        <h2 className={'text-[30px] font-Poppins font-bold text-gray-700  dark:text-gray-300 '}>Top Mentors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 px-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <Image
              src="/images/client1.jpg"
              alt="Mentor 1"
              width={80}
              height={80}
              className="rounded-full mx-auto"
            />
            <h3 className="mt-2 text-black dark:text-white">Vedansh Dubey</h3>
            <p className="text-sm">HRBP @ Wipro | 150+ Case Competitions</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <Image
              src="/images/client2.jpg"
              alt="Mentor 2"
              width={80}
              height={80}
              className="rounded-full mx-auto"
            />
            <h3 className="mt-2 text-black dark:text-white">Shiri Agarwal</h3>
            <p className="text-sm">Product @ Telstra | MBA @ MDI</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <Image
              src="/images/client3.jpg"
              alt="Mentor 3"
              width={80}
              height={80}
              className="rounded-full mx-auto"
            />
            <h3 className="mt-2 text-black dark:text-white">Aman Gupta</h3>
            <p className="text-sm">Data Scientist @ Google</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <Image
              src="/images/client1.jpg"
              alt="Mentor 4"
              width={80}
              height={80}
              className="rounded-full mx-auto"
            />
            <h3 className="mt-2 text-black dark:text-white">Neha Sharma</h3>
            <p className="text-sm">Software Engineer @ Microsoft</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center
            flex">
          <Image
            src="/images/client1.jpg"
            alt=""
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />
          <Image
            src="/images/client2.jpg"
            alt=""
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px] ml-[-20px]"
          />
          <Image
            src="/images/client3.jpg"
            alt=""
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px] ml-[-20px]"
          />   
            <Link
              href="/MentorDetailsPage"
              className="dark:text-[#46e256] text-[crimson] "
            >
              Browse All Mentors
            </Link>{' '}


          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
