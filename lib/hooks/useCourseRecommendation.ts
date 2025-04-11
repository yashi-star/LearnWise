import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRecommendationStore } from "../store/recommendationStore";

/**
 * Custom hook that initializes the recommendation store from cookies on page load
 */
export const useCourseRecommendation = () => {
  const { recommendedCourseId, setRecommendedCourseId } =
    useRecommendationStore();

  // On mount, check if there's a recommendation in cookies
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieValue = Cookies.get("recommendedCourseId");

      // If we have a cookie value but store is empty, initialize from cookie
      if (cookieValue && !recommendedCourseId) {
        setRecommendedCourseId(cookieValue);
      }
    }
  }, [recommendedCourseId, setRecommendedCourseId]);

  return { recommendedCourseId, setRecommendedCourseId };
};
