"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, FolderOpen, BarChart3, CheckCircle } from "lucide-react";

interface StatsData {
  pendingRequests: number;
  totalProjects: number;
  inProgress: number;
  completedProjects: number;
}

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatsCards = ({ stats }: { stats: StatsData }) => {
  const cardData = [
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: <Clock size={24} className="text-orange-600" />,
      color: "bg-orange-100",
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: <FolderOpen size={24} className="text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <BarChart3 size={24} className="text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      title: "Completed Projects",
      value: stats.completedProjects,
      icon: <CheckCircle size={24} className="text-green-600" />,
      color: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
