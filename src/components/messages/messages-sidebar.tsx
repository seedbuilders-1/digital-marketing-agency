/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Define our filter type based on ServiceRequestStatus
export type MessageFilter =
  | "all"
  | "ACTIVE"
  | "PENDING_APPROVAL"
  | "COMPLETED"
  | "CANCELLED";

// interface MessagesSidebarProps {
//   selectedFilter: MessageFilter;
//   onFilterChange: (filter: MessageFilter) => void;
// }

const MessagesSidebar = ({ selectedFilter, onFilterChange }: any) => {
  // Update filters to match your backend statuses
  const filters = [
    { key: "all", label: "All Messages" },
    { key: "ACTIVE", label: "Active Projects" },
    { key: "PENDING_APPROVAL", label: "Pending Projects" },
    { key: "COMPLETED", label: "Completed Projects" },
    { key: "CANCELLED", label: "Cancelled Projects" },
  ];

  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full justify-between ...">
        All Messages <ChevronDown size={16} />
      </Button>
      <div className="space-y-1">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key as MessageFilter)}
            className={`w-full text-left ... ${
              selectedFilter === filter.key
                ? "bg-purple-50 text-[#7642FE]"
                : "text-gray-600"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagesSidebar;
