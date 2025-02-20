"use client";
import Image from "next/image";
import { JSX } from "react";
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
  return (
    <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Top Mentors</h2>
      {mentors.map((mentor, index) => (
        <div key={index} className="flex items-center gap-4 p-3 border-b">
          {/* Mentor Image */}
          <Image
            src="/images/client2.jpg"
            alt={mentor.name}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          
          {/* Mentor Details */}
          <div>
            <h3 className="font-semibold text-lg">{mentor.name}</h3>
            <p className="text-sm text-gray-600">
              {mentor.experience} of experience
            </p>
            <p className="text-sm text-gray-500">{mentor.profession}</p>
            <p className="text-sm text-yellow-500 flex items-center">
              <FaStar className="mr-1" /> {mentor.rating}{" "}
              <span className="ml-2 text-gray-500">
                ({mentor.reviews} Reviews)
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default SideBar;