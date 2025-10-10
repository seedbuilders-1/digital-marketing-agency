import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Please enter a valid email"),
    tel: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d+$/, "Please enter only numbers"),
    address: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    category: z.enum(["individual", "organisation"], {
      required_error: "Please select user type",
    }),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const verifyOTPSchema = z.object({
  otp: z
    .string()
    .min(6, "Please enter the 4-digit code")
    .max(6, "Code must be 4 digits")
    .regex(/^\d{6}$/, "Please enter only numbers"),
});

export const createPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerifyOTPFormData = z.infer<typeof verifyOTPSchema>;
export type CreatePasswordFormData = z.infer<typeof createPasswordSchema>;
