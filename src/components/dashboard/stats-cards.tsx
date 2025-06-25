"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, FolderOpen, BarChart3, CheckCircle } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
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

const StatsCards = () => {
  const stats = [
    {
      title: "Pending Requests",
      value: 2,
      icon: <Clock size={24} className="text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "Total projects",
      value: 10,
      icon: <FolderOpen size={24} className="text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "In progress",
      value: 1,
      icon: <BarChart3 size={24} className="text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "Completed Projects",
      value: 0,
      icon: <CheckCircle size={24} className="text-purple-600" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
