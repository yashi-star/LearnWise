/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import Protected from "../components/Protected";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { data: session } = useSession();

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${session?.user?.name || "User"} Profile - LearnWise`}
          description="LearnWise Is A Smart Platform To Pair Learners With Their Mentors and Help Each Other Grow"
          keywords="Programming,MERN,Redux,Machine Learning,AI,Devops,Cloud Computing, Cybersecurity"
        />

        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />

        <Profile user={session?.user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
