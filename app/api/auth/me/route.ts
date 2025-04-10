import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get the session with user data
    const session = await auth();

    // If no session or user, return unauthorized
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the user data from the database
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    // If no user found, return an error
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Return the user and a fresh access token
    return NextResponse.json({
      user,
      accessToken: session.user.accessToken || "dummy-token",
    });
  } catch (error) {
    console.error("[ME_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
