"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRecommendationStore } from "@/lib/store/recommendationStore";
import { useEffect } from "react";

export default function NoMatchPage() {
  const router = useRouter();
  const { clearRecommendedCourseId } = useRecommendationStore();

  // Clear the recommendation when this page is visited
  useEffect(() => {
    clearRecommendedCourseId();
  }, [clearRecommendedCourseId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-lg">
        <Image
          src="/no-match.svg"
          alt="No matching courses"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">No matching courses found</h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find a perfect match for your learning needs in our
          current catalog. However, we have many other great courses you might
          be interested in!
        </p>

        <button
          onClick={() => router.push("/dashboard/courses")}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200"
        >
          Explore All Courses
        </button>
      </div>
    </div>
  );
}
