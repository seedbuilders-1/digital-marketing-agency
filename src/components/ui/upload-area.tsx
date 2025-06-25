"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onImageUpload: (imageUrl: string) => void;
  className?: string;
}

export function UploadArea({ onImageUpload, className }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const imageUrl = URL.createObjectURL(file);
          onImageUpload(imageUrl);
        }
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
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
    handleFileSelect(e.target.files);
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
        Supports: JPG, PNG, GIF (Max 5MB)
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
