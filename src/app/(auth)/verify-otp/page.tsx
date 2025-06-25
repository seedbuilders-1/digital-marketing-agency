"use client";

import VerifyOTPForm from "@/components/auth/verify-otp-form";
import { Suspense } from "react";

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="w-full py-8">
        <VerifyOTPForm />
      </div>
    </Suspense>
  );
}
