/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Camera, X, Loader2 } from "lucide-react";
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
import { UploadArea } from "@/components/ui/upload-area"; // Your updated UploadArea component

// API & State
import { useCreateContactMutation } from "@/api/orgApi";

// Types and Schemas
import {
  contactPersonProfileSchema,
  type ContactPersonProfileFormData,
} from "@/lib/schemas/profile";
import { selectCurrentUser } from "@/features/auth/selectors";
import { updateOrganisationContact } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/rtk";

// Helper to generate temporary preview URLs
const getPreviewUrl = (file: File) => URL.createObjectURL(file);

const ContactPersonProfileForm = () => {
  const router = useRouter();
  const user = useSelector(selectCurrentUser) as any;
  console.log("user", user);
  const organization = user?.organisation;
  const [createContact, { isLoading }] = useCreateContactMutation();

  const dispatch = useAppDispatch();

  const form = useForm<ContactPersonProfileFormData>({
    resolver: zodResolver(contactPersonProfileSchema),
    mode: "onBlur",
  });

  // Watch form fields to generate live previews
  const profilePictureFile = form.watch("profile-pic");
  const identificationFiles = form.watch("IDs");

  const profilePicturePreview = useMemo(() => {
    return profilePictureFile ? getPreviewUrl(profilePictureFile) : null;
  }, [profilePictureFile]);

  const identificationFilesPreview = useMemo(() => {
    if (!identificationFiles) return [];
    return Array.from(identificationFiles).map(getPreviewUrl);
  }, [identificationFiles]);

  const handleIdentificationUpload = (file: File) => {
    const currentFiles = Array.from(form.getValues("IDs") || []);
    if (currentFiles.length < 5) {
      const dataTransfer = new DataTransfer();
      [...currentFiles, file].forEach((f) => dataTransfer.items.add(f));
      form.setValue("IDs", dataTransfer.files, { shouldValidate: true });
    } else {
      toast.warning("You can upload a maximum of 5 identification files.");
    }
  };

  const removeIdentificationFile = (indexToRemove: number) => {
    const newFiles = Array.from(form.getValues("IDs")).filter(
      (_, i) => i !== indexToRemove
    );
    const dataTransfer = new DataTransfer();
    newFiles.forEach((f) => dataTransfer.items.add(f));
    form.setValue("IDs", dataTransfer.files, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactPersonProfileFormData) => {
    if (!organization?.id) {
      return toast.error(
        "Organization details not found. Please go back to the previous step."
      );
    }

    const toastId = toast.loading("Saving contact person details...");

    // 1. Create FormData and append all fields
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("organisation_id", organization?.id);
    formData.append("profile-pic", data["profile-pic"]);
    Array.from(data.IDs).forEach((file) => {
      formData.append("IDs", file);
    });

    try {
      // 2. Call the mutation
      const res = await createContact(formData).unwrap();
      toast.success("Profile setup complete!", { id: toastId });

      dispatch(updateOrganisationContact(res));

      console.log("res", res);

      // 3. Navigate to the dashboard or next page
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "An unexpected error occurred.", {
        id: toastId,
      });
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-[500px] font-['Sora']">
      <div className="mb-8">
        <h1 className="font-['Sora'] font-bold text-[32px] ... text-[#7642FE]">
          Contact Person Profile
        </h1>
        <p className="font-['Sora'] text-base text-[#6B7280] ...">
          Complete the KYC registration for your organization
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          {/* Profile Picture Upload */}
          <FormField
            control={form.control}
            name="profile-pic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-['Sora'] text-base ...">
                  Upload Your Profile Picture
                </FormLabel>
                <div
                  className="w-[120px] h-[120px] rounded-full ... relative overflow-hidden"
                  onClick={() => document.getElementById("pfp-input")?.click()}
                >
                  {profilePicturePreview ? (
                    <img
                      src={profilePicturePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAFAFA] border-2 border-dashed ...">
                      <Camera size={24} className="text-[#7642FE] mb-2" />
                      <span className="text-xs text-[#7642FE]">
                        Upload Photo
                      </span>
                    </div>
                  )}
                  <FormControl>
                    <Input
                      id="pfp-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          {/* Contact Person Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-['Sora'] text-base ...">
                  Name of Contact Person
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          {/* Document Upload */}
          <FormField
            control={form.control}
            name="IDs"
            render={() => (
              <FormItem>
                <FormLabel className="font-['Sora'] text-base ...">
                  Upload Valid Means of Identification
                </FormLabel>
                <p className="font-['Sora'] text-sm text-[#6B7280] mb-4">
                  e.g. National ID, Drivers License, etc.
                </p>
                <UploadArea onFileSelect={handleIdentificationUpload} />
                <FormMessage className="text-[#dc3545] text-xs mt-2" />
                {identificationFilesPreview.length > 0 && (
                  <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-2.5">
                    {identificationFilesPreview.map((docUrl, index) => (
                      <div key={docUrl} className="relative flex-shrink-0">
                        <img
                          src={docUrl}
                          alt={`Doc ${index + 1}`}
                          className="w-[100px] h-[100px] object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeIdentificationFile(index)}
                          className="absolute -top-2 -right-2 ..."
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Form Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#7642fe] ... disabled:bg-gray-400"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Finish Setup
            </Button>
            <button
              type="button"
              onClick={handleSkip}
              className="bg-none border-none ... text-[#7642FE]"
            >
              Skip for now
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactPersonProfileForm;
