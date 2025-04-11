import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { courses } from "../../../../lib/data";
import { cookies } from "next/headers";

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

  try {
    // Convert courses to a format that works well in the prompt
    const coursesData = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      tags: (course as any).tags || [],
      level: (course as any).level || "Beginner",
    }));

    // Create a structured prompt for the Gemini model
    const { text: courseId } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Based on the user's input, recommend the most appropriate course ID from our available courses.

User's Information:
- Looking to learn: ${courseDescription}
- Mentor preferences: ${mentorDescription || "No specific preferences"}
- Professional status: ${professionalStatus || "Not specified"}

Available Courses:
${JSON.stringify(coursesData, null, 2)}

Analyze the user's needs and match them with the most suitable course from our catalog.
Consider their learning goals, professional status, and any mentor preferences they shared.

IMPORTANT: Return ONLY the course ID as a string. Do not include any additional text, explanation, or formatting.
For example, just return: "course-123"

If no suitable course is found, return "no-match"
`,
    });

    // Return the course ID (or no-match)
    const trimmedCourseId = courseId.trim();

    // Set the cookie in the response using the correct API
    const cookieStore = await cookies();
    cookieStore.set("recommendedCourseId", trimmedCourseId, {
      path: "/",
      maxAge: 86400, // 24 hours in seconds
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return Response.json(
      {
        success: true,
        courseId: trimmedCourseId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating course recommendation:", error);
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
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
