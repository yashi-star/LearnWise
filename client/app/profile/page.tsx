/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React,{FC, useState} from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
type Props = object

const Page:FC<Props>= () =>{
    const [open,setOpen] = useState(false);
    const [activeItem]=useState(5);
    const [route,setRoute] = useState("Login")
    const {user} =useSelector((state:any) => state.auth);
    return (
        <div className="min-h-screen">
        <Protected >
        <Heading
        title={`${user?.name} profile = LearnWise`}
        description="LearnWise Is A Smart Platform To Pair Learners With Their Mentors and Help Each Other Grow"
        keywords="Programming,MERN,Redux,Machine Learning,AI,Devops,Cloud Computing, Cybersecurity"
      />

      <Header 
      open={open} 
      setOpen={setOpen} 
      activeItem={activeItem} 
      setRoute={setRoute}
      route={route}
      />
      <Profile user={user} />
      <Footer/>
        </Protected>
         </div>
    )
}

export default Page;