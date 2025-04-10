/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { styles } from "@/app/styles/style";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import axios from "axios";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([
    { name: "Jan", count: 230 },
    { name: "Feb", count: 470 },
    { name: "Mar", count: 540 },
    { name: "Apr", count: 580 },
    { name: "May", count: 690 },
    { name: "Jun", count: 800 },
    { name: "Jul", count: 980 },
    { name: "Aug", count: 1100 },
    { name: "Sep", count: 1200 },
    { name: "Oct", count: 1350 },
    { name: "Nov", count: 1500 },
    { name: "Dec", count: 1700 },
  ]);

  // Uncomment when API is ready
  // useEffect(() => {
  //   const fetchUserAnalytics = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get('/api/analytics/users');
  //       const data = response.data;
  //
  //       if (data?.users?.last12Months) {
  //         const formattedData = data.users.last12Months.map((item: any) => ({
  //           name: item.month,
  //           count: item.count
  //         }));
  //         setAnalyticsData(formattedData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user analytics:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   fetchUserAnalytics();
  // }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "text-[20px] "
              } px-5 !item-start`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{""}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
