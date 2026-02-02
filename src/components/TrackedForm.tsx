"use client";

import React, { useEffect } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { useFormTracking } from "@/hooks/useFormTracking";

interface TrackedFormProps<T extends FieldValues> {
  formName: string;
  formId?: string;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void> | void;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: Error) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * A form wrapper component that automatically tracks all form interactions
 *
 * Usage:
 * ```tsx
 * <TrackedForm
 *   formName="contact_form"
 *   form={form}
 *   onSubmit={handleSubmit}
 * >
 *   <input {...form.register('email')} />
 *   <button type="submit">Submit</button>
 * </TrackedForm>
 * ```
 */
export function TrackedForm<T extends FieldValues>({
  formName,
  formId,
  form,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  children,
  className,
}: TrackedFormProps<T>) {
  const { trackFieldFocus, trackFieldBlur, trackFieldChange, trackSubmit } =
    useFormTracking({
      formName,
      formId,
      form,
      onSubmitSuccess,
      onSubmitError,
    });

  // Add event listeners to all form fields
  useEffect(() => {
    const formElement = document.getElementById(formId || `form-${formName}`);
    if (!formElement) return;

    const inputs = formElement.querySelectorAll("input, textarea, select");

    const handleFocus = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const fieldName = target.name || target.id;
      if (fieldName) {
        trackFieldFocus(fieldName);
      }
    };

    const handleBlur = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const fieldName = target.name || target.id;
      if (fieldName) {
        trackFieldBlur(fieldName, target.value);
      }
    };

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const fieldName = target.name || target.id;
      if (fieldName) {
        trackFieldChange(fieldName, target.value);
      }
    };

    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
      input.addEventListener("change", handleChange);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
        input.removeEventListener("change", handleChange);
      });
    };
  }, [formName, formId, trackFieldFocus, trackFieldBlur, trackFieldChange]);

  return (
    <form
      id={formId || `form-${formName}`}
      onSubmit={form.handleSubmit(trackSubmit(onSubmit))}
      className={className}
    >
      {children}
    </form>
  );
}
