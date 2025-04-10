/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { data: session } = useSession();

  if (session?.user) {
    const isAdmin = session.user.role === "admin";
    return isAdmin ? children : redirect("/");
  }

  return redirect("/auth/signin");
}
