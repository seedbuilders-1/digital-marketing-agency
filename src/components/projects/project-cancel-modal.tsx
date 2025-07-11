/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

interface ProjectCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectCancelModal = ({ isOpen, onClose }: ProjectCancelModalProps) => {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");

  const handleConfirmCancel = () => {
    setStep(2);
  };

  const handleSubmitReason = () => {
    console.log("Project cancelled with reason:", reason);
    onClose();
    setStep(1);
    setReason("");
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-4">
        {step === 1 ? (
          <>
            <DialogHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <DialogTitle className="text-lg font-semibold">
                Are you sure you want to cancel this project?
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">
                You're about to cancel this project. Are you sure you want to
                proceed?
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmCancel}
                className="flex-1 bg-[#7642FE] hover:bg-[#5f35cc]"
              >
                Proceed
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Why do you want to cancel this project?
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-600 mb-4 text-sm">
                Note that this action may attract an additional cost
              </p>
              <Textarea
                placeholder="Type a brief description..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReason}
                className="flex-1 bg-[#7642FE] hover:bg-[#5f35cc]"
                disabled={!reason.trim()}
              >
                Send request
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCancelModal;
