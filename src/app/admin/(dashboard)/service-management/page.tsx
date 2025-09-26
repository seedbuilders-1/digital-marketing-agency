"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  RefreshCw,
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2, // For loading state
  AlertCircle, // For error state
} from "lucide-react";
import Link from "next/link";
import { useGetAllServiesQuery } from "@/api/servicesApi";

// 1. Define a type that matches your actual API response
interface Service {
  id: string;
  title: string;
  isPublic: boolean;
  created_at: string; // Or updated_at if you prefer
  // Add any other fields you might need
}

// Helper to format the date string
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function ServiceManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Use the hook and get loading/error states
  const {
    data: servicesData,
    isLoading,
    isError,
    refetch, // To power the refresh button
  } = useGetAllServiesQuery(undefined, {
    // Polling can be useful to keep data fresh
    // pollingInterval: 30000,
  });

  // The actual services array is inside the response data
  const services: Service[] = servicesData?.data || [];

  // 3. Update filtering logic to use real data and properties
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVisibilityBadge = (isPublic: boolean) => {
    return isPublic ? (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-800 border-green-200"
      >
        Public
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="bg-gray-100 text-gray-800 border-gray-200"
      >
        Private
      </Badge>
    );
  };

  // 4. Create a reusable component for the table body to handle different states
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-10">
            <div className="flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-2" />
              <span className="text-gray-500">Loading services...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (isError) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-10">
            <div className="flex justify-center items-center text-red-500">
              <AlertCircle className="h-6 w-6 mr-2" />
              <span>Failed to load services. Please try refreshing.</span>
            </div>
          </td>
        </tr>
      );
    }

    if (filteredServices.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-10 text-gray-500">
            No services found.
          </td>
        </tr>
      );
    }

    return filteredServices.map((service, index) => (
      <tr
        key={service.id}
        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
      >
        <td className="py-4 px-6 text-gray-500 font-mono text-xs">
          {service.id}
        </td>
        <td className="py-4 px-6 text-gray-900 font-medium">{service.title}</td>
        <td className="py-4 px-6">{getVisibilityBadge(service.isPublic)}</td>
        <td className="py-4 px-6 text-gray-500">
          {formatDate(service.created_at)}
        </td>
        <td className="py-4 px-6">
          <div className="flex items-center gap-2">
            <Link href={`/admin/service-management/${service.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:text-purple-700"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </Link>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">All Services</h1>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Connect the refetch function to the refresh button */}
          <Button
            variant="outline"
            className="text-gray-600 bg-transparent"
            onClick={refetch}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Link href="/admin/service-management/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New Service
            </Button>
          </Link>
        </div>
      </div>

      {/* Services Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Service ID
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Service Name
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Visibility
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Date Created
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Render the content based on the API state */}
                {renderTableContent()}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination - Note: This is still static. Full implementation requires more state. */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {/* Update pagination text dynamically */}
          Showing 1-{filteredServices.length} of {filteredServices.length}{" "}
          entries
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-purple-600 text-white"
          >
            1
          </Button>
          {/* These buttons are placeholders until full pagination logic is added */}
          <Button variant="outline" size="sm" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
