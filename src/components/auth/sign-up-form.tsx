/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner"; // --- 1. IMPORT TOASTER AND TOAST ---

// Reusable and custom components
import { PasswordField } from "./PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Types, schemas, constants, and utils
import { signUpSchema, type SignUpFormData } from "@/lib/schemas/auth";
import { FORM_MESSAGES, AUTH_ROUTES, USER_TYPES } from "@/lib/constants/auth";
import { formatPhoneNumber, getFormDefaultValues } from "@/lib/utils/form";

// API and Hooks
import { useRegisterMutation } from "@/api/authApi";
import { Country, UserRegistrationData } from "@/lib/types/auth";
import { CountrySelector } from "./CountryCodeSelector";
import { PhoneCodeSelector } from "./PhoneCodeSelector";
import { setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/rtk";
import { TrackedForm } from "@/components/TrackedForm";
import { identifyUser } from "@/lib/posthog";
import { trackAuth } from "@/utils/analytics";

interface SignUpFormProps {
  countries: Country[];
}

export const SignUpForm = ({ countries }: SignUpFormProps) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+234");
  const router = useRouter(); // --- 2. ADD ROUTER FOR REDIRECTION ---

  // We no longer need the 'error' prop from the hook, as we'll handle it in the catch block.
  const [register, { isLoading }] = useRegisterMutation();

  // --- 1. CAPTURE QUERY PARAMS ---
  // If the user was redirected here from a service page, capture their intent.
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const planId = searchParams.get("planId");

  useEffect(() => {
    if (serviceId) {
      sessionStorage.setItem("pendingServiceId", serviceId);
    }
    if (planId) {
      sessionStorage.setItem("pendingPlanId", planId);
    }
  }, [serviceId, planId]);

  const dispatch = useAppDispatch();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: getFormDefaultValues(),
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (data: SignUpFormData) => {
      // --- 3. REFACTOR ONSUBMIT WITH TOASTS ---
      const toastId = toast.loading("Creating your account...");

      const registrationData: UserRegistrationData = {
        ...data,
        tel: formatPhoneNumber(selectedCountryCode, data.tel),
      };

      try {
        const res = await register(registrationData).unwrap();
        console.log("res", res);

        dispatch(
          setCredentials({
            token: res?.data?.tokens.accessToken,
            user: res?.data?.user,
          }),
        );
        // Identify user in PostHog
        identifyUser(res?.data?.user?.id, {
          email: data.email,
          name: data.name,
          category: data.category,
          country: data.country,
          city: data.city,
          signup_date: new Date().toISOString(),
        });

        // Track signup event
        trackAuth("signup", res?.data?.user?.id, {
          email: data.email,
          category: data.category,
          has_service_intent: !!serviceId,
        });

        toast.success("Registration successful! Please verify your email.", {
          id: toastId,
        });

        // Redirect to the OTP verification page upon successful registration
        router.push("/verify-otp");
      } catch (err: any) {
        console.error("Registration failed:", err);
        // Display a specific error from the API, or a generic fallback
        const errorMessage =
          err?.data?.message || "Registration failed. Please try again.";
        toast.error(errorMessage, { id: toastId });
      }
    },
    [register, selectedCountryCode, router],
  );

  const handleGoogleRegistration = useCallback(() => {
    toast.info("Google registration is not yet implemented.");
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-[#7642fe]">
          {FORM_MESSAGES.SIGNUP_TITLE}
        </h1>
        <p className="text-muted-foreground">{FORM_MESSAGES.SIGNUP_SUBTITLE}</p>
      </div>

      <Form {...form}>
        <TrackedForm
          formName="signup_form"
          formId="user-signup-form"
          form={form}
          onSubmit={onSubmit}
          className="space-y-5"
        >
          {/* ... all your FormField components remain exactly the same ... */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Input a valid email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <div className="flex gap-2">
                  <PhoneCodeSelector
                    countries={countries}
                    value={selectedCountryCode}
                    onValueChange={setSelectedCountryCode}
                  />
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      className="flex-1"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Input your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <CountrySelector countries={countries} field={field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Are you signing up as an individual or an organization?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={USER_TYPES.INDIVIDUAL} />
                      </FormControl>
                      <FormLabel className="font-normal">Individual</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={USER_TYPES.ORGANIZATION} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Organization
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PasswordField
            name="password"
            label="Password"
            placeholder="Choose a strong password"
          />
          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
          />

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#7642fe] underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#7642fe] underline">
                      Privacy Policy
                    </Link>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7642fe] hover:bg-[#5f35cc] cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              FORM_MESSAGES.CREATE_ACCOUNT
            )}
          </Button>

          {/* --- 5. REMOVE THE OLD STATIC ERROR MESSAGE ---
          {error && (
            <p className="text-sm font-medium text-destructive text-center">
              Registration failed. Please check your details and try again.
            </p>
          )} 
          */}
        </TrackedForm>
      </Form>

      {/* ... the rest of your JSX remains the same ... */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Button
        onClick={handleGoogleRegistration}
        variant="outline"
        className="w-full"
        disabled={isLoading}
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        {FORM_MESSAGES.GOOGLE_SIGNUP}
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {FORM_MESSAGES.HAVE_ACCOUNT}{" "}
        <Link
          href={`${AUTH_ROUTES.LOGIN}${
            serviceId || planId ? "?" : ""
          }${new URLSearchParams({
            ...(serviceId && { serviceId }),
            ...(planId && { planId }),
          }).toString()}`}
          className="text-[#7642fe] underline"
        >
          {FORM_MESSAGES.SIGN_IN}
        </Link>
      </p>
    </div>
  );
};
