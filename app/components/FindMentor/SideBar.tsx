"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

// Mentor data extracted from the provided image
const mentors = [
  {
    name: "Yash Patel",
    rating: 4.8,
    experience: "4 years",
    profession: "Business and Management",
    reviews: 214,
    image: "/images/client2.jpg",
  },
  {
    name: "Disha Bafna",
    rating: 4.9,
    experience: "3 years",
    profession: "Business and Management",
    reviews: 50,
    image: "/images/client1.jpg",
  },
  {
    name: "Simran Kaur",
    rating: 4.7,
    experience: "2 years",
    profession: "Marketing & Strategy",
    reviews: 40,
    image: "/images/client3.jpg",
  },
  {
    name: "Palak Gupta",
    rating: 4.8,
    experience: "3 years",
    profession: "Finance & Accounting",
    reviews: 60,
    image: "/images/client1.jpg",
  },
  {
    name: "Rahul Mehta",
    rating: 4.6,
    experience: "5 years",
    profession: "Software Development",
    reviews: 150,
    image: "/images/client2.jpg",
  },
];

const SideBar = () => {
  const router = useRouter();

  return (
    <div className="w-full md:w-1/3  p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Top Mentors</h2>

      {/* Scrollable Mentor List */}
      <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            onClick={() => router.push(`/mentor/${mentor.name.replace(/\s+/g, "-").toLowerCase()}`)}
            className="flex items-center gap-4 p-3 border-b cursor-pointer transition-all duration-200 hover:bg-gray-200  dark:hover:bg-blue-600"
          >
            {/* Mentor Image */}
            <Image
              src={mentor.image}
              alt={mentor.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />

            {/* Mentor Details */}
            <div>
              <h3 className="font-semibold text-lg dark:text-white text-black">{mentor.name}</h3>
              <p className="text-sm dark:text-white text-black">{mentor.experience} of experience</p>
              <p className="text-sm dark:text-white text-black">{mentor.profession}</p>
              <p className="text-sm text-yellow-500 flex items-center">
                <FaStar className="mr-1" /> {mentor.rating}{" "}
                <span className="ml-2 dark:text-white text-black">({mentor.reviews} Reviews)</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
