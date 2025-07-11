"use client";

import SignUpForm from "@/components/auth/sign-up-form";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="w-full py-8">
        <SignUpForm />
      </div>
    </Suspense>
  );
}
