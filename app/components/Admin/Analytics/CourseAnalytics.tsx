/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Label,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import axios from "axios";

const CourseAnalytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([
    { name: "JAN", uv: 3 },
    { name: "FEB", uv: 2 },
    { name: "MAR", uv: 5 },
    { name: "APR", uv: 7 },
    { name: "MAY", uv: 2 },
    { name: "JUN", uv: 5 },
    { name: "JUL", uv: 7 },
    { name: "AUG", uv: 3 },
    { name: "SEP", uv: 2 },
    { name: "OCT", uv: 5 },
    { name: "NOV", uv: 7 },
    { name: "DEC", uv: 4 },
  ]);

  // Uncomment and modify this when you have the API endpoint ready
  // useEffect(() => {
  //   const fetchCourseAnalytics = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get('/api/analytics/courses');
  //       const data = response.data;
  //
  //       if (data?.courses?.last12Months) {
  //         const formattedData = data.courses.last12Months.map((item: any) => ({
  //           name: item.month,
  //           uv: item.count
  //         }));
  //         setAnalyticsData(formattedData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching course analytics:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   fetchCourseAnalytics();
  // }, []);

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Course Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data{""}
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label value="Month" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
