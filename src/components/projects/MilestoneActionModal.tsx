/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useReviewMilestoneMutation } from "@/api/servicesApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface MilestoneActionModalProps {
  milestone: any;
  action: "APPROVE" | "REJECT";
  isOpen: boolean;
  onClose: () => void;
}

export default function MilestoneActionModal({
  milestone,
  action,
  isOpen,
  onClose,
}: MilestoneActionModalProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [reviewMilestone, { isLoading }] = useReviewMilestoneMutation();

  const handleSubmit = async () => {
    if (action === "REJECT" && !rejectionReason.trim()) {
      toast.error("A reason is required to request changes.");
      return;
    }

    try {
      const res = await reviewMilestone({
        milestoneId: milestone.id,
        status: action === "APPROVE" ? "APPROVED" : "REJECTED",
        rejection_reason: rejectionReason,
      }).unwrap();

      console.log("res", res);

      toast.success(
        `Milestone has been successfully ${
          action === "APPROVE" ? "approved" : "sent for revision"
        }.`
      );
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "APPROVE" ? "Approve Deliverable" : "Request Changes"}
          </DialogTitle>
          <DialogDescription>
            You are about to {action === "APPROVE" ? "approve" : "reject"} the
            deliverable for:{" "}
            <span className="font-semibold text-gray-800">
              {milestone.title}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        {action === "REJECT" && (
          <div className="py-4">
            <Label htmlFor="rejection-reason" className="text-left">
              Reason for Changes
            </Label>
            <Textarea
              id="rejection-reason"
              placeholder="Please provide clear feedback for the required revisions..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-2"
            />
          </div>
        )}

        {action === "APPROVE" && (
          <p className="py-4 text-sm text-gray-600">
            Approving this deliverable will mark it as complete. This action
            cannot be undone.
          </p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className={
              action === "APPROVE"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {action === "APPROVE" ? "Confirm Approval" : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
