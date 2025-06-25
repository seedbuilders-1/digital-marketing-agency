"use client";

import { Suspense, useState } from "react";
import { Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/services/service-card";
import { SERVICES_DATA } from "@/lib/constants/services";

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = SERVICES_DATA.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Our Services
            </h1>
            <p className="text-gray-600">
              Make a request for your preferred service
            </p>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
            <Button className="bg-[#7642FE] hover:bg-[#5f35cc] text-white ml-4">
              <Eye size={16} className="mr-2" />
              View Service requests
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No services found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
