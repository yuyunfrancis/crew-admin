"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = getAuthToken();

      if (!token) {
        // No token found, redirect to login
        router.push("/login");
      } else {
        // Token exists, allow access (backend will validate)
        setIsChecking(false);
      }
    };

    checkToken();
  }, [router]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show protected content
  return <>{children}</>;
}
