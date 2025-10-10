/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useRef, DragEvent } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Loader2,
  UploadCloud,
  File as FileIcon,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUploadMilestoneDeliverableMutation } from "@/api/servicesApi";

interface UploadModalProps {
  milestone: any; // Ideally, replace with a 'Milestone' type
  onClose: () => void;
}

export const UploadModal = ({ milestone, onClose }: UploadModalProps) => {
  // --- STATE for both file and link ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitDeliverable, { isLoading }] =
    useUploadMilestoneDeliverableMutation();

  // --- File handling logic ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  /**
   * Prepares the data and sends it to the backend.
   * It handles a file, a link, or both.
   */
  const handleSubmit = async () => {
    // 1. Validate that at least one of the two fields is filled.
    if (!selectedFile && !linkUrl.trim()) {
      toast.error("Please provide a file, a link, or both to submit.");
      return;
    }

    const toastId = toast.loading("Submitting deliverable...");

    // 2. Always create a FormData object for submission.
    const formData = new FormData();

    // 3. Conditionally append the file if it exists.
    //    'deliverableFile' must match the backend's Multer field name.
    if (selectedFile) {
      formData.append("deliverableFile", selectedFile);
    }

    // 4. Conditionally append the link if it exists.
    //    'deliverableLink' must match the backend's `req.body` field name.
    if (linkUrl.trim()) {
      formData.append("deliverableLink", linkUrl.trim());
    }

    try {
      // 5. Call the RTK Query mutation with the milestoneId and the populated formData.
      await submitDeliverable({
        milestoneId: milestone.id,
        formData,
      }).unwrap();

      toast.success("Deliverable submitted successfully!", { id: toastId });
      onClose(); // Close the modal on success
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit deliverable.", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Deliverable</DialogTitle>
          <DialogDescription>
            For milestone:{" "}
            <span className="font-semibold text-gray-800">
              {milestone.title}
            </span>
            <br />
            You can upload a file, provide an external link, or both.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* --- Link Input Section --- */}
          <div className="grid gap-2">
            <Label htmlFor="link-url" className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
              External Link (Optional)
            </Label>
            <Input
              id="link-url"
              placeholder="https://www.figma.com/file/..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* --- File Upload Section --- */}
          <div className="grid gap-2">
            <Label htmlFor="file-upload">File Upload (Optional)</Label>
            {!selectedFile ? (
              <div
                id="file-upload"
                className={cn(
                  "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer text-gray-500 hover:border-purple-600 transition-colors",
                  isDragging
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-300"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
              >
                <UploadCloud className="w-10 h-10 mb-2 text-gray-400" />
                <p className="font-semibold text-sm text-gray-600">
                  Click or drag & drop file
                </p>
                <p className="text-xs text-gray-500">Max 5MB</p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                <div className="flex items-center gap-3 min-w-0">
                  <FileIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-500 hover:text-red-500 flex-shrink-0"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#7642FE] hover:bg-[#6c3aE6]"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Deliverable
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
