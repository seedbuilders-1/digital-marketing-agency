"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Types and Schemas
import { signUpSchema, type SignUpFormData } from "@/lib/schemas/auth";
import type { UserRegistrationData } from "@/lib/types/auth";

// Constants and Utils
import { FORM_MESSAGES, AUTH_ROUTES, USER_TYPES } from "@/lib/constants/auth";
import { formatPhoneNumber, getFormDefaultValues } from "@/lib/utils/form";

// Hooks
import { useCountries } from "@/hooks/use-countries";

const SignUpForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+234");
  const { countries, loading: countriesLoading } = useCountries();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: getFormDefaultValues(),
  });

  const onSubmit = (data: SignUpFormData) => {
    const registrationData: UserRegistrationData = {
      ...data,
      phoneNumber: formatPhoneNumber(selectedCountryCode, data.phoneNumber),
    };

    console.log("Registration form submitted:", registrationData);
    // Handle form submission logic here
  };

  const handleGoogleRegistration = () => {
    console.log("Google registration initiated");
    // Handle Google registration logic here
  };

  const inputClassName =
    "w-full p-2.5 border rounded-lg text-base font-normal font-['Sora'] transition-colors duration-200 ease-in-out placeholder:text-[#666666] focus:outline-none focus:border-[#007bff] border-[#ced4da] focus-visible:ring-0 focus-visible:ring-offset-0";
  const labelClassName = "font-['Sora'] text-sm font-normal text-black";

  return (
    <div className="w-full font-['Sora'] max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#7642fe] mb-2 font-['Sora']">
          {FORM_MESSAGES.SIGNUP_TITLE}
        </h1>
        <p className="text-base font-normal text-[#666666] leading-6 font-['Sora']">
          {FORM_MESSAGES.SIGNUP_SUBTITLE}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input name"
                    {...field}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Input a valid email"
                    {...field}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Phone Number</FormLabel>
                <div className="flex gap-2">
                  <Select
                    value={selectedCountryCode}
                    onValueChange={setSelectedCountryCode}
                  >
                    <SelectTrigger className="w-[120px] p-2.5 border border-[#ced4da] rounded-lg text-base font-normal font-['Sora'] bg-white focus:border-[#007bff] focus:ring-0 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countriesLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : (
                        countries.map((country) => (
                          <SelectItem
                            key={country.code}
                            value={country.phoneCode}
                          >
                            {country.flag} {country.phoneCode}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      {...field}
                      className={`flex-1 ${inputClassName}`}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input your address"
                    {...field}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full p-2.5 border rounded-lg text-base font-normal font-['Sora'] bg-white focus:border-[#007bff] border-[#ced4da] focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Country..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countriesLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading countries...
                      </SelectItem>
                    ) : (
                      countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem className="my-2.5">
                <FormLabel className="font-['Sora'] text-sm text-black mb-3 leading-[1.4] block">
                  Are you signing up as an individual or an organization? This
                  helps us tailor your experience and recommend the most
                  relevant services for your needs.
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value={USER_TYPES.INDIVIDUAL}
                        id="individual"
                        className="accent-[#7642fe]"
                      />
                      <Label
                        htmlFor="individual"
                        className="font-['Sora'] text-sm text-black cursor-pointer"
                      >
                        Individual
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value={USER_TYPES.ORGANIZATION}
                        id="organization"
                        className="accent-[#7642fe]"
                      />
                      <Label
                        htmlFor="organization"
                        className="font-['Sora'] text-sm text-black cursor-pointer"
                      >
                        Organization
                      </Label>
                    </div>
                  </RadioGroup>
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
                <FormLabel className={labelClassName}>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Input password"
                      {...field}
                      className={inputClassName}
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#6c757d] hover:text-black"
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm password"
                      {...field}
                      className={inputClassName}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#6c757d] hover:text-black"
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[#dc3545] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 accent-[#7642fe] data-[state=checked]:bg-[#7642fe] data-[state=checked]:border-[#7642fe]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-['Sora'] text-sm text-black cursor-pointer leading-[1.4]">
                    {FORM_MESSAGES.TERMS_TEXT}{" "}
                    <Link
                      href="#"
                      target="_blank"
                      className="text-[#7642fe] underline"
                      rel="noreferrer"
                    >
                      {FORM_MESSAGES.TERMS_LINK}
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      target="_blank"
                      className="text-[#7642fe] underline"
                      rel="noreferrer"
                    >
                      {FORM_MESSAGES.PRIVACY_LINK}
                    </Link>
                  </FormLabel>
                  <FormMessage className="text-[#dc3545] text-xs" />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full p-3 bg-[#7642fe] text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 ease-in-out font-['Sora'] hover:bg-[#5f35cc] disabled:bg-[#6c757d] disabled:cursor-not-allowed"
          >
            {FORM_MESSAGES.CREATE_ACCOUNT}
          </Button>
        </form>
      </Form>

      <div className="flex items-center my-6 before:content-[''] before:flex-1 before:h-px before:bg-[#ced4da] after:content-[''] after:flex-1 after:h-px after:bg-[#ced4da]">
        <span className="px-4 text-[#666666] text-sm font-normal font-['Sora']">
          Or
        </span>
      </div>

      <Button
        onClick={handleGoogleRegistration}
        variant="outline"
        className="w-full p-3 border border-[#d1d5db] rounded-lg bg-white flex items-center justify-center gap-2 text-base font-medium text-black cursor-pointer font-['Sora'] hover:bg-[#f8f9fa]"
      >
        <FcGoogle size={20} />
        {FORM_MESSAGES.GOOGLE_SIGNUP}
      </Button>

      <p className="text-center mt-6 text-sm font-normal text-[#666666] font-['Sora']">
        {FORM_MESSAGES.HAVE_ACCOUNT}{" "}
        <Link
          href={AUTH_ROUTES.LOGIN}
          className="text-[#7642fe] underline cursor-pointer"
        >
          {FORM_MESSAGES.SIGN_IN}
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
