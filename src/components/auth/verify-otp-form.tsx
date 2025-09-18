/* eslint-disable react/no-unescaped-entities */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster, toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OTPInput } from "@/components/ui/otp-input";

// Types and Schemas
import { verifyOTPSchema, type VerifyOTPFormData } from "@/lib/schemas/auth";

// Constants and Utils
import { FORM_MESSAGES, AUTH_ROUTES } from "@/lib/constants/auth";
import { getVerifyOTPDefaultValues } from "@/lib/utils/form";
import {
  useEmailResendOtpMutation,
  useVerifyEmailMutation,
} from "@/api/authApi";

const VerifyOTPForm = ({ email, id }) => {
  const router = useRouter();

  const form = useForm<VerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: getVerifyOTPDefaultValues(),
  });

  // Destructure isLoading states for UX feedback
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useEmailResendOtpMutation();

  const onSubmit = async (data: VerifyOTPFormData) => {
    const toastId = toast.loading("Verifying your code...");

    try {
      // .unwrap() will automatically throw an error on a failed request
      await verifyOtp({
        id: id,
        body: { otp: data.otp },
      }).unwrap();

      toast.success("OTP verified successfully!", { id: toastId });

      // On success, navigate to the next step (e.g., dashboard or create password)
      router.push("/dashboard");
    } catch (error) {
      console.error("Verification failed:", error);
      const errorMessage =
        error?.data?.message || "Invalid OTP. Please try again.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleResendOTP = async () => {
    const toastId = toast.loading("Sending a new code...");

    try {
      await resendOtp({ email: email }).unwrap();
      toast.success("A new code has been sent to your email.", { id: toastId });
      form.reset(); // Clear the input field for the new code
    } catch (error) {
      console.error("Resend OTP failed:", error);
      const errorMessage =
        error?.data?.message ||
        "Failed to resend code. Please try again later.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8">
        <h1 className="text-[32px] font-extrabold text-[#7642fe] mb-2 font-['Sora'] text-left">
          {FORM_MESSAGES.VERIFY_OTP_TITLE}
        </h1>
        <p className="text-base font-normal text-[#6B7280] mb-8 leading-6 font-['Poppins'] text-left">
          Please enter the 6-digit OTP sent to {email}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <OTPInput
                    length={6}
                    value={field.value}
                    onChange={field.onChange}
                    onComplete={(otpValue) => form.setValue("otp", otpValue)}
                    // Use form state to show errors
                    hasError={!!form.formState.errors.otp}
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs text-center" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isVerifying} // Disable button while verifying
            className="w-full p-3 bg-[#7642fe] text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out font-['Poppins'] hover:bg-[#5f35cc] disabled:bg-[#a593e0] disabled:cursor-not-allowed"
          >
            {isVerifying ? "Verifying..." : FORM_MESSAGES.VERIFY_CODE_BUTTON}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6 text-sm font-['Poppins']">
        <span className="text-[#6B7280]">Didn't receive a code? </span>
        <button
          onClick={handleResendOTP}
          disabled={isResending} // Disable button while resending
          className="text-[#7642fe] underline bg-none border-none cursor-pointer text-sm font-['Poppins'] hover:no-underline disabled:text-[#a593e0] disabled:cursor-not-allowed"
        >
          {isResending ? "Resending..." : "Resend Code"}
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
