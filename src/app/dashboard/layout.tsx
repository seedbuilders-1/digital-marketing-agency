import type React from "react";
import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Footer from "@/components/layout/footer";
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
  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ProtectedLayout>
  );
}
