/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/request/PendingRequestView.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUpdateServiceRequestStatusMutation } from "@/api/servicesApi"; // Assuming this is your API slice
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { formatDate, getStatusDetails } from "@/lib/utils";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";

interface PendingRequestViewProps {
  request: any;
  projectBrief: { label: string; value: string }[];
  userDetails: { label: string; value: string }[];
}

export const PendingRequestView = ({
  request,
  projectBrief,
  userDetails,
}: PendingRequestViewProps) => {
  const [milestones, setMilestones] = useState([
    { id: uuidv4(), title: "", deadline: "" },
  ]);
  const [updateStatus, { isLoading }] = useUpdateServiceRequestStatusMutation();

  const statusDetails = getStatusDetails(request.status);

  const addMilestone = () => {
    setMilestones([...milestones, { id: uuidv4(), title: "", deadline: "" }]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const updateMilestone = (
    id: string,
    key: "title" | "deadline",
    value: string
  ) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [key]: value } : m))
    );
  };

  const handleAccept = async () => {
    if (milestones.some((m) => !m.title.trim() || !m.deadline)) {
      toast.error("All milestone titles and deadlines are required.");
      return;
    }
    const lastMilestoneDate = new Date(
      milestones.sort(
        (a, b) =>
          new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      )[0].deadline
    );
    if (request.end_date && lastMilestoneDate > new Date(request.end_date)) {
      toast.error(
        "The final milestone cannot be scheduled after the project's end date."
      );
      return;
    }

    try {
      await updateStatus({
        requestId: request.id,
        status: "ACTIVE",
        milestones: milestones.map(({ id, ...rest }) => rest),
      }).unwrap();
      toast.success("Project has been accepted and is now active!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to accept project.");
    }
  };

  const handleDecline = async () => {
    try {
      await updateStatus({
        requestId: request.id,
        status: "DECLINED",
      }).unwrap();
      toast.success("Project has been successfully declined.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to decline project.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* --- Project Details Card --- */}
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
        {/* --- User Details Card --- */}
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

      {/* --- Milestone Creation Card --- */}
      <Card>
        <CardHeader>
          <CardTitle>Set Project Milestones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Define the deliverables for this project. The final milestone
            deadline must be on or before the project end date (
            {formatDate(request.end_date)}).
          </p>
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="grid grid-cols-1 md:grid-cols-10 gap-2 items-center"
            >
              <Input
                placeholder={`Milestone ${index + 1} Title`}
                value={milestone.title}
                onChange={(e) =>
                  updateMilestone(milestone.id, "title", e.target.value)
                }
                className="md:col-span-5"
              />
              <Input
                type="date"
                value={milestone.deadline}
                onChange={(e) =>
                  updateMilestone(milestone.id, "deadline", e.target.value)
                }
                className="md:col-span-4"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeMilestone(milestone.id)}
                disabled={milestones.length === 1}
                className="text-red-500 hover:text-red-600 md:col-span-1"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addMilestone}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </CardContent>
      </Card>

      {/* --- Action Buttons --- */}
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="destructive"
          onClick={handleDecline}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Decline Request
        </Button>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleAccept}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Accept & Activate Project
        </Button>
      </div>
    </div>
  );
};
