"use client";

import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, MessageCircle, Search, Filter, X, TrendingUp, Sparkles, Trophy, Radio } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mentors, mentorSpecializations } from "@/lib/data";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specializationFilters, setSpecializationFilters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialFilters: Record<string, boolean> = {};
    mentorSpecializations.forEach(spec => {
      initialFilters[spec] = false;
    });
    setSpecializationFilters(initialFilters);
  }, []);

  const handleSpecializationFilterChange = (spec: string) => {
    setSpecializationFilters(prev => ({
      ...prev,
      [spec]: !prev[spec]
    }));
  };

  const filteredMentors = mentors.filter(mentor => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = 
      mentor.name.toLowerCase().includes(lowerSearchQuery) ||
      mentor.role.toLowerCase().includes(lowerSearchQuery) ||
      mentor.specialization.toLowerCase().includes(lowerSearchQuery) ||
      mentor.about.toLowerCase().includes(lowerSearchQuery);

    const activeFilters = Object.entries(specializationFilters)
                             .filter(([_, isChecked]) => isChecked)
                             .map(([spec]) => spec);
                             
    const noFiltersActive = activeFilters.length === 0;
    const matchesSpecialization = noFiltersActive || activeFilters.includes(mentor.specialization);

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Top Mentors</h1>
            <p className="text-gray-500 dark:text-gray-400">In search of excellence? Explore the highest-rated mentors as recognized by the learner community.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search mentors by name, role, or specialization..." 
              className="pl-12 py-3 pr-10 w-full rounded-md border-gray-300 focus:border-primary h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 h-12 px-6">
                <Filter className="h-4 w-4" />
                Filter by Specialization
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
              <DropdownMenuLabel>Filter by Specialization</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mentorSpecializations.map((spec) => (
                <DropdownMenuCheckboxItem
                  key={spec}
                  checked={specializationFilters[spec] || false}
                  onCheckedChange={() => handleSpecializationFilterChange(spec)}
                >
                  {spec}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {filteredMentors.length === 0 ? (
            "No mentors match your search criteria. Try adjusting your filters."
          ) : (
            `Showing ${filteredMentors.length} mentor${filteredMentors.length !== 1 ? 's' : ''}`
          )}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMentors.map((mentor, index) => (
            <div 
              key={mentor.id} 
              className={cn(
                "rounded-2xl border border-violet-800 bg-gradient-to-br from-violet-900 to-purple-900 p-4 flex flex-col items-center text-center transition-shadow hover:shadow-lg relative overflow-hidden"
              )}
            >
              <div className="absolute top-0 left-0 w-full h-20 opacity-10 overflow-hidden">
                <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="absolute left-0 w-full h-full text-violet-400">
                  <path d="M0,40 Q125,80 250,40 T500,40 L500,80 L0,80 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm p-1.5 rounded-full">
                <Trophy size={16} className="text-purple-300 opacity-90" />
              </div>

              {mentor.isAvailable && (
                <Badge variant="default" className="absolute top-3 left-3 bg-green-500/90 text-white gap-1.5 text-xs px-2.5 py-1 rounded-full border border-green-300/50">
                  <Radio size={12} /> Available
                </Badge>
              )}
              
              <Avatar className="h-24 w-24 border-4 border-white/80 shadow-md mt-8 mb-4 z-10">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
              </Avatar>

              <h3 className="font-semibold text-lg mb-0.5 text-white">{mentor.name}</h3>
              <div className="flex items-center justify-center text-sm text-yellow-400 mb-2">
                 <Star size={16} className="mr-1 fill-current"/>
                 <span>{mentor.rating.toFixed(1)}</span>
              </div>
              <p className="text-xs text-purple-200/80 line-clamp-2 mb-4 h-8">
                 {mentor.role} | {mentor.specialization}
              </p>

              <Button 
                variant="outline"
                className="mt-auto rounded-full bg-white/90 hover:bg-white text-purple-900 border-transparent w-full sm:w-auto px-8 shadow-sm font-semibold"
              >
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 