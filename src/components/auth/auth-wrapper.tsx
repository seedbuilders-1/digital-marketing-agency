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

  const getBackgroundImage = () => {
    switch (pathname) {
      case "/signup":
        return ASSETS.BACKGROUND_IMAGE;
      case "/forgot-password":
        return ASSETS.FORGOT_PASSWORD_BACKGROUND;
      case "/verify-otp":
        return ASSETS.VERIFY_OTP_BACKGROUND;
      default:
        return ASSETS.BACKGROUND_IMAGE;
    }
  };

  return (
    <div className="flex min-h-screen font-['Sora'] w-full">
      {/* Form Section - Left Side - Scrollable */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative z-10 overflow-y-auto">
        <div className="w-full max-w-md mx-auto p-8 lg:p-12 min-h-screen flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Image Section - Right Side - Fixed */}
      <div className="hidden lg:block lg:w-1/2 fixed right-0 top-0 h-screen">
        <AuthImageSection backgroundImage={getBackgroundImage()} />
      </div>

      {/* Mobile: Image as fixed background */}
      <div className="lg:hidden fixed inset-0 z-0">
        <AuthImageSection backgroundImage={getBackgroundImage()} />
      </div>
    </div>
  );
}
