/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import CourseDetailsPage from '../../components/Course/CourseDetailsPage';

const Page = ({params}:any) => {
  console.log("Params:", params);
  return (
    <div>
      <CourseDetailsPage id={params.id}/>
    </div>
  )
}

export default Page;
