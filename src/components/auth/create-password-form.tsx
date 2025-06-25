"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";

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
import { Alert, AlertDescription } from "@/components/ui/alert";

// Types and Schemas
import {
  createPasswordSchema,
  type CreatePasswordFormData,
} from "@/lib/schemas/auth";

// Constants and Utils
import { FORM_MESSAGES, AUTH_ROUTES } from "@/lib/constants/auth";
import { getCreatePasswordDefaultValues } from "@/lib/utils/form";
import { validatePasswordStrength } from "@/lib/utils/validation";

const CreatePasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<CreatePasswordFormData>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: getCreatePasswordDefaultValues(),
  });

  const watchNewPassword = form.watch("newPassword");

  const onSubmit = (data: CreatePasswordFormData) => {
    if (isSuccess) {
      // If already successful, navigate to complete profile
      router.push("/complete-profile");
      return;
    }

    console.log("Password created:", data);
    setIsSuccess(true);

    // Auto-navigate to complete profile after 2 seconds
    setTimeout(() => {
      router.push("/complete-profile");
    }, 2000);
  };

  const getPasswordValidation = (password: string) => {
    if (!password) return null;
    return validatePasswordStrength(password);
  };

  const passwordValidation = getPasswordValidation(watchNewPassword);

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8">
        <h1 className="text-[32px] font-extrabold text-[#7642fe] mb-2 font-['Sora'] text-left">
          {FORM_MESSAGES.CREATE_PASSWORD_TITLE}
        </h1>
        <p className="text-base font-normal text-[#6B7280] mb-8 leading-6 font-['Poppins'] text-left">
          {FORM_MESSAGES.CREATE_PASSWORD_SUBTITLE}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#1F2937] font-['Poppins']">
                  Enter New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...field}
                      disabled={isSuccess}
                      className={`w-full p-2.5 pr-10 border-2 rounded-lg text-base font-['Poppins'] bg-white focus:outline-none transition-colors duration-200 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0 ${
                        form.formState.errors.newPassword
                          ? "border-[#EF4444] focus:border-[#EF4444]"
                          : "border-[#D1D5DB] focus:border-[#007BFF]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      disabled={isSuccess}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#6B7280] focus:outline-none disabled:cursor-not-allowed"
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                {form.formState.errors.newPassword && (
                  <div className="mt-1">
                    <Alert className="border-[#EF4444] bg-red-50">
                      <AlertDescription className="text-[#EF4444] text-sm font-['Poppins']">
                        {form.formState.errors.newPassword.message}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#1F2937] font-['Poppins']">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      {...field}
                      disabled={isSuccess}
                      className={`w-full p-2.5 pr-10 border-2 rounded-lg text-base font-['Poppins'] bg-white focus:outline-none transition-colors duration-200 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0 ${
                        form.formState.errors.confirmPassword
                          ? "border-[#EF4444] focus:border-[#EF4444]"
                          : "border-[#D1D5DB] focus:border-[#007BFF]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isSuccess}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#6B7280] focus:outline-none disabled:cursor-not-allowed"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                {form.formState.errors.confirmPassword && (
                  <div className="mt-1">
                    <Alert className="border-[#EF4444] bg-red-50">
                      <AlertDescription className="text-[#EF4444] text-sm font-['Poppins']">
                        {form.formState.errors.confirmPassword.message}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full p-3 bg-[#7642fe] text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out font-['Poppins'] hover:bg-[#5f35cc] disabled:bg-[#6c757d] disabled:cursor-not-allowed"
            disabled={isSuccess}
          >
            {isSuccess ? "Redirecting to Profile..." : "Continue"}
          </Button>

          {isSuccess && (
            <div className="flex items-center gap-2 text-[#10B981] text-sm font-['Poppins'] mt-4">
              <Check size={16} />
              Password updated successfully! Redirecting...
            </div>
          )}
        </form>
      </Form>

      <p className="text-center mt-4 text-sm font-normal text-[#6B7280] font-['Poppins']">
        Remember your password?{" "}
        <Link
          href={AUTH_ROUTES.LOGIN}
          className="text-[#3B82F6] underline cursor-pointer hover:no-underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default CreatePasswordForm;
