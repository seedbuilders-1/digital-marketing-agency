// app/admin/request-management/[id]/page.tsx

"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGetServiceRequestByIdQuery } from "@/api/servicesApi";
import { PendingRequestView } from "@/components/admin/PendingRequestView";
import { ActiveRequestView } from "@/components/admin/ActiveRequestView";

export default function RequestDetailPage() {
  const params = useParams();
  const requestId = params.id as string;

  // Fetch the service request data using RTK Query
  const {
    data: requestData,
    isLoading,
    isError,
  } = useGetServiceRequestByIdQuery(requestId);

  // Memoize the request object to prevent unnecessary re-renders
  const request = useMemo(() => requestData?.data, [requestData]);

  // Memoize and format the form data into a readable format
  const projectBrief = useMemo(() => {
    if (!request?.formData) return [];
    // Filter out keys that you don't want to display in the brief section
    const filteredKeys = ["user_name", "user_email"];
    return Object.entries(request.formData)
      .filter(([key]) => !filteredKeys.includes(key))
      .map(([key, value]) => ({
        label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value: String(value),
      }));
  }, [request?.formData]);

  // Memoize and format user details for display
  const userDetails = useMemo(() => {
    if (!request?.user) return [];
    return [
      { label: "Name", value: request.user.name },
      { label: "Email", value: request.user.email },
      { label: "Phone", value: request.user.phone_number },
      // Add other user details you want to display
    ];
  }, [request?.user]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      </div>
    );
  }

  // Error state
  if (isError || !request) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold">Request Not Found</h2>
        <p className="text-gray-600">
          The requested project could not be found. It may have been moved or
          deleted.
        </p>
        <Button asChild className="mt-4">
          <Link href="/admin/request-management">Go Back to Requests</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Button
          asChild
          variant="ghost"
          className="text-purple-600 p-0 hover:bg-transparent"
        >
          <Link href="/admin/request-management">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to request management
          </Link>
        </Button>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900">
        {request.service.title}
      </h1>

      {/* Main Content: Conditionally render based on status */}
      {request.status === "PENDING_APPROVAL" ? (
        <PendingRequestView
          request={request}
          projectBrief={projectBrief}
          userDetails={userDetails}
        />
      ) : (
        <ActiveRequestView
          request={request}
          projectBrief={projectBrief}
          userDetails={userDetails}
        />
      )}
    </div>
  );
}
