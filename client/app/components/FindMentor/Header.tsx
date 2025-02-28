"use client";

import React from "react";
import { ChevronDown, Filter, Star, Zap, Tag } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full p-4 shadow-md mb-4 flex items-center justify-between">
     
      {/* Filters & Actions */}
      <div className="flex items-center space-x-3">
        {/* Dropdown Button */}
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full">
          Mentorship <ChevronDown className="ml-2 w-4 h-4" />
        </button>

        {/* Sort & Filters */}
        <button className="flex items-center px-3 py-2 border rounded-full text-gray-700">
          Sort By <ChevronDown className="ml-2 w-4 h-4" />
        </button>

        <button className="flex items-center px-3 py-2 border rounded-full text-gray-700">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </button>

        <button className="flex items-center px-3 py-2 border rounded-full text-gray-700">
          Skills <ChevronDown className="ml-2 w-4 h-4" />
        </button>

        <button className="flex items-center px-3 py-2 border rounded-full text-gray-700">
          <Zap className="w-4 h-4 mr-2 text-blue-500" /> Availability
        </button>

        <button className="flex items-center px-3 py-2 border rounded-full text-yellow-500 border-yellow-500">
          <Star className="w-4 h-4 mr-2" /> Top Mentors
        </button>

        <button className="flex items-center px-3 py-2 border rounded-full text-gray-700">
          <Tag className="w-4 h-4 mr-2" /> Free Services
        </button>

        {/* Mentor Match Button */}
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full">
          Mentor Match
        </button>
      </div>
    </header>
  );
}
