/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import { styles } from '../styles/style';
import CourseCard from '../components/Course/CourseCard';
import Footer from '../components/Footer';


const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title');
  const { data, isLoading } = useGetAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery('Categories', {});
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState('All');

  const categories = categoriesData?.layout.categories;

  useEffect(() => {
    if (category === 'All') {
      setCourses(data?.courses);
    }
    // if (category !== 'All') {
    //   setCourses(
    //     data?.courses.filter((item: any) => item.categories === category)
    //   );
    // }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />

          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title="LearnWise"
              description="LearnWise Is A Smart Platform To Pair Learners With Their Mentors and Help Each Other Grow"
              keywords={
                'Programming,MERN,Redux,Machine Learning,AI,Devops,Cloud Computing, Cybersecurity'
              }
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === 'All' ? 'bg-[crimson]' : 'bg-[#5050cb]'
                }
                m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory('All')}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? 'bg-[crimson]'
                          : 'bg-[#5094cb]'
                      }
                            m-3 px-3 rounded-[30px] flex items-center font-Poppins cursor-pointer `}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>

            {
                courses && courses.length===0 && (
                    <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}> 
                    {search ? "No courses found" :" No Courses found in this category.Please try another"}
                    </p>
                )
            }
            <br/>
            <br/>
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
                {courses && courses.map((item:any,index:number) =>(
                    <CourseCard item={item} key={index}/>
                ))}
            </div>
          </div>
          <Footer/>
        </>
      )}
    </div>
  );
};

export default Page;
