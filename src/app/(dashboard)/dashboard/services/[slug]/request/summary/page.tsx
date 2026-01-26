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
import { useValidateReferralMutation } from "@/api/referralApi"; // The new referral validation hook

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Loader2,
  ArrowLeft,
  File as FileIcon,
  Edit,
  Save,
  X,
} from "lucide-react";

// Context
import { useServiceRequest } from "@/context/ServiceRequestContext";

export default function OrderSummaryPage({ params }: any) {
  const router = useRouter();
  const serviceId = params.slug;

  const {
    formData: originalFormData,
    selectedPlan,
    resetRequest,
    setFormData,
  } = useServiceRequest();

  // --- STATE MANAGEMENT ---
  const [isEditing, setIsEditing] = useState(false);
  const [editableFormData, setEditableFormData] = useState(originalFormData);
  const [referralEmail, setReferralEmail] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // --- API HOOKS ---
  const [initializeRequest, { isLoading: isInitializing }] =
    useInitializeServiceRequestMutation();
  const [initializeWithReferral, { isLoading: isReferring }] =
    useInitializeWithReferralMutation();
  const [validateReferral, { isLoading: isValidating }] =
    useValidateReferralMutation();
  const isLoading = isInitializing || isReferring;

  const { data: serviceData } = useGetServiceByIdQuery(serviceId);
  const service: any = serviceData?.data;
  const formFields = service?.form?.formFields || [];

  // --- MEMOIZED VALUES ---
  const originalPrice = useMemo(
    () => Number(selectedPlan?.price || 0),
    [selectedPlan],
  );
  const discountedPrice = useMemo(() => originalPrice * 0.5, [originalPrice]);
  const finalPrice = discountApplied ? discountedPrice : originalPrice;
  const isFree = finalPrice === 0;

  // --- EVENT HANDLERS ---

  // Handles applying the referral discount by calling the validation endpoint first.
  const handleApplyReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralEmail.includes("@")) {
      return toast.error("Please enter a valid email address.");
    }

    const toastId = toast.loading("Validating referral...");
    try {
      await validateReferral({ referralEmail }).unwrap();
      toast.success("50% referral discount applied!", { id: toastId });
      setDiscountApplied(true);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || "This referral email is not valid.", {
        id: toastId,
      });
    }
  };

  // Handlers for the editable form section
  const handleFieldChange = (key: string, value: any) =>
    setEditableFormData((prev) => ({ ...prev, [key]: value }));
  const handleFileChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) handleFieldChange(key, event.target.files);
  };
  const handleSaveChanges = () => {
    setFormData(editableFormData); // Commit changes to global context
    setIsEditing(false);
    toast.success("Your changes have been saved.");
  };
  const handleCancelEdit = () => {
    setEditableFormData(originalFormData); // Revert local state
    setIsEditing(false);
  };

  // Final submission handler
  const handleSubmit = async () => {
    const toastId = toast.loading("Creating your invoice...");
    try {
      const dataToSubmit = isEditing ? editableFormData : originalFormData;
      const submissionData = new FormData();

      for (const key in dataToSubmit) {
        const fieldDef = formFields.find((f: any) => f.name === key);
        if (
          fieldDef?.type === "file" &&
          dataToSubmit[key] instanceof FileList &&
          dataToSubmit[key].length > 0
        ) {
          submissionData.append(key, dataToSubmit[key][0]);
        }
      }

      const { start_date, end_date, ...dynamicFormData } = dataToSubmit;
      const jsonData = JSON.stringify({
        serviceId,
        selectedPlan,
        startDate: start_date,
        endDate: end_date,
        formData: dynamicFormData,
      });
      submissionData.append("jsonData", jsonData);

      let result;
      if (discountApplied && referralEmail) {
        submissionData.append("referralEmail", referralEmail);
        result = await initializeWithReferral(submissionData).unwrap();
      } else {
        result = await initializeRequest(submissionData).unwrap();
      }

      const invoiceId = result?.data?.invoice.id;
      if (!invoiceId) throw new Error("Invoice ID not found in response.");

      // For free plans, redirect to projects page directly
      if (isFree) {
        toast.success(
          "Request submitted successfully! Your project is being processed.",
          {
            id: toastId,
          },
        );
        resetRequest();
        router.push(`/dashboard/projects`);
      } else {
        toast.success(
          "Invoice created successfully! Redirecting to payment...",
          {
            id: toastId,
          },
        );
        resetRequest();
        router.push(`/dashboard/invoice/${invoiceId}`);
      }
    } catch (err: any) {
      console.error("Failed to create invoice:", err);
      toast.error(err?.data?.message || "Failed to create invoice.", {
        id: toastId,
      });
    }
  };

  // --- RENDER LOGIC ---
  if (!selectedPlan || Object.keys(originalFormData).length === 0) {
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

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Order Review</h1>
          <p className="text-gray-500">
            Kindly review and edit your details before you submit.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-8">
        {/* --- EDITABLE Project Brief Review --- */}
        <div>
          <div className="flex justify-between items-center border-b pb-3 mb-6">
            <h2 className="text-xl font-semibold">Project Brief Review</h2>
            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit Brief
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveChanges}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 text-sm">
            {Object.entries(editableFormData).map(([key, value]) => {
              const fieldDef = formFields.find((f: any) => f.name === key);
              const isReadOnly = false; // fieldDef?.fromUser; // Allow editing all fields

              return (
                <div key={key}>
                  <Label className="font-semibold text-gray-500 mb-1">
                    {formatLabel(key)}
                  </Label>
                  {isEditing && !isReadOnly ? (
                    (() => {
                      switch (fieldDef?.type) {
                        case "textarea":
                          return (
                            <Textarea
                              value={value}
                              onChange={(e) =>
                                handleFieldChange(key, e.target.value)
                              }
                              className="mt-1"
                            />
                          );
                        case "file":
                          return (
                            <div className="mt-1">
                              {value instanceof FileList &&
                                value.length > 0 && (
                                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                                    <FileIcon className="h-4 w-4" />
                                    <span>{value[0].name}</span>
                                  </div>
                                )}
                              <Input
                                type="file"
                                onChange={(e) => handleFileChange(key, e)}
                              />
                            </div>
                          );
                        case "date":
                          return (
                            <Input
                              type="date"
                              value={value}
                              onChange={(e) =>
                                handleFieldChange(key, e.target.value)
                              }
                              className="mt-1"
                            />
                          );
                        default:
                          return (
                            <Input
                              value={value}
                              onChange={(e) =>
                                handleFieldChange(key, e.target.value)
                              }
                              className="mt-1"
                            />
                          );
                      }
                    })()
                  ) : (
                    <div className="text-gray-800 break-words mt-1">
                      {fieldDef?.type === "file" &&
                      value instanceof FileList &&
                      value.length > 0 ? (
                        <div className="flex items-center gap-2 text-purple-600 font-medium">
                          <FileIcon className="h-4 w-4" />
                          <span>{value[0].name}</span>
                        </div>
                      ) : (
                        <p
                          className={`${
                            isReadOnly ? "text-gray-500 italic" : ""
                          }`}
                        >
                          {String(value)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Referral Section --- */}
        {/* Only show referral section for paid plans */}
        {!isFree && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-purple-800">
                Refer a Friend & Get 50% Off!
              </h3>
              <p className="text-sm text-purple-700 mt-1 mb-4">
                Enter a friend's email to apply an instant 50% discount to this
                order.
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
                  disabled={discountApplied || isValidating}
                  className="flex-grow bg-white"
                />
                <Button
                  type="submit"
                  disabled={discountApplied || isValidating}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />{" "}
                      Validating...
                    </>
                  ) : discountApplied ? (
                    "Discount Applied!"
                  ) : (
                    "Apply Discount"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

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
              <div className="flex items-center gap-2">
                <p>₦{finalPrice.toLocaleString()}</p>
                {isFree && (
                  <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">
                    FREE
                  </span>
                )}
              </div>
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
          ) : isFree ? (
            "Submit Request"
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </div>
    </div>
  );
}
