'use-client'
import React from 'react'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '../../utils/Heading'
import EditFaq from '@/app/components/Admin/Customization/EditFaq'
import AdminProtected from '@/app/hooks/adminProtected'
import DashboardHero from '@/app/components/Admin/DashboardHero'


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
                <EditFaq />
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default page;