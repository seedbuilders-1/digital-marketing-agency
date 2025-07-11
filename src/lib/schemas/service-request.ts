import * as z from "zod";

export const serviceRequestSchema = z.object({
  // Organization Details
  organizationName: z.string().min(1, "Organization name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Please enter a valid email"),
  sector: z.string().min(1, "Sector is required"),
  website: z.string().optional(),
  facebookProfile: z.string().optional(),
  linkedinProfile: z.string().optional(),
  twitterHandle: z.string().optional(),

  // Contact Person
  contactFirstName: z.string().min(1, "First name is required"),
  contactLastName: z.string().min(1, "Last name is required"),

  // Target Audience
  targetAge: z.string().min(1, "Age range is required"),
  targetSex: z.string().min(1, "Sex is required"),
  demography: z.string().min(1, "Demography is required"),
  targetLocation: z.string().min(1, "Target location is required"),
  description: z.string().min(1, "Description is required"),
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;
