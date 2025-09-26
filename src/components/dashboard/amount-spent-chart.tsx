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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const AmountSpentChart = ({ invoices }: { invoices: any }) => {
  // Process the invoice data to group by month
  console.log("invoices", invoices);
  const chartData = useMemo(() => {
    const monthlyData: { [key: string]: number } = {};
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

    // Initialize all months to 0
    monthNames.forEach((name) => {
      monthlyData[name] = 0;
    });

    invoices?.forEach((invoice: any) => {
      // Only include paid invoices in the amount spent chart
      if (invoice.status.toLowerCase() === "paid") {
        const monthIndex = new Date(invoice.created_at).getMonth();
        const monthName = monthNames[monthIndex];
        monthlyData[monthName] += parseFloat(String(invoice.amount));
      }
    });

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [invoices]);

  const totalSpent = useMemo(() => {
    return invoices
      ?.filter((inv: any) => inv.status.toLowerCase() === "paid")
      .reduce((sum: any, inv: any) => sum + parseFloat(String(inv.amount)), 0);
  }, [invoices]);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Amount Spent</CardTitle>
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
            <LineChart data={chartData}>
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
                tickFormatter={(value) => `₦${value / 1000}k`}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Spent"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#7642FE"
                strokeWidth={3}
                dot={{ fill: "#7642FE", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalSpent)}
          </div>
          <div className="text-sm text-gray-500">Total spent</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmountSpentChart;
