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
  FormMessage,
} from "@/components/ui/form";
import { UploadArea } from "@/components/ui/upload-area";

// API & State
import { selectCurrentUser } from "@/features/auth/selectors";

// Types and Schemas (using the version with file validation)
import {
  completeProfileSchema,
  type CompleteProfileFormData,
} from "@/lib/schemas/profile";
import {
  useCompleteUserProfileMutation,
  useGetAuthenticateduserQuery,
} from "@/api/userApi";
import { useAppDispatch } from "@/hooks/rtk";
import { updateUser } from "@/features/auth/authSlice";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { Label } from "../ui/label";

// Helper to generate temporary preview URLs from File objects
const getPreviewUrl = (file: any) => URL.createObjectURL(file);

const CompleteProfileForm = () => {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const [completeProfile, { isLoading }] = useCompleteUserProfileMutation();

  const { refetch: refetchUser } = useGetAuthenticateduserQuery(undefined);

  const dispatch = useAppDispatch();

  // --- FORM SETUP ---
  // react-hook-form is now the single source of truth for all form fields, including files.
  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      // ownsBusiness: undefined,
      // registerWithBusiness: undefined,
      // No default values needed for files; they will be FileList objects
    },
    mode: "onChange", // Validate fields as the user interacts with them
  });

  // --- WATCH FORM VALUES FOR PREVIEWS ---
  // We use form.watch() to get the current file values to generate previews.
  const profilePictureFiles = form.watch("profilePicture");
  const identificationFilelist = form.watch("identification");

  // --- MEMOIZED PREVIEW URLS ---
  const profilePicturePreview = useMemo(() => {
    const file = profilePictureFiles?.[0];
    return file ? getPreviewUrl(file) : null;
  }, [profilePictureFiles]);

  const identificationFilesPreview = useMemo(() => {
    if (!identificationFilelist) return [];
    return Array.from(identificationFilelist).map(getPreviewUrl);
  }, [identificationFilelist]);

  // --- FILE HANDLERS (using form.setValue) ---
  const handleIdentificationUpload = (file: File) => {
    const currentFiles = Array.from(form.getValues("identification") || []);
    if (currentFiles.length < 5) {
      const newFiles = [...currentFiles, file];
      // Create a new FileList for react-hook-form
      const dataTransfer: any = new DataTransfer();
      newFiles.forEach((f) => dataTransfer.items.add(f));
      form.setValue("identification", dataTransfer.files, {
        shouldValidate: true,
      });
    } else {
      toast.warning("You can upload a maximum of 5 identification files.");
    }
  };

  const removeIdentificationFile = (indexToRemove: number) => {
    const currentFiles = Array.from(form.getValues("identification") || []);
    const newFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    const dataTransfer = new DataTransfer();
    newFiles.forEach((f: any) => dataTransfer.items.add(f));
    form.setValue("identification", dataTransfer.files, {
      shouldValidate: true,
    });
  };

  const triggerProfilePictureUpload = () => {
    document.getElementById("profile-picture-upload")?.click();
  };

  // --- FORM SUBMISSION ---
  const onSubmit = async (data: any) => {
    if (!user?.id) {
      toast.error("You must be logged in to complete your profile.");
      return;
    }

    const toastId = toast.loading("Uploading files and saving profile...");

    // 1. Create FormData object
    const formData: any = new FormData();

    // 2. Append all fields directly from the validated form data
    formData.append("profile-pic", data.profilePicture[0]);
    Array.from(data.identification).forEach((file) => {
      formData.append("IDs", file);
    });
    // formData.append("business_status", data.ownsBusiness);
    // formData.append("registered_with_a_business", data.registerWithBusiness);

    try {
      // 3. Call the RTK Query mutation
      await completeProfile({ userId: user.id, formData }).unwrap();
      const refetchUserDetails = await refetchUser();
      const newUser = refetchUserDetails?.data?.data;
      dispatch(updateUser(newUser));
      toast.success("Profile completed successfully!", { id: toastId });
      router.push("/dashboard/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full max-w-[500px] font-['Sora']">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#7642FE] mb-2 font-['Sora'] leading-10 tracking-[-0.15px] max-w-[275px]">
          Complete Your Profile
        </h1>
        <p className="text-base font-normal text-[#666666] mb-8 leading-6 font-['Sora']">
          Complete your KYC registration
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* --- Profile Picture Section --- */}
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem className="mb-6">
                <h2 className="text-xl font-semibold text-[#333333] mb-3 font-['Sora']">
                  Upload Your Profile Picture (PDF/Images)
                </h2>
                {profilePicturePreview ? (
                  <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden mb-4">
                    <img
                      src={profilePicturePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={triggerProfilePictureUpload}
                      className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-sm"
                    >
                      Change image
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center mb-4">
                    <div
                      className="w-20 h-20 rounded-full bg-[#E5E7EB] flex items-center justify-center mb-2.5 text-[#6B7280] cursor-pointer"
                      onClick={triggerProfilePictureUpload}
                    >
                      <Camera size={32} />
                    </div>
                    <Button
                      type="button"
                      onClick={triggerProfilePictureUpload}
                      className="bg-[#7642FE] text-white rounded px-4 py-2 text-sm hover:bg-[#5f35cc]"
                    >
                      Upload
                    </Button>
                  </div>
                )}
                <FormControl>
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          {/* --- Identification Upload Section --- */}
          <FormField
            control={form.control}
            name="identification"
            render={() => (
              <FormItem className="mb-6">
                <h2 className="text-xl font-semibold text-[#333333] mb-3">
                  Upload Valid Means of Identification
                </h2>
                <p className="text-sm font-normal text-[#666666] mb-4">
                  e.g. National ID, Drivers License, etc.
                </p>
                <UploadArea onFileSelect={handleIdentificationUpload} />
                <FormMessage className="text-red-500 text-xs mt-2" />
                {identificationFilesPreview.length > 0 && (
                  <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-2.5">
                    {identificationFilesPreview.map((fileUrl, index) => (
                      <div key={fileUrl} className="relative flex-shrink-0">
                        <img
                          src={fileUrl}
                          alt={`ID ${index + 1}`}
                          className="w-[100px] h-[100px] object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeIdentificationFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 ..."
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

          {/* Business Ownership Question */}
          {/* <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-3 font-['Sora']">
              Do you own a registered business?
            </h2>
            <div className="my-2.5">
              <p className="font-['Sora'] text-sm text-black mb-3 leading-[1.4]">
                Please let us know if you own a registered business. This will
                help us tailor your experience and provide the most relevant
                services for your needs.
              </p>
              <FormField
                control={form.control}
                name="ownsBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="yes"
                            id="owns-business-yes"
                            className="accent-[#7642fe]"
                          />
                          <Label
                            htmlFor="owns-business-yes"
                            className="font-['Sora'] text-sm text-black cursor-pointer"
                          >
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="no"
                            id="owns-business-no"
                            className="accent-[#7642fe]"
                          />
                          <Label
                            htmlFor="owns-business-no"
                            className="font-['Sora'] text-sm text-black cursor-pointer"
                          >
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-[#dc3545] text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div> */}

          {/* Business Registration Question */}
          {/* <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-3 font-['Sora']">
              Are you registered with a business or organization?
            </h2>
            <div className="my-2.5">
              <p className="font-['Sora'] text-sm text-black mb-3 leading-[1.4]">
                Please let us know if you are registered with a business or
                organization. This will help us tailor your experience and
                provide the most relevant services for your needs.
              </p>
              <FormField
                control={form.control}
                name="registerWithBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="yes"
                            id="register-business-yes"
                            className="accent-[#7642fe]"
                          />
                          <Label
                            htmlFor="register-business-yes"
                            className="font-['Sora'] text-sm text-black cursor-pointer"
                          >
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="no"
                            id="register-business-no"
                            className="accent-[#7642fe]"
                          />
                          <Label
                            htmlFor="register-business-no"
                            className="font-['Sora'] text-sm text-black cursor-pointer"
                          >
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-[#dc3545] text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div> */}

          {/* --- Form Buttons --- */}
          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#7642fe] ... disabled:bg-gray-400"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompleteProfileForm;
