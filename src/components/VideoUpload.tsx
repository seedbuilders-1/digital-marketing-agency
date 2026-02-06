"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Video as VideoIcon, X } from "lucide-react";

interface VideoUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  previewUrl?: string | null;
}

export function VideoUpload({
  file,
  onFileChange,
  previewUrl,
}: VideoUploadProps) {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (file) {
      objectUrl = URL.createObjectURL(file);
      setVideoPreview(objectUrl);
    } else if (previewUrl) {
      setVideoPreview(previewUrl);
    } else {
      setVideoPreview(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file, previewUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange],
  );

  const handleRemoveVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
      "video/ogg": [".ogv"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative w-full border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-purple-600 bg-purple-50"
            : "border-gray-300 hover:border-gray-400"
        }
        ${videoPreview ? "border-solid" : ""}`}
    >
      <input {...getInputProps()} />

      {videoPreview ? (
        <div className="relative">
          <video
            src={videoPreview}
            controls
            className="w-full h-auto max-h-80 object-contain rounded-md"
          />
          <button
            type="button"
            onClick={handleRemoveVideo}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            aria-label="Remove video"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
          <VideoIcon className="h-12 w-12" />
          <p className="font-semibold">Click to upload or drag and drop</p>
          <p className="text-sm">MP4, WebM, OGG</p>
        </div>
      )}
    </div>
  );
}
