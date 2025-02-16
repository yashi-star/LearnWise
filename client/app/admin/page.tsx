'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar"
import AdminProtected from '../hooks/adminProtected'
import DashboardHero from '../components/Admin/DashboardHero'

const page = () => {
  return (
    <div>
       <AdminProtected>
       <Heading
        title="LearnWise -Admin"
        description="LearnWise is a platform fror students and mentors to grow together"
        keywords="Programming,Mern,Projects, Research,Lachine Learning"
        />
         <div className='flex h-[200vh]'>
            <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
              <DashboardHero isDashboard={true}/>
            </div>
            </div>
       </AdminProtected>
        </div>
  )
}

export default page;
