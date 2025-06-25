"use client";

import LoginForm from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="w-full py-8">
        <LoginForm />
      </div>
    </Suspense>
  );
}
