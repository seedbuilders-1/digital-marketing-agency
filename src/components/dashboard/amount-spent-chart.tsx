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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", amount: 150 },
  { month: "Feb", amount: 120 },
  { month: "Mar", amount: 180 },
  { month: "Apr", amount: 160 },
  { month: "May", amount: 200 },
  { month: "Jun", amount: 250 },
  { month: "Jul", amount: 220 },
  { month: "Aug", amount: 180 },
  { month: "Sep", amount: 160 },
  { month: "Oct", amount: 140 },
  { month: "Nov", amount: 120 },
  { month: "Dec", amount: 100 },
];

const AmountSpentChart = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Amount spent($)</CardTitle>
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
            <LineChart data={data}>
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
                tickFormatter={(value) => `$${value}k`}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#7642FE"
                strokeWidth={3}
                dot={{ fill: "#7642FE", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#7642FE" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="text-2xl font-bold text-gray-900">$250.0</div>
          <div className="text-sm text-gray-500">Earnings</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmountSpentChart;
