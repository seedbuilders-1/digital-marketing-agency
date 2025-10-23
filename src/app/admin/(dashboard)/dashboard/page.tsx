/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetDashboardAnalyticsQuery } from "@/api/analyticsApi";
import {
  Loader2,
  AlertCircle,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  Users,
  BarChart as BarChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Bar,
  Legend,
  BarChart,
} from "recharts";

// Helper to format currency
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    amount
  );

// A reusable card component for stats
const StatCard = ({ title, value, icon, subtext }: any) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function AdminDashboard() {
  const {
    data: analytics,
    isLoading,
    isError,
  } = useGetDashboardAnalyticsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }
  if (isError || !analytics) {
    return (
      <div className="p-6 text-red-500 text-center">
        <AlertCircle className="mx-auto mb-2" />
        Failed to load dashboard analytics.
      </div>
    );
  }

  const { stats, charts } = analytics;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Dashboard Overview
        </h2>
        {/* --- Live Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={<TrendingUp className="text-purple-600" />}
          />
          <StatCard
            title="Total Clients"
            value={stats.totalClients}
            icon={<Users className="text-purple-600" />}
          />
          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
            icon={<BarChartIcon className="text-purple-600" />}
          />
          <StatCard
            title="Completed Projects"
            value={stats.completedProjects}
            icon={<CheckCircle className="text-purple-600" />}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Avg. Revenue/Client"
            value={formatCurrency(stats.averageRevenue)}
            icon={<TrendingUp className="text-blue-600" />}
          />
          <StatCard
            title="Total Service Requests"
            value={stats.totalServiceRequests}
            icon={<FileText className="text-blue-600" />}
          />
          <StatCard
            title="Unpaid Invoices"
            value={stats.unpaidInvoices}
            icon={<Clock className="text-blue-600" />}
          />
          <StatCard
            title="Pending Admin Tasks"
            value={stats.pendingTasks}
            icon={<Clock className="text-blue-600" />}
            subtext="Milestones to upload"
          />
        </div>
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue (₦)</CardTitle>
            {/* Filter functionality can be added later */}
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(val) => `₦${val / 1000}k`}
                  />
                  <Tooltip
                    formatter={(val: number) => [
                      formatCurrency(val),
                      "Revenue",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#7642FE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-16">
              <p>Activity feed coming soon.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Stats Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Project Stats</CardTitle>
          {/* Legend and filter can be managed here */}
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.projectStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="pending" fill="#FBBF24" name="Pending" />
                <Bar dataKey="active" fill="#3B82F6" name="Active" />
                <Bar dataKey="completed" fill="#10B981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
