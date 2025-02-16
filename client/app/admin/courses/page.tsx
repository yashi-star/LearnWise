'use client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '../../utils/Heading'
import React from 'react'
import AllCourses from '../../components/Admin/Course/AllCourses'

const page = () => {
  return (
    <div>
       <AdminProtected>
       <Heading
        title="LearnWise -Admin"
        description="LearnWise is a platform fror students and mentors to grow together"
        keywords="Programming,Mern,Projects, Research,Lachine Learning"
        />
        <div className='flex h-screen'>
            <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
              <DashboardHero/>
              <AllCourses/>
            </div>
            </div>
       </AdminProtected>
        </div>
  )
}

export default page;