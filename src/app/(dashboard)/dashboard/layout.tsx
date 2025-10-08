// This file is located at: app/(dashboard)/layout.tsx

"use client";

import type React from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Footer from "@/components/layout/footer";
import DashboardGuard from "@/components/dashboard/DashboardGuards";
// Make sure this import path is correct based on where you created the Guard

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      <main className="flex-1">
        {/*
          The Guard is placed here. It will protect all routes that use this layout,
          such as /dashboard, /services, /projects, etc.
        */}
        <DashboardGuard>{children}</DashboardGuard>
      </main>
      <Footer />
    </div>
  );
}
