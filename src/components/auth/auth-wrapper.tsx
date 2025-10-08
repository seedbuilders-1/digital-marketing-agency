"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import AuthImageSection from "@/components/auth/auth-image-section";
import { ASSETS } from "@/lib/constants/auth";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // This function remains the same
  const getBackgroundImage = () => {
    switch (pathname) {
      case "/signup":
        return ASSETS.BACKGROUND_IMAGE;
      case "/forgot-password":
        return ASSETS.FORGOT_PASSWORD_BACKGROUND;
      case "/verify-otp":
        return ASSETS.VERIFY_OTP_BACKGROUND;
      case "/complete-profile":
        return ASSETS.COMPLETE_PROFILE_BACKGROUND;
      case "/organization-profile":
        return ASSETS.BACKGROUND_IMAGE;
      case "/contact-person-profile":
        return ASSETS.CONTACT_PERSON_PROFILE_BACKGROUND;
      default:
        return ASSETS.BACKGROUND_IMAGE;
    }
  };

  return (
    <div className="flex min-h-screen w-full font-['Sora']">
      {/* Form Section - Left Side */}
      {/* 
        This section now takes up the full width on mobile and 50% on large screens.
        The child component will control its own internal max-width and padding.
        `justify-start` ensures content aligns to the top.
      */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-start items-center p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-lg">
          {" "}
          {/* Allow child to be wider */}
          {children}
        </div>
      </div>

      {/* Image Section - Right Side */}
      {/* 
        This section is hidden on mobile and appears on large screens.
        No need for a separate mobile background div, which simplifies the code
        and fixes the "form disappearing" issue.
      */}
      <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0">
        <AuthImageSection backgroundImage={getBackgroundImage()} />
      </div>
    </div>
  );
}
