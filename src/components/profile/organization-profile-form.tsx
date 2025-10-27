/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FileText, Loader2, UploadCloud, X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORGANIZATION_OPTIONS } from "@/lib/constants/organization";

// API & State
import { useCreateOrganizationMutation } from "@/api/orgApi";
import {
  selectAccessToken,
  selectCurrentUser,
} from "@/features/auth/selectors";

// Types and Schemas
import {
  organizationProfileSchema,
  type OrganizationProfileFormData,
} from "@/lib/schemas/profile";
import { useAppDispatch } from "@/hooks/rtk";
import { updateUser, updateUserOrganization } from "@/features/auth/authSlice";
import { useGetAuthenticateduserQuery } from "@/api/userApi";

// --- NEW HELPER FUNCTION ---
/**
 * Handles the direct-to-Cloudinary upload process for a single file.
 * @param file - The file to upload.
 * @returns The secure URL of the uploaded file.
 */
const uploadFileToCloudinary = async (
  file: File,
  token: string | null
): Promise<string> => {
  if (!token) {
    throw new Error("Authentication token not found. Cannot upload file.");
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const signatureUrl = `${apiBaseUrl}/api/media/generate-signature`;

  // --- THE FIX IS HERE ---
  // We add a `headers` object to the fetch options.
  const response = await fetch(signatureUrl, {
    method: "GET", // Explicitly setting the method
    headers: {
      // This is the standard way to send a JWT token
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Provide a more specific error message from the backend if available
    throw new Error(
      errorData.message || "Failed to get an upload signature from the server."
    );
  }

  const { signature, timestamp } = await response.json();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  if (!cloudName || !apiKey) {
    // This provides a much clearer error message during development.
    throw new Error(
      "Cloudinary environment variables are not configured correctly."
    );
  }

  // The rest of the function remains the same...
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("folder", "organization_documents");

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const uploadResponse = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const data = await uploadResponse.json();
  if (!uploadResponse.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed.");
  }
  return data.secure_url;
};

// A reusable sub-component for a clean, single file upload field
const FileUploadField = ({
  field,
  label,
  onRemove,
}: {
  field: any;
  label: string;
  onRemove: () => void;
}) => {
  const file = field.value as File | undefined;
  return (
    <FormItem>
      <FormLabel className="text-base text-[#1F2937] font-normal font-['Sora']">
        {label}
      </FormLabel>
      {!file ? (
        <div
          className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-[#7642FE] transition-colors"
          onClick={() => document.getElementById(field.name)?.click()}
        >
          <UploadCloud className="mx-auto text-gray-400 mb-2" />
          <p className="text-xs text-gray-500">Click or drag & drop file</p>
          <FormControl>
            <Input
              id={field.name}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          </FormControl>
        </div>
      ) : (
        <div className="relative w-full p-2 border rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="h-6 w-6 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">{file.name}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-6 w-6 flex-shrink-0"
          >
            <X size={16} />
          </Button>
        </div>
      )}
      <FormMessage className="text-[#dc3545] text-xs" />
    </FormItem>
  );
};

// The main form component
export default function OrganizationProfileForm() {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const [createOrganization, { isLoading }] = useCreateOrganizationMutation();

  const dispatch = useAppDispatch();
  const { refetch: refetchUser } = useGetAuthenticateduserQuery(undefined);

  const form = useForm<OrganizationProfileFormData>({
    resolver: zodResolver(organizationProfileSchema),
    mode: "onBlur",
  });

  const authToken = useSelector(selectAccessToken);

  // --- REFACTORED onSubmit FUNCTION ---
  const onSubmit = async (data: OrganizationProfileFormData) => {
    if (!user?.id) {
      return toast.error("Your session has expired. Please log in again.");
    }

    const toastId = toast.loading("Preparing your documents...");

    try {
      // 1. Define all files that need to be uploaded
      const filesToProcess = [
        { key: "logo", file: data.logo },
        {
          key: "certificateOfIncorporation",
          file: data.certificateOfIncorporation,
        },
        { key: "memorandumOfAssociation", file: data.memorandumOfAssociation },
        { key: "proofOfAddress", file: data.proofOfAddress },
        { key: "statusReport", file: data.statusReport },
      ];

      // 2. Compress the logo on the client-side before uploading
      const compressedLogo = await imageCompression(data.logo, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      toast.loading("Uploading documents. This will be quick...", {
        id: toastId,
      });

      // 3. Upload all files directly to Cloudinary in parallel for max speed
      const uploadPromises = filesToProcess.map(async (fileObj) => {
        const fileToUpload =
          fileObj.key === "logo" ? compressedLogo : fileObj.file;
        const url = await uploadFileToCloudinary(fileToUpload, authToken);
        return { [fileObj.key]: url };
      });

      const uploadedUrlsArray = await Promise.all(uploadPromises);
      const uploadedUrls = Object.assign({}, ...uploadedUrlsArray);

      // 4. Prepare the final JSON payload for your server
      toast.loading("Finalizing your organization profile...", { id: toastId });
      const finalPayload = {
        name: data.name,
        email: data.email,
        address: data.address,
        country: data.country,
        industry: data.industry,
        rc_number: data.rc_number,
        staff_size: data.staff_size,
        type: data.type,
        logo_url: uploadedUrls.logo,
        cert_of_inc_url: uploadedUrls.certificateOfIncorporation,
        mem_of_assoc_url: uploadedUrls.memorandumOfAssociation,
        proof_of_address_url: uploadedUrls.proofOfAddress,
        company_status_report_url: uploadedUrls.statusReport,
      };

      // 5. Call the RTK Query mutation with the JSON data
      const res = await createOrganization({
        userId: user.id,
        formData: finalPayload, // The backend now receives JSON, not FormData
      }).unwrap();

      dispatch(updateUserOrganization(res));
      toast.success("Organization profile created successfully!", {
        id: toastId,
      });

      const refetchUserDetails = await refetchUser();
      const newUser = refetchUserDetails?.data?.data;
      dispatch(updateUser(newUser));

      router.push("/contact-person-profile");
    } catch (err: any) {
      // Catch errors from signature fetching, Cloudinary upload, or your API
      toast.error(
        err?.data?.message || err.message || "An unexpected error occurred.",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <div className="w-full max-w-[500px] font-['Sora']">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#7642FE] mb-2 font-['Sora'] leading-10 tracking-[-0.15px] max-w-[275px]">
          Organization Profile
        </h1>
        <p className="text-base text-[#6B7280] mb-8 font-['Sora']">
          Complete the KYC registration for your organization
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Text and Select Fields (No changes needed here) */}
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  Organization Name
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-full p-3" />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  Organization Email
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="w-full p-3" />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  Organization Address
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="w-full p-3" />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  Country
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_OPTIONS.COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  Organization Type
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_OPTIONS.TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="industry"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  Industry/Sector
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_OPTIONS.INDUSTRIES.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="rc_number"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  RC Number
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-full p-3" />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="staff_size"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  Staff Size
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_OPTIONS.STAFF_SIZES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          {/* Document Upload Section (No changes needed here) */}
          <div className="space-y-4 pt-4 border-t mt-4">
            <h3 className="text-lg font-semibold text-[#1F2937]">
              Required Documents
            </h3>
            <p className="text-sm text-gray-500">
              Please upload all of the following documents.
            </p>
            <FormField
              name="logo"
              control={form.control}
              render={({ field }) => (
                <FileUploadField
                  field={field}
                  label="Company Logo"
                  onRemove={() =>
                    form.setValue("logo", undefined as any, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />
            <FormField
              name="certificateOfIncorporation"
              control={form.control}
              render={({ field }) => (
                <FileUploadField
                  field={field}
                  label="Certificate of Incorporation"
                  onRemove={() =>
                    form.setValue(
                      "certificateOfIncorporation",
                      undefined as any,
                      { shouldValidate: true }
                    )
                  }
                />
              )}
            />
            <FormField
              name="memorandumOfAssociation"
              control={form.control}
              render={({ field }) => (
                <FileUploadField
                  field={field}
                  label="Memorandum of Association"
                  onRemove={() =>
                    form.setValue("memorandumOfAssociation", undefined as any, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />
            <FormField
              name="proofOfAddress"
              control={form.control}
              render={({ field }) => (
                <FileUploadField
                  field={field}
                  label="Proof of Business Address"
                  onRemove={() =>
                    form.setValue("proofOfAddress", undefined as any, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />
            <FormField
              name="statusReport"
              control={form.control}
              render={({ field }) => (
                <FileUploadField
                  field={field}
                  label="Company Status Report"
                  onRemove={() =>
                    form.setValue("statusReport", undefined as any, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7642fe] text-white py-3 disabled:bg-gray-400"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit & Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
