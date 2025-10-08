"use client";

import CompleteProfileForm from "@/components/auth/complete-profile-form";
import { Suspense } from "react";

export default function CompleteProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      }
    >
      {/* 
        The parent AuthWrapper will handle the page layout, centering, and padding.
        This component only needs to render the form itself.
      */}
      <div className="w-full">
        {/* You could add a title or progress bar here if needed */}
        <h2 className="text-2xl font-bold mb-1 text-gray-900">
          Complete Your Profile
        </h2>
        <p className="text-gray-600 mb-6">
          Fill in the details below to get started.
        </p>
        <CompleteProfileForm />
      </div>
    </Suspense>
  );
}
