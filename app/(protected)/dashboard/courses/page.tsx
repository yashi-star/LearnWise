"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link"; // Import Link
import { Sidebar } from "@/app/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star, User, Search, Filter, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courses, popularSearches, trendingSearches } from "@/lib/data"; // Import data

type LevelFilterKey = 'beginner' | 'intermediate' | 'advanced';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilters, setLevelFilters] = useState({
    beginner: false,
    intermediate: false,
    advanced: false
  });
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // Function to handle level filter changes
  const handleLevelFilterChange = (level: LevelFilterKey) => {
    setLevelFilters(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter courses based on search query and level filters
  const filteredCourses = courses.filter(course => {
    // Search query filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Level filter
    const noLevelFiltersActive = !levelFilters.beginner && !levelFilters.intermediate && !levelFilters.advanced;
    const matchesLevel = noLevelFiltersActive || 
                         (levelFilters.beginner && course.level === "Beginner") ||
                         (levelFilters.intermediate && course.level === "Intermediate") ||
                         (levelFilters.advanced && course.level === "Advanced");
    
    return matchesSearch && matchesLevel;
  });

  // Helper to render star ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-4 w-4 text-yellow-500 fill-current" />)}
        {halfStar && <Star key="half" className="h-4 w-4 text-yellow-500 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />} 
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 fill-current" />)}
      </>
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1" ref={searchContainerRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search for anything" 
                  className="pl-12 py-6 pr-10 w-full rounded-full border-purple-300 focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchSuggestions(false);
                    }}
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                  {/* Popular Searches */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular on LearnWise</h3>
                    <div className="space-y-2">
                      {popularSearches.map((term, index) => (
                        <div 
                          key={index} 
                          className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          onClick={() => {
                            setSearchQuery(term);
                            setShowSearchSuggestions(false);
                          }}
                        >
                          <Search className="h-4 w-4 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-700">{term}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Trending Searches */}
                  <div className="border-t border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Trending searches</h3>
                    <div className="space-y-2">
                      {trendingSearches.map((term, index) => (
                        <div 
                          key={index} 
                          className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          onClick={() => {
                            setSearchQuery(term);
                            setShowSearchSuggestions(false);
                          }}
                        >
                          <TrendingUp className="h-4 w-4 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-700">{term}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 h-12 px-6">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Level</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={levelFilters.beginner}
                  onCheckedChange={() => handleLevelFilterChange('beginner')}
                >
                  Beginner
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={levelFilters.intermediate}
                  onCheckedChange={() => handleLevelFilterChange('intermediate')}
                >
                  Intermediate
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={levelFilters.advanced}
                  onCheckedChange={() => handleLevelFilterChange('advanced')}
                >
                  Advanced
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            {filteredCourses.length === 0 ? (
              "No courses match your search criteria. Try adjusting your filters."
            ) : (
              `Showing ${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''}`
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/dashboard/courses/${course.id}`} className="flex flex-col group rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="relative w-full aspect-video overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-md leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 line-clamp-1">{course.instructor}</p>
                <div className="flex items-center mb-1">
                  <span className="text-sm font-semibold text-yellow-600 mr-1">{course.rating.toFixed(1)}</span>
                  <div className="flex mr-1">{renderStars(course.rating)}</div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({course.enrolled.toLocaleString()})</span>
                </div>
                <div className="flex items-baseline mb-2">
                  <span className="font-semibold text-md mr-2">₹{course.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                </div>
                {course.isBestseller && (
                  <Badge variant="default" className="bg-yellow-200 text-yellow-800 hover:bg-yellow-200 px-2 py-0.5 w-fit text-xs mb-2">Bestseller</Badge>
                )}
                <div className="mt-auto pt-2"> {/* Enroll button container */}
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full"
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 