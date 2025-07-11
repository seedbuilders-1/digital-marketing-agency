"use client";

import { Suspense, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectsTable from "@/components/projects/projects-table";
import { PROJECTS_DATA } from "@/lib/constants/projects";
import type { Project, ProjectFilter } from "@/lib/types/projects";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("all");
  const [projects] = useState<Project[]>(PROJECTS_DATA);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" || project.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const hasProjects = filteredProjects.length > 0;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Projects
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
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
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={
                    selectedFilter === filter.key ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedFilter(filter.key as ProjectFilter)}
                  className={`whitespace-nowrap ${
                    selectedFilter === filter.key
                      ? "bg-[#7642FE] text-white"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
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
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Content */}
          {hasProjects ? (
            <ProjectsTable projects={filteredProjects} />
          ) : (
            <div className="flex items-center justify-center h-64 sm:h-96 bg-white rounded-lg border">
              <p className="text-gray-500 text-base sm:text-lg">
                There are no projects to view
              </p>
            </div>
          )}

          {/* Pagination */}
          {hasProjects && (
            <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
              <span>Showing 1-15 of 150 entries</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <div className="flex gap-1">
                  {[1, 2, 3, "...", 12].map((page, index) => (
                    <Button
                      key={index}
                      variant={page === 1 ? "default" : "outline"}
                      size="sm"
                      className={`w-8 h-8 p-0 ${
                        page === 1
                          ? "bg-[#7642FE] text-white"
                          : "bg-transparent"
                      }`}
                      disabled={page === "..."}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
