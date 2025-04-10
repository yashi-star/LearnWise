/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCourseContentQuery } from "@/app/redux-placeholder";
import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
import axios from "axios";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const { data: contentData, isLoading } = useGetCourseContentQuery();
  const [loading, setLoading] = useState(true);
  const [courseContent, setCourseContent] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/courses/${id}/content`);
        setCourseContent(response.data.content);
      } catch (error) {
        console.error("Failed to fetch course content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [id]);

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/courses/${id}/content`);
      setCourseContent(response.data.content);
    } finally {
      setLoading(false);
    }
  };

  // Use the actual data if available, otherwise fall back to placeholder
  const data = courseContent || contentData?.content || [];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                user={user}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
