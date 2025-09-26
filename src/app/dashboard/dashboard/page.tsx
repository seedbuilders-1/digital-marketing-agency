/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useMemo } from "react";
import { Plus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCards from "@/components/dashboard/stats-cards";
import AmountSpentChart from "@/components/dashboard/amount-spent-chart";
import ProjectStatsChart from "@/components/dashboard/project-stats-chart";
import ProjectsSection from "@/components/dashboard/projects-section";
import RecentActivities from "@/components/dashboard/recent-activities";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/selectors";
import { useGetUserInvoicesQuery } from "@/api/invoiceApi";
import { useGetUserServiceRequestsQuery } from "@/api/servicesApi";
import { AlertCircle } from "lucide-react";

const DashboardSkeleton = () => (
  // A simple skeleton loader for the page
  <div className="px-6 py-8 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-10 w-1/3 bg-gray-200 rounded-md mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="h-96 bg-gray-200 rounded-lg"></div>
        <div className="h-96 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  // --- Data Fetching ---
  const user = useSelector(selectCurrentUser);
  console.log("user", user);
  const { data: invoices = [], isLoading: isLoadingInvoices } =
    useGetUserInvoicesQuery();
  console.log("dahh", invoices);
  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    isError,
  } = useGetUserServiceRequestsQuery();

  // --- Data Processing & Calculations ---
  const stats = useMemo(() => {
    return {
      pendingRequests: projects?.data?.filter(
        (p: any) => p.status === "PENDING_APPROVAL"
      ).length,
      totalProjects: projects?.data?.length,
      inProgress: projects?.data?.filter((p: any) => p.status === "ACTIVE")
        .length,
      completedProjects: projects?.data?.filter(
        (p: any) => p.status === "COMPLETED"
      ).length,
    };
  }, [projects]);

  const isLoading = isLoadingInvoices || isLoadingProjects;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load dashboard data</h2>
        <p className="text-gray-600">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Hello, {user?.name}!
              </h1>
              <p className="text-gray-600">Welcome back, let's get to work.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="p-3">
                <Mail size={16} />
              </Button>
              <Button className="bg-[#7642FE] hover:bg-[#5f35cc] text-white px-6 py-3">
                <Plus size={16} className="mr-2" />
                New Request
              </Button>
            </div>
          </div>

          {/* Dashboard Overview */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Dashboard Overview
            </h2>
            <StatsCards stats={stats} />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AmountSpentChart invoices={invoices} />
            <ProjectStatsChart projects={projects?.data} />
          </div>

          {/* Projects and Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProjectsSection projects={projects?.data} />
            <RecentActivities />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
