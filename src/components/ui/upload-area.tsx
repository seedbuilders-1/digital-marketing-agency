"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  // This prop is changed to emit the raw File object, not a URL.
  onFileSelect: (file: File) => void;
  className?: string;
}

export function UploadArea({ onFileSelect, className }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const processFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      // Loop through all selected files
      Array.from(files).forEach((file) => {
        // Basic validation for file type and size
        // if (!file.type.startsWith("image/")) {
        //   toast.error(`"${file.name}" is not an image file.`);
        //   return; // Skip this file
        // }
        // if (file.size > 5 * 1024 * 1024) {
        //   // 5MB limit
        //   toast.error(`"${file.name}" is larger than 5MB.`);
        //   return; // Skip this file
        // }
        // If the file is valid, pass the File object to the parent component.
        onFileSelect(file);
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Clear the input value to allow re-uploading the same file
    if (e.target) {
      e.target.value = "";
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200",
        isDragOver
          ? "border-[#7642fe] bg-purple-50"
          : "border-[#D1D5DB] hover:border-[#7642fe]",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <Upload className="mx-auto mb-4 text-[#6B7280]" size={48} />
      <p className="text-[#6B7280] font-['Sora'] text-sm mb-2">
        Drag and drop files here or click to browse
      </p>
      <p className="text-[#9CA3AF] font-['Sora'] text-xs">
        Supports: JPG, PNG, PDF, GIF (Max 10MB)
      </p>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
