'use-client'
import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar"
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import UserAnalytics from '@/app/components/Admin/Analytics/UserAnalytics'

const page = () => {
  return (
    <div>
       <Heading
        title="LearnWise -Admin"
        description="LearnWise is a platform fror students and mentors to grow together"
        keywords="Programming,Mern,Projects, Research,Lachine Learning"
        />
        <div className='flex'>
            <div className='1500px:w-[16%]w-1/5'>
            <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
              <DashboardHeader/>
              <UserAnalytics/>
            </div>
            </div>
        </div>
  )
}

export default page;
