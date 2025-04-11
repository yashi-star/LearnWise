"use server";

import { cookies } from "next/headers";

export async function getRecommendedCourseId() {
  const cookieStore = await cookies();
  return cookieStore.get("recommendedCourseId")?.value;
}
