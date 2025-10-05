/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

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

// Types and Schemas
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";

// Constants and Utils
import { FORM_MESSAGES, AUTH_ROUTES } from "@/lib/constants/auth";
import { getLoginDefaultValues } from "@/lib/utils/form";
import { useLoginMutation } from "@/api/authApi";
import { useAppDispatch } from "@/hooks/rtk";
import { setCredentials } from "@/features/auth/authSlice";

const AdminLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: getLoginDefaultValues(),
  });

  // Destructure isLoading from the mutation hook for UI feedback
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    const toastId = toast.loading("Signing in...");

    try {
      // .unwrap() will automatically throw on error
      const res = await login(data).unwrap();

      toast.success("Login successful! Redirecting...", { id: toastId });

      dispatch(
        setCredentials({
          token: res?.data?.accessToken,
          user: res?.data?.user,
        })
      );

      // --- Navigation Logic ---

      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      // Provide a user-friendly error message from the API or a fallback
      const errorMessage =
        err?.data?.message ||
        "Invalid credentials. Please check your email and password.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleGoogleLogin = () => {
    // This can also be enhanced with loading states and toasts
    toast.info("Google login is not yet implemented.");
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      {/* Add the Toaster for notifications */}
      <Toaster position="top-center" richColors />

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#7642fe] mb-2 font-['Sora']">
          {FORM_MESSAGES.LOGIN_TITLE}
        </h1>
        <p className="text-base font-normal text-[#666666] leading-6 font-['Poppins']">
          {FORM_MESSAGES.LOGIN_SUBTITLE}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Email and Password Fields remain the same */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-['Poppins'] text-xs font-normal text-black">
                  Email address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johnsnow@abc"
                    {...field}
                    className="w-full p-2.5 border rounded text-sm font-normal font-['Poppins'] placeholder:text-[#666666] focus:outline-none focus:border-[#007bff] border-[#ced4da] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-['Poppins'] text-xs font-normal text-black">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="1234567890"
                      {...field}
                      className="w-full p-2.5 border rounded text-sm font-normal font-['Poppins'] placeholder:text-[#666666] focus:outline-none focus:border-[#007bff] border-[#ced4da] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#6c757d] hover:text-black"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <Link
            href={AUTH_ROUTES.FORGOT_PASSWORD}
            className="text-[#7642fe] no-underline text-sm font-normal font-['Poppins'] self-end cursor-pointer hover:underline"
          >
            {FORM_MESSAGES.FORGOT_PASSWORD}
          </Link>

          <Button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className="w-full p-3 bg-[#7642fe] text-white rounded font-medium hover:bg-[#6532e8] transition-colors cursor-pointer disabled:bg-[#a593e0] disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : FORM_MESSAGES.LOGIN_BUTTON}
          </Button>
        </form>
      </Form>

      {/* Social Login and Signup links remain the same */}
      <div className="flex items-center my-6 before:content-[''] before:flex-1 before:h-px before:bg-[#ced4da] after:content-[''] after:flex-1 after:h-px after:bg-[#ced4da]">
        <span className="px-4 text-[#666666] text-sm font-normal font-['Poppins']">
          Or
        </span>
      </div>

      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full p-3 border border-[#ced4da] rounded bg-white flex items-center justify-center gap-2 text-base font-medium text-black cursor-pointer font-['Poppins'] hover:bg-[#f8f9fa]"
      >
        <FcGoogle size={20} />
        {FORM_MESSAGES.GOOGLE_LOGIN}
      </Button>

      <p className="text-center mt-6 text-sm font-normal text-[#666666] font-['Poppins']">
        {FORM_MESSAGES.NO_ACCOUNT}{" "}
        <Link
          href={AUTH_ROUTES.SIGNUP}
          className="text-[#7642fe] font-medium cursor-pointer no-underline hover:underline"
        >
          {FORM_MESSAGES.SIGN_UP}
        </Link>
      </p>
    </div>
  );
};

export default AdminLoginForm;
