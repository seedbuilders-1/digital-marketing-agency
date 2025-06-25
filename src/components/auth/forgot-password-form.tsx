"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/schemas/auth";

// Constants and Utils
import { FORM_MESSAGES, AUTH_ROUTES } from "@/lib/constants/auth";
import { getForgotPasswordDefaultValues } from "@/lib/utils/form";

const ForgotPasswordForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: getForgotPasswordDefaultValues(),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    setShowAlert(false);
    console.log("Password reset email sent to:", data);
    router.push(AUTH_ROUTES.VERIFY_OTP);
  };

  const onError = () => {
    setShowAlert(true);
  };

  const handleEmailChange = (value: string) => {
    if (showAlert) {
      setShowAlert(false);
    }
    return value;
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#7642fe] mb-2 font-['Sora']">
          {FORM_MESSAGES.FORGOT_PASSWORD_TITLE}
        </h1>
        <p className="text-base font-normal text-[#666666] mb-8 leading-6 font-['Poppins']">
          {FORM_MESSAGES.FORGOT_PASSWORD_SUBTITLE}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            {showAlert && (
              <Alert className="border-[#EF4444] bg-red-50">
                <AlertDescription className="text-[#EF4444] text-sm font-['Poppins']">
                  Please enter a valid email address.
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-['Poppins'] text-sm font-normal text-black">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      onChange={(e) => {
                        const value = handleEmailChange(e.target.value);
                        field.onChange(value);
                      }}
                      className={`w-full p-2.5 border rounded-lg text-base font-normal font-['Poppins'] placeholder:text-[#666666] focus:outline-none transition-colors duration-200 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0 ${
                        showAlert || form.formState.errors.email
                          ? "border-[#EF4444] focus:border-[#EF4444]"
                          : "border-[#D1D5DB] focus:border-[#007BFF]"
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-[#dc3545] text-xs" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full p-3 bg-[#7642fe] text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out font-['Poppins'] hover:bg-[#5f35cc] disabled:bg-[#6c757d] disabled:cursor-not-allowed"
          >
            {FORM_MESSAGES.SEND_EMAIL_BUTTON}
          </Button>
        </form>
      </Form>

      <p className="text-center mt-6 text-sm font-normal text-[#666666] font-['Poppins']">
        {FORM_MESSAGES.HAVE_ACCOUNT}{" "}
        <Link
          href={AUTH_ROUTES.LOGIN}
          className="text-[#7642fe] underline cursor-pointer hover:underline"
        >
          {FORM_MESSAGES.SIGN_IN}
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
