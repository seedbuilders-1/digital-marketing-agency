/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// A simple function to check if a string is a URL (you can make this more robust)
export const isUrl = (str: string): boolean => {
  return (
    typeof str === "string" &&
    (str.startsWith("http://") || str.startsWith("https://"))
  );
};

// A function to extract a user-friendly filename from a URL
export const getFilenameFromUrl = (url: string): string => {
  try {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1]; // Get the last part of the path
  } catch (e: any) {
    return "Download File"; // Fallback if the URL is malformed
  }
};

// Function to format date strings
export const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Function to determine the badge variant and text based on request status
export const getStatusDetails = (
  status: any
): { variant: "default" | "destructive" | "outline"; text: string } => {
  switch (status) {
    case "PENDING_APPROVAL":
      return { variant: "outline", text: "Pending" };
    case "ACTIVE":
      return { variant: "default", text: "Active" };
    case "COMPLETED":
      return { variant: "default", text: "Completed" };
    case "DECLINED":
      return { variant: "destructive", text: "Declined" };
    case "CANCELLED":
      return { variant: "destructive", text: "Cancelled" };
    default:
      return { variant: "outline", text: "Unknown" };
  }
};
