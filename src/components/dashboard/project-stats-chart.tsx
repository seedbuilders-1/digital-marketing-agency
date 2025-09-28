/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const ProjectStatsChart = ({ projects }: { projects: any }) => {
  const chartData = useMemo(() => {
    const monthlyData: {
      [key: string]: { pending: number; active: number; completed: number };
    } = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    monthNames?.forEach((name) => {
      monthlyData[name] = { pending: 0, active: 0, completed: 0 };
    });

    projects?.forEach((project: any) => {
      const monthIndex = new Date(project.created_at).getMonth();
      const monthName = monthNames[monthIndex];
      if (project.status === "PENDING_APPROVAL") {
        monthlyData[monthName].pending += 1;
      } else if (project.status === "ACTIVE") {
        monthlyData[monthName].active += 1;
      } else if (project.status === "COMPLETED") {
        monthlyData[monthName].completed += 1;
      }
    });

    return Object.entries(monthlyData).map(([month, values]) => ({
      month,
      ...values,
    }));
  }, [projects]);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Project Stats</CardTitle>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                allowDecimals={false}
              />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              <Bar
                dataKey="pending"
                fill="#FFA500"
                name="Pending"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="active"
                fill="#3B82F6"
                name="Active"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="completed"
                fill="#10B981"
                name="Completed"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatsChart;
