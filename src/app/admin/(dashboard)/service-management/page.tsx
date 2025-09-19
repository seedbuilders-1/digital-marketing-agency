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
} from "lucide-react";
import Link from "next/link";

const mockServices = [
  {
    id: "000001",
    name: "Digital Marketing Audit",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000002",
    name: "Search Engine Optimization",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000003",
    name: "Social Media Marketing",
    visibility: "Private",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000004",
    name: "Content Marketing",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000005",
    name: "Web Design and Development",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000006",
    name: "Email Marketing",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000007",
    name: "Analytics and Reporting",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000008",
    name: "Influencer Marketing",
    visibility: "Private",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000009",
    name: "Conversion Rate Optimization",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000010",
    name: "Digital Marketing Audit",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000011",
    name: "Search Engine Optimization",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
  {
    id: "000012",
    name: "Content Marketing",
    visibility: "Public",
    lastUpdated: "12/06/25 - 10:03 pm",
  },
];

export default function ServiceManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = mockServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.includes(searchTerm)
  );

  const getVisibilityColor = (visibility: string) => {
    return visibility === "Public"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200";
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
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-gray-600 bg-transparent">
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
                    Last Updated
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, index) => (
                  <tr
                    key={service.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-4 px-6 text-gray-900">{service.id}</td>
                    <td className="py-4 px-6 text-gray-900">{service.name}</td>
                    <td className="py-4 px-6">
                      <Badge
                        variant="outline"
                        className={getVisibilityColor(service.visibility)}
                      >
                        {service.visibility}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {service.lastUpdated}
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1-12 of 150 entries</p>
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
    </div>
  );
}
