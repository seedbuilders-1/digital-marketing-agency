"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { MessageFilter } from "@/lib/types/messages";

interface MessagesSidebarProps {
  selectedFilter: MessageFilter;
  onFilterChange: (filter: MessageFilter) => void;
}

const MessagesSidebar = ({
  selectedFilter,
  onFilterChange,
}: MessagesSidebarProps) => {
  const filters = [
    { key: "all" as const, label: "All Messages", count: null },
    { key: "unread" as const, label: "Unread", count: null },
    { key: "archived" as const, label: "Archived", count: null },
    {
      key: "work-in-progress" as const,
      label: "Work In Progress",
      count: null,
    },
    { key: "completed" as const, label: "Completed Projects", count: null },
  ];

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full justify-between text-[#7642FE] border-[#7642FE] bg-purple-50 text-sm sm:text-base"
      >
        All Messages
        <ChevronDown size={16} />
      </Button>

      <div className="space-y-1">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`w-full text-left px-3 py-2.5 sm:py-2 text-sm rounded-md transition-colors ${
              selectedFilter === filter.key
                ? "bg-purple-50 text-[#7642FE] font-medium"
                : "text-gray-600 hover:bg-gray-50"
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
