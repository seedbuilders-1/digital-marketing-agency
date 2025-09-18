"use client";

import { Suspense } from "react";
import { Plus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCards from "@/components/dashboard/stats-cards";
import AmountSpentChart from "@/components/dashboard/amount-spent-chart";
import ProjectStatsChart from "@/components/dashboard/project-stats-chart";
import ProjectsSection from "@/components/dashboard/projects-section";
import RecentActivities from "@/components/dashboard/recent-activities";
import { selectCurrentUser } from "@/features/auth/selectors";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const user = useSelector(selectCurrentUser);
  console.log("dashboard", user);
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section with Action Buttons */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Hello, {user?.name}!
              </h1>
              <p className="text-gray-600">Good evening.</p>
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
            <StatsCards />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AmountSpentChart />
            <ProjectStatsChart />
          </div>

          {/* Projects and Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProjectsSection />
            <RecentActivities />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
