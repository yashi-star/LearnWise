// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import React, { useEffect }  from 'react'
// import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
// import CourseContent from '../../components/Course/CourseContent'
// import Loader from '@/app/components/Loader/Loader'
// import { redirect } from 'next/navigation'
// type Props = {
//     params:any;
// }

// const Page = ({params}: Props) => {

//     const id=params.id;

//     const {isLoading,error,data}=useLoadUserQuery(undefined,{});

//     useEffect(()=>{
//         if(data){
//             const isPurchased=data.user.courses.find((item:any) => item._id ===id);
//             if(!isPurchased || error){
//                 redirect("/");
//             }
//         }
//     },[data,error,id]);


//   return (
//    <>
//    {isLoading? (
//     <Loader/>
//    ):(
//     <div>
//         <CourseContent id={id} user={data.user} />
//     </div>
//    )}
//    </>
//   )
// }

// export default Page

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect } from 'react'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import CourseContent from '../../components/Course/CourseContent'
import Loader from '@/app/components/Loader/Loader'
import { redirect } from 'next/navigation'
import { use } from 'react'

type Props = {
    params: Promise<{ id: string }>;
}

const Page = ({ params }: Props) => {
    const { id } = use(params); // Unwrap params

    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (data) {
            const isPurchased = data?.user?.courses?.find((item: any) => item._id === id);
            if (!isPurchased || error) {
                redirect("/");
            }
        }
    }, [data, error, id]);

    if (isLoading) return <Loader />;

    if (!data?.user) return null; // Prevents `Cannot read properties of undefined`

    return (
        <div>
            <CourseContent id={id} user={data.user} />
        </div>
    );
}

export default Page;
