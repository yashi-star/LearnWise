'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FindMentor from '@/app/components/FindMentor/FindMentor';

const Page: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [route, setRoute] = useState<string>('');
  return (
    <>
        <Heading
        title="About-LearnWise"
        description='Learnwise is a platform for students and mentors to grow together'
        keywords="Programming,Mern,Projects,Research"
        />
        <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        setRoute={setRoute}
        route={route}
      />

        <FindMentor/>
        <Footer/>
        </>
  )
}

export default Page