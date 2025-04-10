// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import React from 'react'
// import CourseDetailsPage from '../../components/Course/CourseDetailsPage';

// const Page = ({params}:any) => {
//   console.log("Params:", params);
//   return (
//     <div>
//       <CourseDetailsPage id={params.id}/>
//     </div>
//   )
// }

// export default Page;
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { useParams } from 'next/navigation';
import CourseDetailsPage from '../../components/Course/CourseDetailsPage';

const Page = () => {
  const params = useParams(); // ✅ Extract params properly

  if (params) {
    console.log("Params:", params.id);
  } else {
    console.log("Params are null");
  }

  return (
    <div>
      {params && <CourseDetailsPage id={Array.isArray(params.id) ? params.id[0] : params.id} />}
    </div>
  );
}

export default Page;
