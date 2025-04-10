import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    // Get user with courses
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        purchases: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Extract courses from purchases
    const courses = user.purchases.map(purchase => purchase.course);

    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("[USER_COURSES_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user courses",
      },
      { status: 500 }
    );
  }
}
