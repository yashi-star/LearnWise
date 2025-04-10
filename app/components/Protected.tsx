"use client";

import Loader from "./Loader/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      // No session, redirect to login
      router.push("/auth/signin");
    } else {
      // User is authenticated
      setIsAuthenticated(true);
    }
  }, [status, session, router]);

  if (status === "loading" || isAuthenticated === null) {
    return <Loader />;
  }

  return isAuthenticated ? <>{children}</> : null;
}
