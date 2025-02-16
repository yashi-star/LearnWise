/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
'use client'
import React, { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';
type Props = {};

const Hero: FC<Props> = (props) => {
  const {data,isLoading}=useGetHeroDataQuery('Banner',{});
  const [search,setSearch] =useState("");
  const router=useRouter();


  const handleSearch=()=>{
    if(search===""){
      return
    }
    else{
      router.push(`/course?title=${search}`);
    }
  }

  return (
    <>
    { isLoading ? (
      <Loader/>
     ):(  
    <div className="w-full 1000px:flex items-center">
      <div className="absolute  top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1000px:h-[500px] 1000px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-full ml-[40px] ">
      </div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt[0] h-[50vh] w-[50vh] z-10">
        <Image
          src={data?.layout?.banner?.image?.url || '/images/banner.png'}
          width={400}
          height={400}
          alt=""
          className="object-contain w-[100%] h-[auto] 1000px:max-w-[100%]  1500px:max-w-[100%] z-[10] ml-[80px] "
        />
      </div>
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] text-[20px] px-3 w-full 1000px:text-[70px] font-[500] font-Josefin py-2 2000px:leading-[70px] 2000px:w-[70px] ">
          {data?.layout?.banner?.title || 'Welcome To Our Online Learning Platform'}
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
          {data?.layout?.banner?.subTitle|| 'We provide online courses for you to learn new skills and be successful in your career'}
        </p>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) =>setSearch(e.target.value)}
            className="bg-transparent border dark:border-none  dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
          onClick={handleSearch}>
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
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
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
            500K+ People Already Trust Us.{' '}
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson] "
            >
              View Courses
            </Link>{' '}
          </p>
        </div>
        <br />
      </div>
    </div>
    )}
    </>
  );
};

export default Hero;
