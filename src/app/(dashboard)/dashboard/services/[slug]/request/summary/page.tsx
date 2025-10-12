/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useGetServiceByIdQuery,
  useInitializeServiceRequestMutation,
  useInitializeWithReferralMutation,
} from "@/api/servicesApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ArrowLeft, File as FileIcon } from "lucide-react";
import { useServiceRequest } from "@/context/ServiceRequestContext";

export default function OrderSummaryPage({ params }: any) {
  const router = useRouter();
  const serviceId = params.slug;

  const { formData, selectedPlan, resetRequest } = useServiceRequest();

  // --- STATE FOR THE NEW REFERRAL FEATURE ---
  const [referralEmail, setReferralEmail] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // --- API HOOKS ---
  const [initializeRequest, { isLoading: isInitializing }] =
    useInitializeServiceRequestMutation();
  const [initializeWithReferral, { isLoading: isReferring }] =
    useInitializeWithReferralMutation();
  const isLoading = isInitializing || isReferring;

  const { data: serviceData } = useGetServiceByIdQuery(serviceId);
  const service: any = serviceData?.data;
  const formFields = service?.form?.formFields || [];

  // --- MEMOIZED VALUES FOR DISPLAY ---
  const originalPrice = useMemo(
    () => Number(selectedPlan?.price || 0),
    [selectedPlan]
  );
  const discountedPrice = useMemo(() => originalPrice * 0.5, [originalPrice]);
  const finalPrice = discountApplied ? discountedPrice : originalPrice;

  // --- EVENT HANDLERS ---
  const handleApplyReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralEmail.includes("@")) {
      return toast.error("Please enter a valid email address.");
    }
    toast.success("50% referral discount applied!");
    setDiscountApplied(true);
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Creating your invoice...");
    try {
      // 1. Create FormData and append files
      const submissionData = new FormData();
      for (const key in formData) {
        const fieldDef = formFields.find((f: any) => f.name === key);
        if (
          fieldDef?.type === "file" &&
          formData[key] instanceof FileList &&
          formData[key].length > 0
        ) {
          submissionData.append(key, formData[key][0]);
        }
      }

      // 2. Prepare and stringify the JSON data
      const { start_date, end_date, ...dynamicFormData } = formData;
      const jsonData = JSON.stringify({
        serviceId,
        selectedPlan,
        startDate: start_date,
        endDate: end_date,
        formData: dynamicFormData,
      });
      submissionData.append("jsonData", jsonData);

      let result;
      // 3. Conditionally call the correct API endpoint
      if (discountApplied && referralEmail) {
        submissionData.append("referralEmail", referralEmail);
        result = await initializeWithReferral(submissionData).unwrap();
      } else {
        result = await initializeRequest(submissionData).unwrap();
      }

      const invoiceId = result?.data?.invoice.id;
      if (!invoiceId) throw new Error("Invoice ID not found in response.");

      toast.success("Invoice created successfully! Redirecting...", {
        id: toastId,
      });

      resetRequest(); // Clear the context state after successful submission
      router.push(`/dashboard/invoice/${invoiceId}`);
    } catch (err: any) {
      console.error("Failed to create invoice:", err);
      toast.error(err?.data?.message || "Failed to create invoice.", {
        id: toastId,
      });
    }
  };

  // --- RENDER LOGIC ---
  if (!selectedPlan || Object.keys(formData).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Missing Order Information
        </h2>
        <p className="text-gray-600 mb-6">
          It looks like your session has expired. Please start your request
          again.
        </p>
        <Button onClick={() => router.push("/dashboard/services")}>
          Return to Services
        </Button>
      </div>
    );
  }

  const formatLabel = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const renderValue = (key: string, value: any) => {
    const fieldDef = formFields.find((f: any) => f.name === key);
    if (
      fieldDef?.type === "file" &&
      value instanceof FileList &&
      value.length > 0
    ) {
      return (
        <div className="flex items-center gap-2 text-purple-600">
          <FileIcon className="h-4 w-4" />
          <span>{value[0].name}</span>
        </div>
      );
    }
    return String(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Order Review</h1>
          <p className="text-gray-500">
            Kindly review your details before you submit.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-8">
        {/* --- Project Brief Review --- */}
        <div>
          <h2 className="text-xl font-semibold border-b pb-3 mb-6">
            Project Brief Review
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <p className="font-semibold text-gray-500 mb-1">
                  {formatLabel(key)}
                </p>
                <div className="text-gray-800 break-words">
                  {renderValue(key, value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Referral Section --- */}
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-purple-800">
              Refer a Friend & Get 50% Off!
            </h3>
            <p className="text-sm text-purple-700 mt-1 mb-4">
              Enter a friend's email address to apply an instant 50% discount to
              this order.
            </p>
            <form
              onSubmit={handleApplyReferral}
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              <Label htmlFor="referral-email" className="sr-only">
                Referral Email
              </Label>
              <Input
                id="referral-email"
                type="email"
                placeholder="friend@example.com"
                value={referralEmail}
                onChange={(e) => setReferralEmail(e.target.value)}
                disabled={discountApplied}
                className="flex-grow bg-white"
              />
              <Button
                type="submit"
                disabled={discountApplied}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
              >
                {discountApplied ? "Discount Applied!" : "Apply Discount"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* --- Payment Summary --- */}
        <div>
          <h2 className="text-xl font-semibold border-b pb-3 mb-6">
            Payment Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <p className="text-gray-500">Selected Plan</p>
              <p className="font-semibold">{selectedPlan.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Subtotal</p>
              <p>₦{originalPrice.toLocaleString()}</p>
            </div>
            {discountApplied && (
              <div className="flex justify-between text-green-600 font-medium">
                <p>Referral Discount (50%)</p>
                <p>- ₦{(originalPrice - discountedPrice).toLocaleString()}</p>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
              <p>Total</p>
              <p>₦{finalPrice.toLocaleString()}</p>
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
          className="bg-purple-600 hover:bg-purple-700"
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
