/* eslint-disable react/no-unescaped-entities */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OTPInput } from "@/components/ui/otp-input";

// Types and Schemas
import { verifyOTPSchema, type VerifyOTPFormData } from "@/lib/schemas/auth";

// Constants and Utils
import { FORM_MESSAGES, AUTH_ROUTES } from "@/lib/constants/auth";
import { getVerifyOTPDefaultValues } from "@/lib/utils/form";

const VerifyOTPForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: getVerifyOTPDefaultValues(),
  });

  const onSubmit = (data: VerifyOTPFormData) => {
    console.log("OTP verified:", data);
    setShowAlert(false);
    // Navigate to create password page or dashboard
    router.push("/create-password");
  };

  const onError = () => {
    setShowAlert(true);
  };

  const handleOTPComplete = (otpValue: string) => {
    form.setValue("otp", otpValue);
    setShowAlert(false);
  };

  const handleResendOTP = () => {
    console.log("Resend OTP requested");
    setShowAlert(false);
    form.reset();
  };

  const handleResetAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8">
        <h1 className="text-[32px] font-extrabold text-[#7642fe] mb-2 font-['Sora'] text-left">
          {FORM_MESSAGES.VERIFY_OTP_TITLE}
        </h1>
        <p className="text-base font-normal text-[#6B7280] mb-8 leading-6 font-['Poppins'] text-left">
          {FORM_MESSAGES.VERIFY_OTP_SUBTITLE}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-5"
        >
          {showAlert && (
            <div className="mb-4">
              <Alert className="border-[#EF4444] bg-red-50">
                <AlertDescription className="text-[#EF4444] text-sm font-['Poppins']">
                  Please enter a valid 4-digit code
                </AlertDescription>
              </Alert>
            </div>
          )}

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <OTPInput
                    length={4}
                    value={field.value}
                    onChange={field.onChange}
                    onComplete={handleOTPComplete}
                    hasError={showAlert || !!form.formState.errors.otp}
                    onReset={handleResetAlert}
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs text-center" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full p-3 bg-[#7642fe] text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out font-['Poppins'] hover:bg-[#5f35cc] disabled:bg-[#6c757d] disabled:cursor-not-allowed"
          >
            {FORM_MESSAGES.VERIFY_CODE_BUTTON}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6 text-sm font-['Poppins']">
        <span className="text-[#6B7280]">Didn't receive a code? </span>
        <button
          onClick={handleResendOTP}
          className="text-[#7642fe] underline bg-none border-none cursor-pointer text-sm font-['Poppins'] hover:no-underline"
        >
          Resend Code
        </button>
      </div>

      <p className="text-center mt-4 text-sm font-normal text-[#6B7280] font-['Poppins']">
        {FORM_MESSAGES.HAVE_ACCOUNT}{" "}
        <Link
          href={AUTH_ROUTES.LOGIN}
          className="text-[#7642fe] underline cursor-pointer hover:no-underline"
        >
          {FORM_MESSAGES.SIGN_IN}
        </Link>
      </p>
    </div>
  );
};

export default VerifyOTPForm;
