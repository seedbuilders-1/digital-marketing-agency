"use client";

import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="w-full py-8">
        <ForgotPasswordForm />
      </div>
    </Suspense>
  );
}
