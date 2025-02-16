'use-client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '../../utils/Heading'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import React from 'react'


const page = () => {
  return (
    <div>
        <AdminProtected>
        <Heading
        title="LearnWise-Admin"
        description='Learnwise is a platform for students and mentors to grow together'
        keywords="Programming,Mern,Projects,Research"
        />
        <div className='flex h-screen'>
            <div className='1500px:w-[16%]] w-1/5'>
            <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
                <DashboardHero/>
                <AllUsers isTeam={true}/>
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default page;
