"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Eye,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useGetAllServicesRequestQuery } from "@/api/servicesApi";

// Define a type for the filter keys
type RequestFilter =
  | "All"
  | "Active"
  | "Pending"
  | "Completed"
  | "Unpaid"
  | "Cancelled"
  | "Declined";

// Helper to format dates
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB");

// Helper to get status text and color
const getRequestStatus = (request: any): { text: string; color: string } => {
  switch (request.status) {
    case "ACTIVE":
      return { text: "Active", color: "bg-blue-100 text-blue-800" };
    case "PENDING_APPROVAL":
      return { text: "Pending", color: "bg-yellow-100 text-yellow-800" };
    case "COMPLETED":
      return { text: "Completed", color: "bg-green-100 text-green-800" };
    case "CANCELLED":
      return { text: "Cancelled", color: "bg-gray-200 text-gray-700" };
    case "DECLINED":
      return { text: "Declined", color: "bg-gray-200 text-gray-700" };
    default:
      return { text: "Unknown", color: "bg-gray-100 text-gray-800" };
  }
};

const getPaymentStatus = (request: any): { text: string; color: string } => {
  if (request.invoice?.status === "Unpaid") {
    return { text: "Unpaid", color: "bg-red-100 text-red-800" };
  } else if (request.invoice?.status === "Paid") {
    return { text: "Paid", color: "bg-green-100 text-green-800" };
  }
};

export default function RequestManagementPage() {
  const [activeFilter, setActiveFilter] = useState<RequestFilter>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: requestsData,
    isLoading,
    isError,
  } = useGetAllServicesRequestQuery();
  const allRequests = requestsData?.data || [];

  // Calculate stats for the cards
  const stats = useMemo(() => {
    return {
      total: allRequests.length,
      pending: allRequests.filter(
        (r) => r.status === "PENDING_APPROVAL" || r.invoice?.status === "Unpaid"
      ).length,
      completed: allRequests.filter((r) => r.status === "COMPLETED").length,
      cancelled: allRequests.filter(
        (r) => r.status === "CANCELLED" || r.status === "DECLINED"
      ).length,
    };
  }, [allRequests]);

  // Filter requests based on search and selected filter
  const filteredRequests = useMemo(() => {
    return allRequests.filter((request) => {
      const statusInfo = getRequestStatus(request);
      const paymentInfo = getPaymentStatus(request);

      const matchesFilter =
        activeFilter === "All" || statusInfo.text === activeFilter;

      const matchesSearch =
        request.service.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [allRequests, activeFilter, searchTerm]);

  const filters: RequestFilter[] = [
    "All",
    "Active",
    "Pending",
    "Completed",
    "Unpaid",
    "Cancelled",
    "Declined",
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        <AlertCircle className="mr-2" /> Failed to load service requests.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900">Request Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Requests
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Requests
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Cancelled/Declined
            </CardTitle>
            <XCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cancelled}</div>
          </CardContent>
        </Card>
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
              className={activeFilter === filter ? "bg-purple-600" : ""}
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by service or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Requests Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => {
                    const statusInfo = getRequestStatus(request);
                    const paymentInfo = getPaymentStatus(request);
                    return (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">{`...${request.id.slice(
                          -8
                        )}`}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.service.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(request.start_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(request.end_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={statusInfo.color}>
                            {statusInfo.text}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={paymentInfo.color}>
                            {paymentInfo.text}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            href={`/admin/request-management/${request.id}`}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-purple-600"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                      No requests match the current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (This remains static for now, as in the user-facing page) */}
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              Showing {filteredRequests.length} of {allRequests.length} entries
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
