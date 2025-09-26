"use client";

import { Suspense, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectCancelModal from "@/components/projects/project-cancel-modal";
import { useGetServiceRequestByIdQuery } from "@/api/servicesApi";
import { AlertCircle } from "lucide-react";
import { getFilenameFromUrl, isUrl } from "@/lib/utils";
import MilestoneActionModal from "@/components/projects/MilestoneActionModal";

// A detailed skeleton for the loading state
const ProjectDetailSkeleton = () => (
  <div className="px-4 sm:px-6 py-4 sm:py-8 animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="h-10 w-40 bg-gray-200 rounded-md mb-4"></div>
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
      </div>
      <Card className="mb-8">
        <CardContent className="p-6 h-64 bg-gray-100"></CardContent>
      </Card>
      <Card className="mb-8">
        <CardContent className="p-6 h-48 bg-gray-100"></CardContent>
      </Card>
    </div>
  </div>
);

// Helper to format dates
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB");

// Helper for status colors
const getStatusBadge = (project: any) => {
  const status = project.status;

  let text = "Unknown";
  let color = "bg-gray-100 text-gray-800";

  if (status === "PENDING_APPROVAL") {
    text = "Pending";
    color = "bg-orange-100 text-orange-800";
  } else {
    switch (status) {
      case "ACTIVE":
        text = "Active";
        color = "bg-blue-100 text-blue-800";
        break;
      case "COMPLETED":
        text = "Completed";
        color = "bg-green-100 text-green-800";
        break;
      case "CANCELLED":
        text = "Cancelled";
        color = "bg-red-100 text-red-800";
        break;
      case "DECLINED":
        text = "Declined";
        color = "bg-gray-200 text-gray-600";
        break;
    }
  }
  return <Badge className={color}>{text}</Badge>;
};

const MilestoneStatusBadge = ({ status }: { status: any }) => {
  console.log(status);
  switch (status) {
    case "APPROVED":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" /> Approved
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Changes Requested
        </Badge>
      );
    case "PENDING_CLIENT_APPROVAL":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending Your Approval
        </Badge>
      );
    case "PENDING_ADMIN_UPLOAD":
      return <Badge variant="outline">Awaiting Upload</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const MilestoneItem = ({ milestone }: { milestone: any }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: "APPROVE" | "REJECT" | null;
  }>({
    isOpen: false,
    action: null,
  });

  const openModal = (action: "APPROVE" | "REJECT") => {
    setModalState({ isOpen: true, action });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, action: null });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b last:border-b-0">
        <div className="mb-4 sm:mb-0">
          <p className="font-semibold text-gray-800">{milestone.title}</p>
          <p className="text-sm text-gray-500">
            Deadline: {formatDate(milestone.deadline)}
          </p>
          {milestone.status === "REJECTED" && milestone.rejection_reason && (
            <div className="mt-2 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 p-2 rounded-md text-xs">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>
                <span className="font-semibold">Reason:</span>{" "}
                {milestone.rejection_reason}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center flex-wrap gap-2 self-start sm:self-center">
          {/* Always show the status */}
          <MilestoneStatusBadge status={milestone.status} />

          {/* Always show the file link if it exists */}
          {milestone.deliverable_url && (
            <Button
              asChild
              variant="link"
              className="text-[#7642FE] p-0 h-auto"
            >
              <a
                href={milestone.deliverable_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            </Button>
          )}

          {/* ONLY show action buttons when approval is pending */}
          {milestone.status === "PENDING_CLIENT_APPROVAL" && (
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"
                onClick={() => openModal("REJECT")}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Request Changes
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => openModal("APPROVE")}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          )}
        </div>
      </div>
      {modalState.isOpen && modalState.action && (
        <MilestoneActionModal
          milestone={milestone}
          action={modalState.action}
          isOpen={modalState.isOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Fetch the live data for this specific project
  const {
    data: projectData,
    isLoading,
    isError,
    error,
  } = useGetServiceRequestByIdQuery(projectId);
  const project: any = projectData?.data;
  console.log("error", error);
  console.log("projectData", projectData);
  // Memoize the project brief for display
  const projectBrief = useMemo(() => {
    if (!project?.formData) return [];
    return Object.entries(project.formData).map(([key, value]) => ({
      label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      value: String(value),
    }));
  }, [project?.formData]);

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (isError || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div>
          <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h1 className="text-xl font-bold text-gray-900">Project Not Found</h1>
          <p className="text-gray-600 mb-4">
            The requested project could not be found or you do not have
            permission to view it.
          </p>
          <Button onClick={() => router.push("/dashboard/projects")}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <div className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard/projects")}
              className="flex items-center gap-2 text-[#7642FE] mb-4 p-0 hover:bg-transparent"
            >
              <ArrowLeft size={20} />
              Back to projects
            </Button>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {project.service.title}
              </h1>
              {/* Only show cancel button if the project is in a cancellable state */}
              {["PENDING_APPROVAL", "ACTIVE"].includes(project.status) && (
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(true)}
                  className="text-red-600 border-red-200 hover:bg-red-50 self-start sm:self-auto"
                >
                  Cancel Project
                </Button>
              )}
            </div>
          </div>

          {/* Project Details Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6">Project Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Project ID
                  </label>
                  <p className="text-gray-900 font-mono text-xs">
                    {project.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Service
                  </label>
                  <p className="text-gray-900">{project.service.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Timeline
                  </label>
                  <p className="text-gray-900">
                    {formatDate(project.start_date)} -{" "}
                    {formatDate(project.end_date)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Payment
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {project.invoice?.status === "Paid"
                      ? "Paid"
                      : "Payment Pending"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div className="mt-1">{getStatusBadge(project)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Brief Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6">Project Brief</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {projectBrief.map((item) => (
                  <div key={item.label}>
                    <label className="font-medium text-gray-500">
                      {item.label}
                    </label>
                    {isUrl(item.value) ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-600 hover:underline mt-1"
                      >
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {getFilenameFromUrl(item.value)}
                        </span>
                      </a>
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap mt-1">
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
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

          {/* Files Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">
                Milestones & Deliverables
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Review deliverables uploaded by the administrator and approve
                them to complete the project.
              </p>
              <div className="space-y-3">
                {project.milestones?.length > 0 ? (
                  project.milestones.map((milestone: any) => (
                    <MilestoneItem key={milestone.id} milestone={milestone} />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm py-4 text-center">
                    The administrator has not set any milestones for this
                    project yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProjectCancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        projectName={project.service.title}
        projectId={project.id} // Pass projectId to the modal
      />
    </Suspense>
  );
}
