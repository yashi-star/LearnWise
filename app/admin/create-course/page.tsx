'use client'
import React from 'react'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '../../utils/Heading';
import CreateCourse from '../../components/Admin/Course/CreateCourse'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'

const page = () => {
  return (
    <div>
        <Heading
        title="LearnWise-Admin"
        description='Learnwise is a platform for students and mentors to grow together'
        keywords="Programming,Mern,Projects,Research"
        />
        <div className='flex h-[200vh]'>
            <div className='1500px:w-[16%]] w-1/5'>
            <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
                <DashboardHeader/>
                <CreateCourse/>
            </div>
        </div>
    </div>
  )
}

export default page;