"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/features/store";

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const pathname = usePathname();

  useEffect(() => {
    // If there's no access token and the user is not on a public page, redirect to login
    const isPublicPage = [
      "/login",
      "/signup",
      "/",
      "/admin/auth/login",
    ].includes(pathname);

    if (!accessToken && !isPublicPage) {
      router.replace("/login");
    }
  }, [accessToken, pathname, router]);

  return <>{children}</>;
};
