/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ProjectsTableProps {
  projects: any; // <-- Expect the direct API response
}

// A helper to format date strings
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
};

// A more robust function to determine display status and color
const getProjectStatus = (project: any): { text: string; color: string } => {
  const status = project.status;

  if (status === "PENDING_APPROVAL") {
    return { text: "Pending", color: "bg-orange-100 text-orange-800" };
  }

  switch (status) {
    case "ACTIVE":
      return { text: "Active", color: "bg-blue-100 text-blue-800" };
    case "COMPLETED":
      return { text: "Completed", color: "bg-green-100 text-green-800" };
    case "CANCELLED":
      return { text: "Cancelled", color: "bg-red-100 text-red-800" };
    case "DECLINED":
      return { text: "Declined", color: "bg-gray-100 text-gray-800" };
    default:
      return { text: "Unknown", color: "bg-gray-100 text-gray-800" };
  }
};

// Helper function to get payment status badge styling
const getPaymentStatus = (invoice: any): { text: string; color: string } => {
  if (!invoice) {
    return { text: "No Invoice", color: "bg-gray-100 text-gray-800" };
  }

  const status = invoice.status?.toLowerCase();

  switch (status) {
    case "paid":
      return { text: "Paid", color: "bg-green-100 text-green-800" };
    case "unpaid":
      return { text: "Unpaid", color: "bg-orange-100 text-orange-800" };
    default:
      return {
        text: invoice.status || "Unknown",
        color: "bg-gray-100 text-gray-800",
      };
  }
};

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const router = useRouter();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId],
    );
  };

  const handleViewDetails = (projectId: string) => {
    // This should probably go to a user-facing project detail page
    router.push(`/dashboard/projects/${projectId}`);
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-6 font-medium text-gray-600">
                <Checkbox
                  // Logic for select/deselect all
                  checked={
                    selectedProjects.length === projects.length &&
                    projects.length > 0
                  }
                  onCheckedChange={(checked) => {
                    setSelectedProjects(
                      checked ? projects.map((p: any) => p.id) : [],
                    );
                  }}
                />
              </th>
              <th className="py-3 px-6 font-medium text-gray-600 text-left">
                Project ID
              </th>
              <th className="py-3 px-6 font-medium text-gray-600 text-left">
                Project Name
              </th>
              <th className="py-3 px-6 font-medium text-gray-600 text-left">
                Start Date
              </th>
              <th className="py-3 px-6 font-medium text-gray-600 text-left">
                End Date
              </th>
              <th className="py-3 px-6 font-medium text-gray-600 text-left">
                Status
              </th>
              <th className="py-3 px-6 font-medium text-gray-600 text-left">
                Payment Status
              </th>
              <th className="py-3 px-6 font-medium text-gray-600 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => {
              const { text: statusText, color: statusColor } =
                getProjectStatus(project);
              const { text: paymentText, color: paymentColor } =
                getPaymentStatus(project.invoice);
              return (
                <tr key={project.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={() => handleSelectProject(project.id)}
                    />
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-mono text-xs">{`...${project.id.slice(
                    -8,
                  )}`}</td>
                  <td className="py-4 px-6 text-gray-900 font-semibold">
                    {project.service.title}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {formatDate(project.start_date)}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {formatDate(project.end_date)}
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={statusColor}>{statusText}</Badge>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={paymentColor}>{paymentText}</Badge>
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {projects.map((project: any) => {
          const { text: statusText, color: statusColor } =
            getProjectStatus(project);
          const { text: paymentText, color: paymentColor } = getPaymentStatus(
            project.invoice,
          );

          return (
            <div
              key={project.id}
              className="bg-white border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-mono mb-1">
                    ...{project.id.slice(-8)}
                  </p>
                  <h3 className="font-semibold text-gray-900">
                    {project.service.title}
                  </h3>
                </div>
                <Checkbox
                  checked={selectedProjects.includes(project.id)}
                  onCheckedChange={() => handleSelectProject(project.id)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="text-gray-900">
                    {formatDate(project.start_date)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">End Date</p>
                  <p className="text-gray-900">
                    {formatDate(project.end_date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <Badge className={statusColor}>{statusText}</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Payment</p>
                  <Badge className={paymentColor}>{paymentText}</Badge>
                </div>
              </div>

              <Button
                variant="link"
                onClick={() => handleViewDetails(project.id)}
                className="text-[#7642FE] p-0 w-full justify-start"
              >
                View Details →
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsTable;
