"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, Users, Home } from "lucide-react";
import { useState } from "react";
import VAPIModal from "@/app/components/VAPIModal";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Courses",
    icon: BookOpen,
    href: "/dashboard/courses",
    color: "text-violet-500",
  },
  {
    label: "Mentors",
    icon: Users,
    href: "/dashboard/mentors",
    color: "text-pink-700",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isVAPIModalOpen, setIsVAPIModalOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 h-screen w-64 flex flex-col bg-[#0f0e14] text-white shadow-lg">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-6 pt-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            LearnWise
          </h1>
        </Link>

        {/* AI Learning Assistant Button */}
        <div className="px-3 mb-8">
          <button
            onClick={() => setIsVAPIModalOpen(true)}
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Learning Assistant
            </span>
          </button>
        </div>

        <div className="space-y-2">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200",
                pathname === route.href
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:text-white"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* VAPI Modal */}
      <VAPIModal
        isOpen={isVAPIModalOpen}
        onClose={() => setIsVAPIModalOpen(false)}
      />
    </div>
  );
};
