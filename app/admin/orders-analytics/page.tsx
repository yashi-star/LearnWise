"use-client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../utils/Heading";
import OrdersAnalytics from "../../components/Admin/Analytics/OrdersAnalytics";
import DashboardHeader from "../../components/Admin/DashboardHeader";

const page = () => {
  return (
    <div>
      <Heading
        title="LearnWise-Admin"
        description="Learnwise is a platform for students and mentors to grow together"
        keywords="Programming,Mern,Projects,Research"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%]] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <OrdersAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
