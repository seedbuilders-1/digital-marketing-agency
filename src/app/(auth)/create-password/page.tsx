"use client";

import CreatePasswordForm from "@/components/auth/create-password-form";
import { Suspense } from "react";

export default function CreatePasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="w-full py-8">
        <CreatePasswordForm />
      </div>
    </Suspense>
  );
}
