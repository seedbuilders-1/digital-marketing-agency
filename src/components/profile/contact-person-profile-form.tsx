"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, X } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadArea } from "@/components/ui/upload-area";

// Types and Schemas
import {
  contactPersonProfileSchema,
  type ContactPersonProfileFormData,
} from "@/lib/schemas/profile";

// Constants and Utils
import { getContactPersonProfileDefaultValues } from "@/lib/utils/form";

const ContactPersonProfileForm = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [identificationDocuments, setIdentificationDocuments] = useState<
    string[]
  >([]);
  const router = useRouter();

  const form = useForm<ContactPersonProfileFormData>({
    resolver: zodResolver(contactPersonProfileSchema),
    defaultValues: getContactPersonProfileDefaultValues(),
  });

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };

  const handleDocumentUpload = (imageUrl: string) => {
    setIdentificationDocuments((prev) => [...prev, imageUrl]);
  };

  const removeDocument = (index: number) => {
    setIdentificationDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid = () => {
    const formData = form.getValues();
    return (
      profilePicture &&
      formData.contactPersonName.trim() &&
      identificationDocuments.length > 0
    );
  };

  const onSubmit = (data: ContactPersonProfileFormData) => {
    if (isFormValid()) {
      console.log({
        ...data,
        profilePicture,
        identificationDocuments,
      });
      router.push("/");
    }
  };

  const handleSkip = () => {
    console.log("Profile completion skipped");
    router.push("/");
  };

  return (
    <div className="w-full max-w-[500px] font-['Sora'] ">
      <div className="mb-8">
        <h1 className="font-['Sora'] font-bold text-[32px] leading-10 tracking-[-0.15px] text-[#7642FE] mb-2 text-left max-w-[275px]">
          Contact Person Profile
        </h1>
        <p className="font-['Sora'] text-base text-[#6B7280] mb-8 text-left">
          Complete the KYC registration for your organization
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          {/* Profile Picture Upload */}
          <div className="mb-8">
            <h3 className="font-['Sora'] text-base font-normal text-[#1F2937] mb-4">
              Upload Your Profile Picture
            </h3>
            <div className="w-[120px] h-[120px] rounded-full border-2 border-dashed border-[#D1D5DB] flex flex-col items-center justify-center cursor-pointer bg-[#FAFAFA] relative overflow-hidden transition-colors duration-200 hover:border-[#7642FE] md:w-[100px] md:h-[100px]">
              {profilePicture ? (
                <img
                  src={profilePicture || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <>
                  <Camera size={24} className="text-[#7642FE] mb-2" />
                  <span className="font-['Sora'] text-xs text-[#7642FE] text-center">
                    Upload Photo
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Contact Person Name */}
          <FormField
            control={form.control}
            name="contactPersonName"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel className="font-['Sora'] text-base text-[#1F2937] block mb-2">
                  Name of Contact Person
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter full name"
                    className="w-full p-3 border border-[#D1D5DB] rounded-lg font-['Sora'] text-base text-[#1F2937] focus:outline-none focus:border-[#7642FE] focus:shadow-[0_0_0_3px_rgba(118,66,254,0.1)] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          {/* Document Upload */}
          <div className="mb-8">
            <h3 className="font-['Sora'] text-base font-normal text-[#1F2937] mb-4">
              Upload Valid Means of Identification for Contact Person
            </h3>
            <p className="font-['Sora'] text-sm text-[#6B7280] mb-2">
              e.g. National ID, Drivers License, International Passport, Voters
              ID.
            </p>
            <p className="font-['Sora'] text-sm text-[#6B7280] mb-4">
              Upload multiple high quality images for better results.
            </p>

            <UploadArea onImageUpload={handleDocumentUpload} />

            {identificationDocuments.length > 0 && (
              <div className="flex gap-2.5 mt-2.5 overflow-x-auto pb-2.5">
                {identificationDocuments.map((doc, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={doc || "/placeholder.svg"}
                      alt={`Document ${index + 1}`}
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={!isFormValid()}
              className="bg-[#7642fe] text-white border-none rounded-lg px-6 py-3 text-base font-medium cursor-pointer transition-colors duration-200 font-['Sora'] hover:bg-[#5f35cc] disabled:bg-[#6c757d] disabled:cursor-not-allowed"
            >
              Continue
            </Button>
            <button
              type="button"
              onClick={handleSkip}
              className="bg-none border-none font-['Sora'] text-sm text-[#7642FE] cursor-pointer underline hover:no-underline"
            >
              Skip
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactPersonProfileForm;
