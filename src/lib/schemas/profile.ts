import * as z from "zod";

export const completeProfileSchema = z.object({
  ownsBusiness: z.enum(["yes", "no"], {
    required_error: "Please select if you own a business",
  }),
  registerWithBusiness: z.enum(["yes", "no"], {
    required_error: "Please select if you are registered with a business",
  }),
});

export const organizationProfileSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  address: z.string().min(1, "Organization address is required"),
  country: z.string().min(1, "Country is required"),
  organizationType: z.string().min(1, "Organization type is required"),
  industry: z.string().min(1, "Industry is required"),
  rcNumber: z.string().min(1, "RC number is required"),
  staffSize: z.string().min(1, "Staff size is required"),
});

export const contactPersonProfileSchema = z.object({
  contactPersonName: z.string().min(1, "Contact person name is required"),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;
export type OrganizationProfileFormData = z.infer<
  typeof organizationProfileSchema
>;
export type ContactPersonProfileFormData = z.infer<
  typeof contactPersonProfileSchema
>;
