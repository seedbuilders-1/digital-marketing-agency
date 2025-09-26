/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useState, useMemo, useEffect } from "react"; // <-- Import useEffect
import { Search, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectsTable from "@/components/projects/projects-table";
import { useGetUserServiceRequestsQuery } from "@/api/servicesApi";
import Link from "next/link";
import { ProjectFilter } from "@/lib/types/projects";

const ITEMS_PER_PAGE = 10;

const generatePageNumbers = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: projectsData,
    isLoading,
    isError,
  } = useGetUserServiceRequestsQuery(undefined);
  const projects = projectsData?.data || [];

  // --- FIX #1: REMOVED the state update from useMemo ---
  const filteredProjects = useMemo(() => {
    // This hook is now only responsible for filtering, which is correct.
    return projects.filter((project: any) => {
      const status = project.status.toLowerCase();
      const invoiceStatus = project.invoice?.status.toLowerCase();

      let filterLogic = true;
      if (selectedFilter === "pending") {
        filterLogic =
          status === "pending_approval" || invoiceStatus === "unpaid";
      } else if (selectedFilter !== "all") {
        filterLogic = status === selectedFilter;
      }

      const searchLogic =
        project.service.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        project.id.toLowerCase().includes(searchTerm.toLowerCase());

      return searchLogic && filterLogic;
    });
  }, [projects, searchTerm, selectedFilter]);

  // --- FIX #2: ADDED useEffect to handle the side effect ---
  useEffect(() => {
    // This effect will run whenever the search term or filter changes.
    // It's the correct place to reset the pagination.
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  // --- PAGINATION LOGIC (Now works correctly) ---
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const hasProjects = projects.length > 0;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }
    if (isError) {
      return (
        <div className="flex items-center justify-center h-96 text-red-500">
          <AlertCircle className="mr-2" /> Failed to load projects.
        </div>
      );
    }
    if (!hasProjects) {
      return (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold">No Projects Yet</h2>
          <p className="text-gray-500 mt-2">
            When you request a service, it will appear here.
          </p>
          <Button asChild className="mt-4 bg-[#7642FE]">
            <Link href="/services">Explore Services</Link>
          </Button>
        </div>
      );
    }
    if (currentProjects.length === 0) {
      return (
        <div className="flex items-center justify-center h-96 bg-white rounded-lg border">
          <p className="text-gray-500">
            No projects match your current search or filter.
          </p>
        </div>
      );
    }

    return <ProjectsTable projects={currentProjects} />;
  };

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">
            Project updates, status, and actions at a glance.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { key: "all", label: "All" },
              { key: "active", label: "Active" },
              { key: "pending", label: "Pending" },
              { key: "completed", label: "Completed" },
              { key: "cancelled", label: "Cancelled" },
              { key: "declined", label: "Declined" },
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.key as ProjectFilter)}
                className={`whitespace-nowrap ${
                  selectedFilter === filter.key
                    ? "bg-[#7642FE]"
                    : "bg-transparent"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by service or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content Table */}
        {renderContent()}

        {/* Dynamic Pagination */}
        {filteredProjects.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <span>
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredProjects.length)} of{" "}
              {filteredProjects.length} entries
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {pageNumbers.map((page, index) => (
                  <Button
                    key={`${page}-${index}`}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={`w-8 h-8 p-0 ${
                      currentPage === page ? "bg-[#7642FE]" : "bg-transparent"
                    }`}
                    disabled={page === "..."}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
