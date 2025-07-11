/* eslint-disable react/no-unescaped-entities */
"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectCancelModal from "@/components/projects/project-cancel-modal";
import { PROJECTS_DATA } from "@/lib/constants/projects";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const [showCancelModal, setShowCancelModal] = useState(false);

  const project = PROJECTS_DATA.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested project could not be found.
          </p>
          <Button onClick={() => router.push("/dashboard/projects")}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

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

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard/projects")}
              className="flex items-center gap-2 text-[#7642FE] hover:text-[#5f35cc] mb-4 p-2 sm:px-4"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to projects</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {project.name}
              </h1>
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(true)}
                className="text-red-600 border-red-200 hover:bg-red-50 self-start sm:self-auto"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Project Details */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6">Project Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Project ID
                    </label>
                    <p className="text-gray-900">{project.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Project Name
                    </label>
                    <p className="text-gray-900">{project.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Start/End Date
                    </label>
                    <p className="text-gray-900">
                      {project.startDate} - {project.endDate}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Payment
                    </label>
                    <p className="text-gray-900">
                      ${project.payment.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-500">
                  Project brief
                </label>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  Hi, I'd like support with a social media marketing campaign
                  for the launch of our new skincare line, Glow Essence. We're
                  targeting young adults (18-30) and want to build awareness and
                  engagement primarily on Instagram and TikTok. The launch date
                  is in four weeks, and we'd like help with content planning, ad
                  setup, and influencer outreach. Please let me know what
                  details you need to get started.
                </p>
              </div>

              <Button
                variant="outline"
                className="mt-6 text-[#7642FE] border-[#7642FE] hover:bg-[#7642FE] hover:text-white bg-transparent"
              >
                <MessageCircle size={16} className="mr-2" />
                Open conversation
              </Button>
            </CardContent>
          </Card>

          {/* Files */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6">Files</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">Milestone 1 - 20/05/25</span>
                  <Button variant="link" className="text-[#7642FE] p-0">
                    Filename.pdf
                  </Button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">Milestone 2 - 25/05/25</span>
                  <Button variant="link" className="text-[#7642FE] p-0">
                    Filename.pdf
                  </Button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">Milestone 3 - 12/06/25</span>
                  <span className="text-gray-500">No files yet</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestone Tracker */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6">Milestone tracker</h2>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#7642FE] rounded-full flex items-center justify-center text-white text-sm font-medium mb-2">
                      ✓
                    </div>
                    <span className="text-sm text-gray-600">Start</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#7642FE] rounded-full flex items-center justify-center text-white text-sm font-medium mb-2">
                      ✓
                    </div>
                    <span className="text-sm text-gray-600">Milestone 1</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mb-2">
                      2
                    </div>
                    <span className="text-sm text-gray-600">Milestone 2</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200">
                  <div className="h-full bg-[#7642FE] w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProjectCancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        projectName={project.name}
      />
    </Suspense>
  );
}
