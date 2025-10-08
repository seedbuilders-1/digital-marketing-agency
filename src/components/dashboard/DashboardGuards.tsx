"use client";

import { redirect, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/selectors";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
    <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
  </div>
);

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector(selectCurrentUser);
  const pathname = usePathname();

  if (!user) {
    return <LoadingScreen />;
  }

  // --- Profile Completion & Redirection Logic ---

  // CORRECTED: URLs now point to the root paths as defined in your (setup) group
  const orgProfileUrl = "/organization-profile";
  const contactProfileUrl = "/contact-person-profile";
  const individualProfileUrl = "/complete-profile";

  // Check for Organization users
  if (user.category === "organisation") {
    if (!user.organisation) {
      if (pathname !== orgProfileUrl) {
        return redirect(orgProfileUrl);
      }
    } else if (
      !user.organisation.contacts ||
      user.organisation.contacts.length === 0
    ) {
      if (pathname !== contactProfileUrl) {
        return redirect(contactProfileUrl);
      }
    }
  }

  // Check for Individual users
  if (user.category === "individual") {
    if (!user.pfp_url) {
      if (pathname !== individualProfileUrl) {
        return redirect(individualProfileUrl);
      }
    }
  }

  // All checks passed, render the dashboard page
  return <>{children}</>;
}
