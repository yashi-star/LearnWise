/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import axios from "axios";

type Props = {
  isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([
    { name: "Jan", count: 4000 },
    { name: "Feb", count: 3000 },
    { name: "Mar", count: 5000 },
    { name: "Apr", count: 4000 },
    { name: "May", count: 3000 },
    { name: "Jun", count: 2000 },
    { name: "Jul", count: 4000 },
    { name: "Aug", count: 3000 },
    { name: "Sep", count: 5000 },
    { name: "Oct", count: 7000 },
    { name: "Nov", count: 6000 },
    { name: "Dec", count: 8000 },
  ]);

  // Uncomment and modify this when you have the API endpoint ready
  // useEffect(() => {
  //   const fetchOrdersAnalytics = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get('/api/analytics/orders');
  //       const data = response.data;
  //
  //       const formattedData = data.orders.last12Months.map((item: any) => ({
  //         name: item.name,
  //         count: item.count
  //       }));
  //
  //       setAnalyticsData(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching orders analytics:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   fetchOrdersAnalytics();
  // }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[300px] " : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data {""}{" "}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
