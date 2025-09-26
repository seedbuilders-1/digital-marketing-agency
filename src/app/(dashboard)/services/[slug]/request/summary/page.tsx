/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import {
  useGetServiceByIdQuery,
  useInitializeServiceRequestMutation,
} from "@/api/servicesApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useServiceRequest } from "@/context/ServiceRequestContext";

export default function OrderSummaryPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const serviceId = params.slug;

  const { formData, selectedPlan, resetRequest } = useServiceRequest();
  const [initializeRequest, { isLoading }] =
    useInitializeServiceRequestMutation();

  const { data: serviceData } = useGetServiceByIdQuery(serviceId);
  const service: any = serviceData?.data;
  const formFields = service?.form?.formFields || [];

  const handleSubmit = async () => {
    const toastId = toast.loading("Creating your invoice...");
    try {
      // --- THE FINAL, ROBUST SUBMISSION LOGIC ---
      const submissionData = new FormData();

      const textData: Record<string, any> = {};

      // 1. Separate files from text data based on the form definition
      for (const key in formData) {
        const fieldDef = formFields.find((f: any) => f.name === key);
        if (
          fieldDef?.type === "file" &&
          formData[key] instanceof FileList &&
          formData[key].length > 0
        ) {
          // If it's a file, append it to FormData
          submissionData.append(key, formData[key][0]); // Append the first file
        } else {
          // Otherwise, it's serializable text data
          textData[key] = formData[key];
        }
      }

      const { start_date, end_date, ...dynamicFormData } = formData;

      // 2. Create the JSON payload with dates at the top level.
      const jsonData = JSON.stringify({
        serviceId,
        selectedPlan,
        startDate: start_date, // Use the extracted start_date
        endDate: end_date, // Use the extracted end_date
        formData: dynamicFormData, // The rest of the fields go here
      });
      submissionData.append("jsonData", jsonData);

      // 3. Make the API call with the FormData object
      const result = await initializeRequest(submissionData).unwrap();
      console.log("result", result);

      const invoiceId = result?.data?.invoice.id;
      toast.success("Invoice created successfully!", { id: toastId });

      resetRequest(); // Clear the context state
      router.push(`/invoice/${invoiceId}`);
    } catch (err) {
      console.log("err", err);
      toast.error("Failed to create invoice.", { id: toastId });
    }
  };

  if (!selectedPlan || Object.keys(formData).length === 0) {
    return (
      <div className="text-center p-8">
        <h2>Missing order information.</h2>
        <Button onClick={() => router.push("/services")}>
          Return to Services
        </Button>
      </div>
    );
  }

  // A helper to format field names for display
  const formatLabel = (key: string) => {
    return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Order Review</h1>
      <p className="text-gray-500 mb-8">
        Kindly review your details before you submit
      </p>

      <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
        <div>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Project Brief Review
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <p className="font-semibold text-gray-500">
                  {formatLabel(key)}
                </p>
                <p className="text-gray-800">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Payment Summary
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-500">Selected Plan</p>
              <p className="font-semibold">{selectedPlan.name}</p>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <p>Total</p>
              <p>₦{Number(selectedPlan.price).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-purple-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Processing...
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </div>
    </div>
  );
}
