/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

// Helper function to check for the FileList type, which is what the browser provides.
const fileList =
  typeof window !== "undefined" ? z.instanceof(FileList) : z.any();

export const completeProfileSchema = z.object({
  // --- File Validations ---
  profilePicture: fileList
    .refine((files) => files?.length === 1, "Profile picture is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 10MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png, .pdf and .webp files are accepted."
    ),

  identification: fileList
    .refine(
      (files) => files?.length >= 1,
      "At least one identification file is required."
    )
    .refine(
      (files) => files?.length <= 5,
      "You can upload a maximum of 5 files."
    )
    .refine(
      (files) =>
        Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE),
      `Each file must be less than 10MB.`
    ),

  // --- Radio Button Validations ---
  // ownsBusiness: z.enum(["yes", "no"], {
  //   required_error: "Please select if you own a business.",
  // }),
  // registerWithBusiness: z.enum(["yes", "no"], {
  //   required_error: "Please select if you are registered with a business.",
  // }),
});

const singleFileSchema = z
  .instanceof(File, { message: "This document is required." })
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    "Only .jpg, .png, .pdf files are accepted."
  );

export const organizationProfileSchema = z.object({
  // Text fields from your schema
  name: z.string().min(2, "Organization name is required."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().min(10, "A full address is required."),
  country: z.string().min(2, "Country is required."),
  industry: z.string().min(2, "Industry/Sector is required."),
  rc_number: z.string().min(5, "A valid RC number is required."),
  staff_size: z.string({ required_error: "Please select your staff size." }),
  type: z.string({ required_error: "Please select your organization type." }),

  // All required file fields
  logo: singleFileSchema,
  certificateOfIncorporation: singleFileSchema,
  memorandumOfAssociation: singleFileSchema,
  proofOfAddress: singleFileSchema,
  statusReport: singleFileSchema,
});

export type OrganizationProfileFormData = z.infer<
  typeof organizationProfileSchema
>;

export const contactPersonProfileSchema = z.object({
  name: z.string().min(3, "Full name is required."),

  // Validation for a single profile picture file
  "profile-pic": z
    .instanceof(File, { message: "Profile picture is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),

  // Validation for multiple ID files
  IDs: z
    .instanceof(FileList)
    .refine(
      (files) => files?.length >= 1,
      "At least one identification file is required."
    )
    .refine(
      (files) => files?.length <= 5,
      "You can upload a maximum of 5 files."
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      `Each file must be less than 10MB.`
    ),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

export type ContactPersonProfileFormData = z.infer<
  typeof contactPersonProfileSchema
>;
