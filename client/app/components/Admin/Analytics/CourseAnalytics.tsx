/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    Label,
    YAxis,
    LabelList,
    ResponsiveContainer,
} from 'recharts';
import Loader from '../../Loader/Loader'
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '@/app/styles/style';



const CourseAnalytics = () => {
    const {data,isLoading} =useGetCoursesAnalyticsQuery({});

    const analyticsData = [
        { name: 'AUGUST 2024', uv: 3 },
        { name: 'SEPTEMBER 2024', uv: 2 },
        { name: 'OCTOBER 2024', uv: 5 },
        { name: 'NOVEMBER 2024', uv: 7 },
        { name: 'DECEMBER 2024', uv: 2 },
        { name: 'JANUARY 2025', uv: 5 },
        { name: 'FEBURARY 2025', uv: 7 },
    ];
    

    // const analyticsData: { name: string; uv: number }[] = [];
    // data?.courses?.last12Months?.forEach((item: { month: string; count: number }) => {
    //     analyticsData.push({ name: item.month, uv: item.count });
    // });

    
    const minValue=0;

  return (
    <>
    {
        isLoading?(
            <Loader/>
        ):(
            <div className='h-screen'>
                <div className='mt-[50px]'>
                    <h1 className={`${styles.title} px-5 !text-start`}>
                        CourseAnalytics
                    </h1>
                    <p className={`${styles.label} px-5`}>
                        Last 3 months analytics data{''}
                        </p>
                </div>

                <div className='w-full h-[90%] flex items-center justify-center'>
                    <ResponsiveContainer width='90%' height='50%'>
                        <BarChart width={150} height={300} data={analyticsData}>
                            <XAxis dataKey='name'>
                                <Label value="Month" offset={0} position='insideBottom'/>
                            </XAxis>
                            <YAxis domain={[minValue,'auto']}/>
                            <Bar dataKey='uv' fill='#3faf82'>
                                <LabelList dataKey='uv' position='top'/>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}
        </>
  )
}


export default CourseAnalytics;