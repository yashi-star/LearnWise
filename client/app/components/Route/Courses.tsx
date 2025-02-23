/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react';
import CourseCard from '../Course/CourseCard';

const Courses = () => {
  const { data, isLoading } = useGetAllCoursesQuery({});

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    console.log('Fetched Courses Data:', data);
    if (data?.courses) {
      setCourses(data?.courses);
    }
  }, [data]);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight ">
          Expand Your Career <span className="text-gradient">Opportunity</span>
          <br />
          Opportunity with our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0 ">
          {courses && courses.length > 0 ? (
            courses.map((item: any, index: number) => (
              <CourseCard key={index} item={item} />
            ))
          ) : (
            <p className="text-center text-lg font-bold text-red-500">
              No courses available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
