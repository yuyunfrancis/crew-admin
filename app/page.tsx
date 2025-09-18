"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
