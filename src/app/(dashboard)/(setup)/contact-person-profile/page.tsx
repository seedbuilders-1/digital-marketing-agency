"use client";

import ContactPersonProfileForm from "@/components/profile/contact-person-profile-form";
import { Suspense } from "react";

export default function ContactPersonProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      }
    >
      {/* 
        The parent AuthWrapper handles the page layout.
        This component now only renders its own content.
      */}
      <div className="w-full">
        {/* Progress Bars */}
        <div className="flex gap-2 w-full max-w-[400px] mb-8">
          <div className="h-1 flex-1 rounded-sm bg-[#7642FE]" />
          <div className="h-1 flex-1 rounded-sm bg-[#7642FE]" />
        </div>
        <ContactPersonProfileForm />
      </div>
    </Suspense>
  );
}
