"use client";

import { useState } from "react";
import Link from "next/link";
import {
  File,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  AlertCircle,
  MessageCircle,
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadModal } from "@/components/admin/request/UploadModal"; // The modal for uploading

// Utils & Types
import { formatDate } from "@/lib/utils";
import { ServiceRequest, Milestone } from "@/lib/types/projects"; // Your defined types

// --- Sub-Component for Rendering a Single Milestone ---
// This keeps the main component clean and is good for performance.
const AdminMilestoneItem = ({
  milestone,
  onOpenUploadModal,
}: {
  milestone: Milestone;
  onOpenUploadModal: (m: Milestone) => void;
}) => {
  // Helper to determine the status badge based on the milestone's status
  const getStatusBadge = () => {
    switch (milestone.status) {
      case "APPROVED":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1.5" />
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1.5" />
            Rejected by Client
          </Badge>
        );
      case "PENDING_CLIENT_APPROVAL":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1.5" />
            Pending Client Approval
          </Badge>
        );
      default: // PENDING_ADMIN_UPLOAD or any other status
        return <Badge variant="secondary">Not Submitted</Badge>;
    }
  };

  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Left Side: Title & Deadline */}
        <div>
          <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
          <p className="text-sm text-gray-500">
            Due: {formatDate(milestone.deadline)}
          </p>
        </div>
        {/* Right Side: Status & Action Button */}
        <div className="flex flex-col items-start sm:items-end gap-3">
          {getStatusBadge()}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpenUploadModal(milestone)}
          >
            <Upload className="h-4 w-4 mr-2" />
            {/* The button text changes based on whether a deliverable already exists */}
            {milestone.deliverable_file_url || milestone.deliverable_link_url
              ? "Edit/Re-upload Deliverable"
              : "Upload Deliverable"}
          </Button>
        </div>
      </div>

      {/* --- Submitted Deliverables Display --- */}
      {/* This section only renders if at least one deliverable has been submitted */}
      {(milestone.deliverable_file_url || milestone.deliverable_link_url) && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase">
            Submitted Deliverables
          </p>
          {milestone.deliverable_file_url && (
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <a
                href={milestone.deliverable_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:underline truncate"
              >
                {milestone.deliverable_file_name || "View Uploaded File"}
              </a>
            </div>
          )}
          {milestone.deliverable_link_url && (
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <a
                href={milestone.deliverable_link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:underline truncate"
              >
                {milestone.deliverable_link_url}
              </a>
            </div>
          )}
        </div>
      )}

      {/* --- Rejection Reason Display --- */}
      {/* This alert only renders if the status is REJECTED and a reason exists */}
      {milestone.status === "REJECTED" && milestone.rejection_reason && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">Client's Feedback</AlertTitle>
          <AlertDescription>{milestone.rejection_reason}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

// --- The Main `ActiveRequestView` Component ---
interface ActiveRequestViewProps {
  request: ServiceRequest;
  projectBrief: { label: string; value: string }[];
  userDetails: { label: string; value: string }[];
}

export const ActiveRequestView = ({
  request,
  projectBrief,
  userDetails,
}: ActiveRequestViewProps) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null
  );

  // Function to open the modal with the correct milestone data
  const handleOpenUploadModal = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setIsUploadModalOpen(true);
  };

  return (
    <>
      <Tabs defaultValue="milestones" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="milestones">Project Milestones</TabsTrigger>
          <TabsTrigger value="information">Request Information</TabsTrigger>
        </TabsList>

        {/* --- Milestones Tab --- */}
        <TabsContent value="milestones" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Milestone Progress</CardTitle>
              <p className="text-sm text-gray-500">
                Upload deliverables for each milestone and track client approval
                status.
              </p>
            </CardHeader>
            <CardContent>
              {request.milestones?.length > 0 ? (
                // Map over the milestones passed down from the parent page
                request.milestones.map((milestone) => (
                  <AdminMilestoneItem
                    key={milestone.id}
                    milestone={milestone}
                    onOpenUploadModal={handleOpenUploadModal}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  You have not created any milestones for this project yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Information Tab (for reviewing original details) --- */}
        <TabsContent value="information" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Brief</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectBrief.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-900 break-words">
                      {item.value}
                    </p>
                  </div>
                ))}
                <Link href={`/admin/messages/${request.id}`}>
                  <Button variant="outline" className="mt-4">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Open Conversation
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Client Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userDetails.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-900">{item.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* The Upload Modal, which is controlled by this component's state */}
      {/* It only renders when `isUploadModalOpen` is true */}
      {isUploadModalOpen && selectedMilestone && (
        <UploadModal
          milestone={selectedMilestone}
          onClose={() => setIsUploadModalOpen(false)}
        />
      )}
    </>
  );
};
