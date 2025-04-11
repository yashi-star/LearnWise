import { findMatchingCourses } from "../../../../lib/courseMapping";
import { cookies } from "next/headers";
import { courses } from "../../../../lib/data";

// Comment out the Gemini imports since we're not using them anymore
// import { generateText } from "ai";
// import { google } from "@ai-sdk/google";

// Define a type for course data
interface CourseData {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  level?: string;
}

export async function POST(request: Request) {
  const { courseDescription, mentorDescription, professionalStatus } =
    await request.json();
  console.log(
    courseDescription,
    mentorDescription,
    professionalStatus,
    "courseDescription, mentorDescription, professionalStatus"
  );

  try {
    // Comment out Gemini API code and use our keyword matching instead
    /*
    // Convert courses to a format that works well in the prompt
    const coursesData = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      tags: (course as any).tags || [],
      level: (course as any).level || "Beginner",
    }));

    // Check for API key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Google Generative AI API key is missing. Set GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY in your environment variables.");
    }

    // Create a structured prompt for the Gemini model
    const { text: courseId } = await generateText({
      model: google("gemini-2.0-flash-001", { apiKey }),
      prompt: `Based on the user's input...`,
    });
    */

    // New implementation using keyword matching
    let searchQuery = courseDescription || "";

    // // Optionally include other factors in the search
    // if (mentorDescription) {
    //   searchQuery += " " + mentorDescription;
    // }

    // if (professionalStatus) {
    //   searchQuery += " " + professionalStatus;
    // }

    // Find matching courses based on the combined search query
    const matchingCourseIds = findMatchingCourses(searchQuery);

    // Get the best match or default to "no-match"
    const courseIdStr =
      matchingCourseIds.length > 0
        ? matchingCourseIds[0].toString()
        : "no-match";

    console.log("Course ID:", courseIdStr);

    // Set the cookie in the response
    const cookieStore = await cookies();
    cookieStore.set("recommendedCourseId", courseIdStr, {
      path: "/",
      maxAge: 86400, // 24 hours in seconds
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return Response.json(
      {
        success: true,
        courseId: courseIdStr,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error finding course recommendation:", error);
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate course recommendation",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const recommendedCourseId = cookieStore.get("recommendedCourseId");

    return Response.json(
      {
        success: true,
        data: { recommendedCourseId },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving cookie:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to retrieve recommendation",
      },
      { status: 500 }
    );
  }
}
