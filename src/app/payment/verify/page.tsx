/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useVerifyPaystackPaymentQuery } from "@/api/invoiceApi";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  // This query will automatically run when 'reference' is available.
  // The 'skip' option prevents it from running on the initial render if 'reference' is null.
  const { data, isLoading, isSuccess, isError, error } =
    useVerifyPaystackPaymentQuery(reference!, {
      skip: !reference,
    });

  // Handle cases where the reference is missing entirely
  useEffect(() => {
    if (!reference && !isLoading) {
      toast.error("Invalid payment URL. No reference found.");
      router.push("/dashboard"); // Redirect to a safe page
    }
  }, [reference, isLoading, router]);

  // Loading State
  if (isLoading || !reference) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">
          Verifying Your Payment
        </h1>
        <p className="text-gray-500">Please wait, do not refresh the page.</p>
      </div>
    );
  }

  // Error State
  if (isError) {
    // Extract a more user-friendly error message if available
    const errorMessage =
      (error as any)?.data?.message || "An unknown error occurred.";
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <XCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Failed</h1>
        <p className="text-gray-500 max-w-md">
          There was an issue verifying your payment.
          <br />
          <span className="font-semibold text-red-600">{errorMessage}</span>
        </p>
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/projects")}
          >
            Go to Projects
          </Button>
          <Button
            className="bg-purple-600"
            onClick={() => router.back()} // Go back to the invoice page to try again
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Success State
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">
          Transaction Successful!
        </h1>
        <p className="text-gray-500">
          Your payment has been validated and your invoice is now marked as
          paid.
        </p>
        <Button
          className="bg-purple-600 mt-8"
          onClick={() =>
            router.push(
              `/dashboard/projects/${data.invoice.service_request_id}`
            )
          }
        >
          Go to Your Project
        </Button>
      </div>
    );
  }

  // Fallback (should not be reached)
  return null;
}
