/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState<any[]>([]);
  const { data: session } = useSession();

  // Fetch user's courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Make a direct API call to get user courses
        const response = await fetch("/api/courses/user");
        const data = await response.json();

        if (data.success) {
          setCourses(data.courses || []);
        }
      } catch (error) {
        console.error("Error fetching user courses:", error);
        toast.error("Failed to load your courses");
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  /** Handle Logout Function */
  const logOutHandler = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error("Logout failed. Try again.");
    }
  };

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff02] border-[#00000000] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}

      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}

      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
            {courses.map((item: any, index: number) => (
              <CourseCard
                key={index}
                item={item}
                user={user}
                isProfile={true}
              />
            ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[15px] mt-10 font-Poppins">
              You don't have any purchased courses
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
