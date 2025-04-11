import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface RecommendationState {
  recommendedCourseId: string | null;
  setRecommendedCourseId: (id: string | null) => void;
  clearRecommendedCourseId: () => void;
}

// Initialize the store with default values
export const useRecommendationStore = create<RecommendationState>()(
  persist(
    set => ({
      recommendedCourseId: null,
      setRecommendedCourseId: id => {
        // Also save to cookie when state is updated
        if (id) {
          Cookies.set("recommendedCourseId", id, { expires: 1 }); // Expires in 1 day
        } else {
          Cookies.remove("recommendedCourseId");
        }
        set({ recommendedCourseId: id });
      },
      clearRecommendedCourseId: () => {
        Cookies.remove("recommendedCourseId");
        set({ recommendedCourseId: null });
      },
    }),
    {
      name: "course-recommendation-storage",
    }
  )
);
