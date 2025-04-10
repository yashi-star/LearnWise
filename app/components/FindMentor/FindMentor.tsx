"use client";
import SideBar from './SideBar'
import MentorDetails from "./MentorDetails";
import Header from "./Header";
export default function MentorshipPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row p-4">
        <SideBar />
        <MentorDetails />
      </div>
</>
  );
}
