"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Project } from "@/lib/types/projects";

interface ProjectsTableProps {
  projects: Project[];
}

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const router = useRouter();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleViewDetails = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`);
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                <Checkbox />
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Project ID
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Project Name
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Start Date
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                End Date
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">
                  <Checkbox
                    checked={selectedProjects.includes(project.id)}
                    onCheckedChange={() => handleSelectProject(project.id)}
                  />
                </td>
                <td className="py-4 px-6 text-gray-900">{project.id}</td>
                <td className="py-4 px-6 text-gray-900">{project.name}</td>
                <td className="py-4 px-6 text-gray-600">{project.startDate}</td>
                <td className="py-4 px-6 text-gray-600">{project.endDate}</td>
                <td className="py-4 px-6">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <Button
                    variant="link"
                    onClick={() => handleViewDetails(project.id)}
                    className="text-[#7642FE] p-0"
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedProjects.includes(project.id)}
                  onCheckedChange={() => handleSelectProject(project.id)}
                />
                <span className="font-medium text-gray-900">{project.id}</span>
              </div>
              <Badge className={getStatusColor(project.status)}>
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{project.name}</h3>
              <p className="text-sm text-gray-600">
                {project.startDate} - {project.endDate}
              </p>
            </div>
            <Button
              variant="link"
              onClick={() => handleViewDetails(project.id)}
              className="text-[#7642FE] p-0 h-auto"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTable;
