"use client";

import OrganizationProfileForm from "@/components/profile/organization-profile-form";
import { Phone } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

// Organization Profile Image Section
const OrganizationProfileImageSection = () => {
  return (
    <div
      className="w-full h-full relative flex flex-col"
      style={{
        backgroundImage: `url("/DMA-uploads/8deb37e4-5ae4-4872-992a-1c70885b9e34.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-1/2 left-0 right-0 bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent via-[rgba(30,58,138,0.7)] to-[rgba(30,58,138,0.7)]" />
      <div className="relative z-[2] mt-auto p-8 text-white md:p-5 md:text-center lg:text-left">
        <div className="relative w-[200px] h-[60px] mb-2 md:w-[180px] md:mx-auto lg:mx-0">
          <Image
            src="/DMA-uploads/81f50eda-4cdd-4aa2-b217-a1a96ca6757f.png"
            alt="DMA Digital Marketing Agency Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 180px, 200px"
          />
        </div>
        <div className="text-white font-normal text-sm font-['Sora'] mb-1 md:text-center lg:text-left">
          help@digitalmarketingng.com
        </div>
        <div className="flex items-center gap-3 text-sm font-['Sora'] text-white mb-4 md:justify-center lg:justify-start">
          <Phone size={16} />
          +234 123 456 7890
        </div>
        {/* Social Icons would go here if needed */}
      </div>
    </div>
  );
};

export default function OrganizationProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="flex min-h-screen font-['Sora']">
        {/* Form Section - Left Side - Scrollable */}
        <div className="flex-[0_0_50%] bg-white p-10 flex items-start justify-start overflow-y-auto max-h-screen lg:p-8 md:p-5 md:flex-1 md:order-1">
          <div className="w-full max-w-[400px] md:max-w-full">
            {/* Progress Bars */}
            <div className="flex gap-2 w-full max-w-[400px] mb-8">
              <div className="h-1 flex-1 rounded-sm bg-[#7642FE]" />
              <div className="h-1 flex-1 rounded-sm bg-[#7642FE]" />
            </div>
            <OrganizationProfileForm />
          </div>
        </div>

        {/* Image Section - Right Side - Fixed */}
        <div className="hidden lg:block lg:w-1/2 fixed right-0 top-0 h-screen">
          <OrganizationProfileImageSection />
        </div>

        {/* Mobile: Image as fixed background */}
        <div className="lg:hidden fixed inset-0 z-0">
          <OrganizationProfileImageSection />
        </div>
      </div>
    </Suspense>
  );
}
