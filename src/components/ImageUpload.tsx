// src/components/ImageUpload.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, X } from "lucide-react";

interface ImageUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  previewUrl?: string | null;
}

export function ImageUpload({
  file,
  onFileChange,
  previewUrl,
}: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // This effect updates the preview whenever the props change
  useEffect(() => {
    let objectUrl: string | null = null;

    // State 1: A new file has been selected by the user
    if (file) {
      // Create a temporary local URL to preview the selected file
      objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
    // State 2: No new file, but an existing image URL is provided
    else if (previewUrl) {
      setImagePreview(previewUrl);
    }
    // State 3: No file and no existing URL
    else {
      setImagePreview(null);
    }

    // Cleanup function to revoke the temporary URL and prevent memory leaks
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file, previewUrl]);

  // Handler for when a file is dropped or selected
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        // Update the parent component's state with the new file
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  // Function to clear the current selection
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the file dialog from opening
    onFileChange(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
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
        ${imagePreview ? "border-solid" : ""}`} // Make border solid if there's an image
    >
      <input {...getInputProps()} />

      {imagePreview ? (
        // --- VIEW WHEN AN IMAGE EXISTS (PREVIEW OR NEW FILE) ---
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-auto max-h-80 object-contain rounded-md"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            aria-label="Remove image"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      ) : (
        // --- VIEW WHEN NO IMAGE EXISTS ---
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
          <ImageIcon className="h-12 w-12" />
          <p className="font-semibold">Click to upload or drag and drop</p>
          <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
}
