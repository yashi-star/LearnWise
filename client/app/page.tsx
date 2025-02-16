/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React,{FC,useState} from 'react';
import Heading from '../app/utils/Heading';
import Header from './components/Header';
import Hero from "../app/components/Route/Hero"
import Courses from "./components/Route/Courses"
import Reviews from './components/Route/Reviews'
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer';
interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(0);
  const [route,setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="LearnWise"
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
      <Hero /> 
      <Courses />
      <Reviews />
      <FAQ />
      <Footer/>
    </div>
  );
};

export default Page;
