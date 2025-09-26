// components/admin/request/UploadModal.tsx

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
import { useUploadMilestoneDeliverableMutation } from "@/api/servicesApi";
import { toast } from "sonner";
import { Loader2, UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadModalProps {
  milestone: any;
  onClose: () => void;
}

export const UploadModal = ({ milestone, onClose }: UploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadDeliverable, { isLoading }] =
    useUploadMilestoneDeliverableMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // --- Drag and Drop UI Handlers ---
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
  const triggerFileSelect = () => fileInputRef.current?.click();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  /**
   * This function prepares the data in the exact format the backend expects.
   */
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    // 1. Create a FormData object. This is the standard way to send files
    //    from a browser to a server.
    const formData = new FormData();

    // 2. Append the selected file to the FormData object.
    //    The key 'deliverableFile' MUST match the field name your backend's
    //    multer middleware is expecting (e.g., `upload.single('deliverableFile')`).
    formData.append("deliverableFile", selectedFile);

    try {
      // 3. Call the RTK Query mutation, passing the milestoneId for the URL
      //    and the formData object as the body.
      await uploadDeliverable({
        milestoneId: milestone.id,
        formData,
      }).unwrap();

      toast.success("Deliverable uploaded successfully!");
      onClose(); // Close the modal on success
    } catch (err) {
      toast.error(err?.data?.message || "Failed to upload file.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Deliverable</DialogTitle>
          <DialogDescription>
            Attach the deliverable file for the milestone:{" "}
            <span className="font-semibold text-gray-800">
              {milestone.title}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {!selectedFile ? (
            <div
              className={cn(
                "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer text-gray-500 hover:border-purple-600 hover:text-purple-600 transition-colors",
                isDragging
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-300"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
            >
              <UploadCloud className="w-10 h-10 mb-2" />
              <p className="font-semibold">Click to browse or drag & drop</p>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
              <div className="flex items-center gap-3">
                <FileIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
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
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
