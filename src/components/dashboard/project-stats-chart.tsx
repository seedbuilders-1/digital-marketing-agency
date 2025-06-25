"use client";

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
} from "recharts";

const data = [
  { month: "Jan", pending: 2, active: 3, completed: 1 },
  { month: "Feb", pending: 1, active: 4, completed: 2 },
  { month: "Mar", pending: 3, active: 2, completed: 3 },
  { month: "Apr", pending: 2, active: 5, completed: 2 },
  { month: "May", pending: 4, active: 3, completed: 4 },
  { month: "Jun", pending: 1, active: 6, completed: 3 },
  { month: "Jul", pending: 3, active: 4, completed: 5 },
];

const ProjectStatsChart = () => {
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
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
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
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              <Bar
                dataKey="pending"
                fill="#FFA500"
                name="Pending"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="active"
                fill="#7642FE"
                name="Active"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="completed"
                fill="#10B981"
                name="Completed"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatsChart;
