/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-center text-base sm:text-lg font-semibold px-2">
            Are you sure you want to delete this conversation?
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4 py-4 px-2">
          <p className="text-center text-gray-600 text-sm sm:text-base">
            You're about to permanently delete this conversation.
          </p>
          <p className="text-center text-gray-600 text-sm sm:text-base">
            This action cannot be undone.
          </p>
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Are you sure you want to proceed?
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 px-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-transparent order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white order-1 sm:order-2"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
