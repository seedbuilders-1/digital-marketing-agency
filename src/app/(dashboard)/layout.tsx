import type React from "react";
import type { Metadata } from "next";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export const metadata: Metadata = {
  title: "Dashboard - Digital Marketing Agency",
  description: "Manage your digital marketing projects and campaigns",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
