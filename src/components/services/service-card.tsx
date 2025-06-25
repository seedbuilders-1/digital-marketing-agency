"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Service } from "@/lib/types/services";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const handleRequestService = () => {
    console.log(`Requesting service: ${service.title}`);
    // Handle service request logic here
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          {/* Icon */}
          <div className="mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <service.icon className="w-6 h-6 text-[#7642FE]" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#7642FE] transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {service.description}
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleRequestService}
            variant="outline"
            className="w-full border-[#7642FE] text-[#7642FE] hover:bg-[#7642FE] hover:text-white transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Request Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
