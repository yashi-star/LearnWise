/* eslint-disable @typescript-eslint/no-explicit-any */
'use-client'
import React from 'react'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '../../../utils/Heading'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import EditCourse from '@/app/components/Admin/Course/EditCourse'



const page = ({params}:any) => {
    const id=params?.id
  return (
    <div>
        <Heading
        title="LearnWise-Admin"
        description='Learnwise is a platform for students and mentors to grow together'
        keywords="Programming,Mern,Projects,Research"
        />
        <div className='flex'>
            <div className='1500px:w-[16%]] w-1/5'>
            <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
                <DashboardHeader/>
                <EditCourse id={id} />
            </div>
        </div>
    </div>
  )
}

export default page;