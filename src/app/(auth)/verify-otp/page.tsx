"use client";

import VerifyOTPForm from "@/components/auth/verify-otp-form";
import { selectCurrentUser } from "@/features/auth/selectors";
import { Suspense, use } from "react";
import { useSelector } from "react-redux";

export default function VerifyOTPPage() {
  const user = useSelector(selectCurrentUser);
  console.log("user", user);
  const email = user?.email;
  const id = user?.id;
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="w-full py-8">
        <VerifyOTPForm email={email} id={id} />
      </div>
    </Suspense>
  );
}
