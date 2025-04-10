"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    setError(errorParam);
  }, [searchParams]);

  // Function to get a more user-friendly error message
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "Configuration":
        return "There's an issue with the authentication configuration. Please try again later.";
      case "AccessDenied":
        return "Access denied. You don't have permission to sign in.";
      case "Verification":
        return "The verification link is invalid or has expired.";
      case "OAuthSignin":
        return "An error occurred while signing in with the provider.";
      case "OAuthCallback":
        return "An error occurred while processing the authentication callback.";
      case "OAuthAccountNotLinked":
        return "This email is already associated with another account.";
      default:
        return "An error occurred during the authentication process.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
      <div className="max-w-md w-full p-8 bg-card/50 rounded-lg shadow-lg backdrop-blur-sm border border-primary/10">
        <h1 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
          Authentication Error
        </h1>

        <div className="bg-muted/50 p-4 rounded-md mb-6">
          <p className="text-muted-foreground text-center">
            {error && getErrorMessage(error)}
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button asChild>
            <Link href="/">Return to Home Page</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/auth/signin">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
