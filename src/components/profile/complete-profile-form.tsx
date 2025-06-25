"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, X } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UploadArea } from "@/components/ui/upload-area";

// Types and Schemas
import {
  completeProfileSchema,
  type CompleteProfileFormData,
} from "@/lib/schemas/profile";

// Constants and Utils
import { getCompleteProfileDefaultValues } from "@/lib/utils/form";

const CompleteProfileForm = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [identificationFiles, setIdentificationFiles] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: getCompleteProfileDefaultValues(),
  });

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      console.log("Profile picture uploaded:", file.name);
    }
  };

  const handleIdentificationUpload = (imageUrl: string) => {
    setIdentificationFiles((prev) => [...prev, imageUrl]);
    console.log("Identification file uploaded");
  };

  const removeIdentificationFile = (index: number) => {
    setIdentificationFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerProfilePictureUpload = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const fileInput = document.getElementById(
      "profile-picture-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const isFormValid = () => {
    return (
      profilePicture &&
      identificationFiles.length > 0 &&
      form.watch("ownsBusiness") &&
      form.watch("registerWithBusiness")
    );
  };

  const onSubmit = (data: CompleteProfileFormData) => {
    if (isFormValid()) {
      console.log({
        ...data,
        profilePicture,
        identificationFiles,
      });
      router.push("/organization-profile");
    }
  };

  const handleSkip = () => {
    console.log("Skipped profile completion");
    router.push("/organization-profile");
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
          {/* Profile Picture Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-3 font-['Sora']">
              Upload Your Profile Picture
            </h2>
            {profilePicture ? (
              <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden mb-4">
                <img
                  src={profilePicture || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={triggerProfilePictureUpload}
                  className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white border-none p-2 text-sm cursor-pointer font-['Sora']"
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
                  className="bg-[#7642FE] text-white border-none rounded px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 font-['Sora'] hover:bg-[#5f35cc]"
                >
                  Upload
                </Button>
              </div>
            )}
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </div>

          {/* Identification Upload Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#333333] mb-3 font-['Sora']">
              Upload Valid Means of Identification
            </h2>
            <p className="text-sm font-normal text-[#666666] mb-4 leading-[1.4] font-['Sora']">
              e.g. National ID, Drivers License, International Passport, Voters
              ID.
            </p>
            <p className="text-xs font-normal text-[#777] mb-4 italic font-['Sora']">
              Upload multiple high quality images for better results
            </p>

            <UploadArea onImageUpload={handleIdentificationUpload} />

            {identificationFiles.length > 0 && (
              <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-2.5">
                {identificationFiles.map((file, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={file || "/placeholder.svg"}
                      alt={`ID ${index + 1}`}
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeIdentificationFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Business Ownership Question */}
          <div className="mb-6">
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
          </div>

          {/* Business Registration Question */}
          <div className="mb-6">
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
          </div>

          {/* Form Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              type="button"
              onClick={handleSkip}
              variant="outline"
              className="bg-none text-[#666666] border border-[#CED4DA] rounded-lg px-6 py-3 text-base font-medium cursor-pointer transition-colors duration-200 font-['Sora'] hover:bg-[#f8f9fa]"
            >
              Skip
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid()}
              className="bg-[#7642fe] text-white border-none rounded-lg px-6 py-3 text-base font-medium cursor-pointer transition-colors duration-200 font-['Sora'] hover:bg-[#5f35cc] disabled:bg-[#6c757d] disabled:cursor-not-allowed"
            >
              Complete Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompleteProfileForm;
