/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSession } from "next-auth/react";

export default function useUserAuth() {
  const { data: session } = useSession();

  // Check for user in session
  if (session?.user) {
    return true;
  }

  // If no session, not authenticated
  return false;
}
