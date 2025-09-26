"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PaymentInvoicePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Revenue",
      value: "₦ 12.8M",
      icon: "💰",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Payments Received",
      value: "₦ 10.8M",
      icon: "✅",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Payments",
      value: "₦ 1.2M",
      icon: "⏳",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Refunds Processed",
      value: "₦ 950K",
      icon: "↩️",
      color: "bg-red-100 text-red-600",
    },
  ];

  const transactions = [
    {
      id: "000001",
      serviceName: "Digital Marketing Audit",
      client: "John Doe",
      date: "12/06/25",
      method: "Debit card",
      status: "Completed",
    },
    {
      id: "000002",
      serviceName: "Digital Marketing Audit",
      client: "John Doe",
      date: "12/06/26",
      method: "Debit card",
      status: "Completed",
    },
    {
      id: "000003",
      serviceName: "Digital Marketing Audit",
      client: "John Doe",
      date: "12/06/27",
      method: "Debit card",
      status: "Completed",
    },
    {
      id: "000004",
      serviceName: "Digital Marketing Audit",
      client: "John Doe",
      date: "12/06/28",
      method: "Credit card",
      status: "Pending",
    },
    {
      id: "000005",
      serviceName: "Digital Marketing Audit",
      client: "John Doe",
      date: "12/06/29",
      method: "Bank transfer",
      status: "Completed",
    },
    {
      id: "000006",
      serviceName: "Digital Marketing Audit",
      client: "ABC Company",
      date: "12/06/30",
      method: "Debit Card",
      status: "Completed",
    },
    {
      id: "000007",
      serviceName: "Digital Marketing Audit",
      client: "ABC Company",
      date: "12/06/31",
      method: "Debit Card",
      status: "Completed",
    },
    {
      id: "000008",
      serviceName: "Digital Marketing Audit",
      client: "ABC Company",
      date: "12/07/01",
      method: "Credit Card",
      status: "Pending",
    },
    {
      id: "000009",
      serviceName: "Digital Marketing Audit",
      client: "ABC Company",
      date: "12/07/02",
      method: "Debit Card",
      status: "Completed",
    },
    {
      id: "000010",
      serviceName: "Digital Marketing Audit",
      client: "ABC Company",
      date: "12/07/03",
      method: "Credit Card",
      status: "Pending",
    },
    {
      id: "000011",
      serviceName: "Digital Marketing Audit",
      client: "ABC Company",
      date: "12/07/04",
      method: "Bank Transfer",
      status: "Completed",
    },
  ];

  const filters = [
    "All",
    "Active",
    "Pending",
    "Completed",
    "Unpaid",
    "Cancelled",
  ];

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Completed":
  //       return "bg-green-100 text-green-800";
  //     case "Pending":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "Active":
  //       return "bg-blue-100 text-blue-800";
  //     case "Cancelled":
  //       return "bg-red-100 text-red-800";
  //     case "Unpaid":
  //       return "bg-gray-100 text-gray-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      activeFilter === "All" || transaction.status === activeFilter;
    const matchesSearch =
      transaction.serviceName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Payment Overview
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-xl`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "bg-purple-600 hover:bg-purple-700"
                  : ""
              }
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.serviceName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/payment-invoice/${transaction.id}`}
                        className="text-purple-600 hover:text-purple-900 font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1-15 of 150 entries
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="text-gray-500">...</span>
              <Button variant="outline" size="sm">
                12
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
