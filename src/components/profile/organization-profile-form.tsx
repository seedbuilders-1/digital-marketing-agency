/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FileText, Loader2, UploadCloud, X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

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
import { ORGANIZATION_OPTIONS } from "@/lib/constants/organization"; // Your constants for select options

// API & State
import { useCreateOrganizationMutation } from "@/api/orgApi";
import { selectCurrentUser } from "@/features/auth/selectors";

// Types and Schemas
import {
  organizationProfileSchema,
  type OrganizationProfileFormData,
} from "@/lib/schemas/profile";
import { useAppDispatch } from "@/hooks/rtk";
import { updateUser, updateUserOrganization } from "@/features/auth/authSlice";
import { useGetAuthenticateduserQuery } from "@/api/userApi";

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
    mode: "onBlur", // Validate fields when the user moves away from them
  });

  const onSubmit = async (data: OrganizationProfileFormData) => {
    if (!user?.id) {
      return toast.error("Your session has expired. Please log in again.");
    }

    const toastId = toast.loading("Saving your organization profile...");

    // 1. Create FormData object for multipart submission
    const formData = new FormData();

    // 2. Append all fields with the exact names the backend expects
    formData.append("logo", data.logo);
    formData.append(
      "certificateOfIncorporation",
      data.certificateOfIncorporation
    );
    formData.append("memorandumOfAssociation", data.memorandumOfAssociation);
    formData.append("proofOfAddress", data.proofOfAddress);
    formData.append("statusReport", data.statusReport);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("country", data.country);
    formData.append("industry", data.industry);
    formData.append("rc_number", data.rc_number);
    formData.append("staff_size", data.staff_size);
    formData.append("type", data.type);

    try {
      // 3. Call the RTK Query mutation
      const res = await createOrganization({
        userId: user.id,
        formData,
      }).unwrap();
      console.log("res", res);
      dispatch(updateUserOrganization(res));
      toast.success("Organization profile created successfully!", {
        id: toastId,
      });
      const refetchUserDetails = await refetchUser();
      const newUser = refetchUserDetails?.data?.data;
      dispatch(updateUser(newUser));

      // 4. Navigate to the next step on success
      router.push("/contact-person-profile");
    } catch (err: any) {
      toast.error(err?.data?.message || "An unexpected error occurred.", {
        id: toastId,
      });
    }
  };

  // const handleSkip = () => {
  //   router.push("/contact-person-profile");
  // };

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
          {/* Text and Select Fields */}
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#1F2937] font-normal">
                  Organization Name
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-full p-3 border..." />
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
                  <Input
                    type="email"
                    {...field}
                    className="w-full p-3 border..."
                  />
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
                  <Textarea {...field} className="w-full p-3 border..." />
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
                  <Input {...field} className="w-full p-3 border..." />
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

          {/* Document Upload Section */}
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
            className="w-full bg-[#7642fe] text-white py-3 ... disabled:bg-gray-400"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit & Continue
          </Button>

          {/* <button
            type="button"
            onClick={handleSkip}
            className="bg-none border-none text-[#7642FE] ..."
          >
            Skip for now
          </button> */}
        </form>
      </Form>
    </div>
  );
}
