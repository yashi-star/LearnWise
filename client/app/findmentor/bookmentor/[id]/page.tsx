"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Heading from '../../../utils/Heading'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt, FaClock, FaUserTie } from "react-icons/fa";

export default function BookMentor() {
  const { id } = useParams() as { id: string }; // Get mentor ID from URL
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const timeSlots = [
    "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
    "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
    "10:30 PM"
  ];

  return (
    <>
    <Heading
    title="About-LearnWise"
    description='Learnwise is a platform for students and mentors to grow together'
    keywords="Programming,Mern,Projects,Research"
    />
    <Header
    open={open}
    setOpen={setOpen}
    activeItem={2}
    setRoute={setRoute}
    route={route}
  />

    <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg mt-10 ">
      {/* Mentor Info */}
      <div className="flex items-center gap-4 mb-6">
        <FaUserTie className="text-4xl text-blue-600" />
        <div>
          <h1 className="text-xl font-bold text-blue-600">Level Up Your C.V Game!</h1>
          <p className="dark:text-white text-black">Book a session with Mentor ID: {id}</p>
          <p className="text-yellow-500 font-semibold">⭐ 4.9 Vedansh Dubey</p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="p-4 rounded-lg">
        <div className="flex items-center gap-2 dark:text-white text-black mb-2">
          <FaCalendarAlt />
          <p className="font-semibold bg-grey-500">Select Date</p>
        </div>
        <Calendar onChange={(value) => setDate(value as Date)} value={date} />
      </div>

      {/* Time Slot Selection */}
      <div className="mt-6">
        <div className="flex items-center gap-2 dark:text-white text-black mb-2">
          <FaClock />
          <p className="font-semibold">Select Time</p>
        </div>
        <div className="grid grid-cols-3 gap-3 ">
          {timeSlots.map((time) => (
            <button
              key={time}
              className="p-2 border rounded-lg bg-blue-50 hover:bg-blue-500 hover:text-black dark:hover:text-white transition"
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Continue
      </button>
    </div>
    <Footer/>
    </>
  );
}
