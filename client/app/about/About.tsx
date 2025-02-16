'use client'
import React from 'react'
import { styles } from '../styles/style'

const About = () => {
    return (
    <div className='text-black dark:text-white'>
        <br/>
        <h1 className={`${styles.title} 800px:!text-[45px]`}>
            What is <span className='text-gradient'>LearnWise ?</span></h1>
        <br/>
        <div className='w-[95%] 800px:w-[85%] m-auto'>
            <p className='text-[18px] font-Poppins'>
                Are You Ready to take your programming skills to the next level? 
                Look no further than LearnWise, the premier programming community
                 dedicated to helping students to get their perfect mentor 
                to guide the and achieve goals to reach their full potential.
            <br/>
            <br/>
                Are You Ready to take your programming skills to the next level? 
                Look no further than LearnWise, the premier programming community dedicated 
                to helping students to get their perfect mentor 
                to guide the and achieve goals to reach their full potential.
            <br/>
            <br/>
                Are You Ready to take your programming skills to the next level? 
                Look no further than LearnWise, the premier programming community dedicated 
                to helping students to get their perfect mentor 
                to guide the and achieve goals to reach their full potential.
            <br/>
            <br/>
            </p>
            <br/>
            <span className=' text-[22px]'>Yashi,Arjun,Anusha</span>
           <h5 className='text-[18px] font-Poppins'>
            Founder of LearnWise
           </h5>
           <br/>
           <br/>
           <br/>
        </div>
        </div>
  )
};

export default About;