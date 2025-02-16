'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header';
import About from './About'
import Footer from '../components/Footer';

const Page: React.FC = () => {
    const [open,setOpen]=useState(false);
    const [activeItem]=useState(2);
    const [route,setRoute]=useState("Login");
  return (
    <div>
        <Heading
        title="About-LearnWise"
        description='Learnwise is a platform for students and mentors to grow together'
        keywords="Programming,Mern,Projects,Research"
        />

        <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
        />
        <About/>
        <Footer/>
    </div>
  )
}

export default Page