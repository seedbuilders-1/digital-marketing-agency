"use client";

import CompleteProfileForm from "@/components/profile/complete-profile-form";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

// Since this isn't part of auth, we'll create a standalone layout
const CompleteProfileImageSection = () => {
  return (
    <div className="relative w-full h-full flex items-end justify-start overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url("/DMA-uploads/0589d284-827d-4b54-96dc-a6b830dded54.png")`,
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[rgba(0,16,59,0.9)] via-[rgba(0,16,59,0.7)] to-transparent z-[1]" />
      <div className="relative z-[2] text-white text-left p-8 max-w-[400px] w-full md:p-5 md:text-center lg:text-left">
        <div className="relative w-[200px] h-[60px] mb-2 md:w-[180px] md:mx-auto lg:mx-0">
          <Image
            src="/DMA-uploads/81f50eda-4cdd-4aa2-b217-a1a96ca6757f.png"
            alt="Digital Marketing Agency Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 180px, 200px"
          />
        </div>
        <div className="mb-4 p-0">
          <div className="flex items-center gap-3 mb-1 text-sm font-['Sora'] leading-[1.2] lg:justify-start md:justify-center">
            <Mail size={16} />
            <span>help@digitalmarketingng.com</span>
          </div>
          <div className="flex items-center gap-3 mb-0 text-sm font-['Sora'] leading-[1.2] lg:justify-start md:justify-center">
            <Phone size={16} />
            <span>+234 123 456 7890</span>
          </div>
        </div>
        {/* Social Icons would go here if needed */}
      </div>
    </div>
  );
};

export default function CompleteProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="flex min-h-screen font-['Sora'] w-full">
        {/* Form Section - Left Side - Scrollable */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative z-10 overflow-y-auto">
          <div className="w-full max-w-md mx-auto p-8 lg:p-12 min-h-screen flex items-center justify-center">
            <CompleteProfileForm />
          </div>
        </div>

        {/* Image Section - Right Side - Fixed */}
        <div className="hidden lg:block lg:w-1/2 fixed right-0 top-0 h-screen">
          <CompleteProfileImageSection />
        </div>

        {/* Mobile: Image as fixed background */}
        <div className="lg:hidden fixed inset-0 z-0">
          <CompleteProfileImageSection />
        </div>
      </div>
    </Suspense>
  );
}
