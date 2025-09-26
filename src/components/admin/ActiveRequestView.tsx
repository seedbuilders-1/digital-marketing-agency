// components/admin/request/ActiveRequestView.tsx

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Eye } from "lucide-react";
import { formatDate, getStatusDetails } from "@/lib/utils";
import { UploadModal } from "./request/UploadModal";
// **NOTE**: You will need to create and import an UploadModal component
// import { UploadModal } from './UploadModal';

interface ActiveRequestViewProps {
  request: any;
  projectBrief: { label: string; value: string }[];
  userDetails: { label: string; value: string }[];
}

export const ActiveRequestView = ({
  request,
  projectBrief,
  userDetails,
}: ActiveRequestViewProps) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  console.log("request", request);

  const statusDetails = getStatusDetails(request.status);

  const handleOpenUploadModal = (milestone) => {
    setSelectedMilestone(milestone);
    setUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
    setSelectedMilestone(null);
  };

  const completedMilestones = request.milestones.filter(
    (m) => !!m.deliverable_url
  ).length;
  const progress =
    request.milestones.length > 0
      ? (completedMilestones / request.milestones.length) * 100
      : 0;

  return (
    <>
      <Tabs defaultValue="milestones" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="milestones">Milestones & Files</TabsTrigger>
          <TabsTrigger value="information">Request Information</TabsTrigger>
        </TabsList>

        {/* Information Tab */}
        <TabsContent value="information" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Start Date</p>
                    <p>{formatDate(request.start_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">End Date</p>
                    <p>{formatDate(request.end_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Plan</p>
                    <p>{request.plan_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <Badge variant={statusDetails.variant}>
                      {statusDetails.text}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  {projectBrief.map((item) => (
                    <div key={item.label} className="text-sm">
                      <p className="text-gray-500">{item.label}</p>
                      <p className="text-gray-800">{item.value || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userDetails.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 text-sm">
                    <p className="text-gray-500">{item.label}</p>
                    <p className="text-gray-800">{item.value || "N/A"}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Milestone Tracker</CardTitle>
              <p className="text-sm text-gray-500">
                {completedMilestones} of {request.milestones.length} milestones
                completed.
              </p>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Files & Deliverables</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-gray-200">
              {request.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4"
                >
                  <div className="mb-3 sm:mb-0">
                    <p className="font-semibold text-gray-800">
                      {milestone.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Deadline: {formatDate(milestone.deadline)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {milestone.deliverable_url ? (
                      <>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={milestone.deliverable_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View File
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenUploadModal(milestone)}
                        >
                          Change File
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleOpenUploadModal(milestone)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Deliverable
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 
        Render the upload modal when uploadModalOpen is true.
        You'll need to create this component. It will receive the milestone,
        handle the file upload mutation, and call `handleCloseUploadModal` on success/close.
      */}
      {uploadModalOpen && selectedMilestone && (
        <UploadModal
          milestone={selectedMilestone}
          onClose={handleCloseUploadModal}
        />
      )}
    </>
  );
};
