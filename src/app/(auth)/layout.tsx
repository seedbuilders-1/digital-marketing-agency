import type React from "react";
import type { Metadata } from "next";
import "@/app/globals.css";
import AuthWrapper from "@/components/auth/auth-wrapper";

export const metadata: Metadata = {
  title: "Digital Marketing Agency - Authentication",
  description:
    "Sign up or log in to access your Digital Marketing Agency account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
