"use client";

import { useEffect, useRef, useCallback } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { EVENTS, EXCLUDED_FIELD_NAMES } from "@/lib/posthog/config";
import { useCaptureEvent } from "./usePostHog";

interface FormTrackingOptions<T extends FieldValues> {
  formName: string;
  formId?: string;
  form: UseFormReturn<T>;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: Error) => void;
}

interface FormState {
  startedAt: number | null;
  touchedFields: Set<string>;
  filledFields: Set<string>;
  focusedFields: Set<string>;
  lastFocusedField: string | null;
  fieldFocusTimes: Map<string, number>;
  hasSubmitted: boolean;
}

/**
 * Advanced form tracking hook that tracks:
 * - Form start (first interaction)
 * - Field focus events
 * - Field fill events
 * - Field blur events
 * - Form abandonment
 * - Form submission (success/error)
 * - Validation errors
 */
export function useFormTracking<T extends FieldValues>({
  formName,
  formId,
  form,
  onSubmitSuccess,
  onSubmitError,
}: FormTrackingOptions<T>) {
  const captureEvent = useCaptureEvent();
  const formState = useRef<FormState>({
    startedAt: null,
    touchedFields: new Set(),
    filledFields: new Set(),
    focusedFields: new Set(),
    lastFocusedField: null,
    fieldFocusTimes: new Map(),
    hasSubmitted: false,
  });

  const { formState: rhfFormState } = form;

  // Helper to check if field should be tracked
  const shouldTrackField = (fieldName: string): boolean => {
    return !EXCLUDED_FIELD_NAMES.some((excluded) =>
      fieldName.toLowerCase().includes(excluded.toLowerCase()),
    );
  };

  // Helper to get sanitized field value
  const getSanitizedValue = (fieldName: string, value: any): any => {
    if (!shouldTrackField(fieldName)) {
      return "[REDACTED]";
    }

    // For objects/arrays, just return the type
    if (typeof value === "object" && value !== null) {
      return Array.isArray(value) ? `[Array(${value.length})]` : "[Object]";
    }

    // For strings, limit length
    if (typeof value === "string" && value.length > 100) {
      return value.substring(0, 100) + "...";
    }

    return value;
  };

  // Track form start (first interaction)
  const trackFormStart = useCallback(() => {
    if (!formState.current.startedAt) {
      formState.current.startedAt = Date.now();
      captureEvent(`${formName}_started`, {
        form_name: formName,
        form_id: formId,
        timestamp: new Date().toISOString(),
      });
    }
  }, [formName, formId, captureEvent]);

  // Track field focus
  const trackFieldFocus = useCallback(
    (fieldName: string) => {
      trackFormStart(); // Ensure form start is tracked

      if (!formState.current.focusedFields.has(fieldName)) {
        formState.current.focusedFields.add(fieldName);
        formState.current.lastFocusedField = fieldName;
        formState.current.fieldFocusTimes.set(fieldName, Date.now());

        if (shouldTrackField(fieldName)) {
          captureEvent(`${fieldName}_${formName}_field_focused`, {
            form_name: formName,
            form_id: formId,
            field_name: fieldName,
            timestamp: new Date().toISOString(),
          });
        }
      }
    },
    [formName, formId, captureEvent, trackFormStart],
  );

  // Track field blur
  const trackFieldBlur = useCallback(
    (fieldName: string, value: any) => {
      const isFilled = value !== undefined && value !== null && value !== "";

      if (isFilled && !formState.current.filledFields.has(fieldName)) {
        formState.current.filledFields.add(fieldName);

        if (shouldTrackField(fieldName)) {
          captureEvent(EVENTS.FORM_FIELD_FILLED, {
            form_name: formName,
            form_id: formId,
            field_name: fieldName,
            field_value: getSanitizedValue(fieldName, value),
            timestamp: new Date().toISOString(),
          });
        }
      }

      // Calculate time spent on field
      const focusTime = formState.current.fieldFocusTimes.get(fieldName);
      const timeSpent = focusTime ? Date.now() - focusTime : 0;

      if (shouldTrackField(fieldName)) {
        captureEvent(`${fieldName}_${formName}_field_blurred`, {
          form_name: formName,
          form_id: formId,
          field_name: fieldName,
          is_filled: isFilled,
          time_spent_ms: timeSpent,
          timestamp: new Date().toISOString(),
        });
      }

      formState.current.touchedFields.add(fieldName);
    },
    [formName, formId, captureEvent],
  );

  // Track field change
  const trackFieldChange = useCallback(
    (fieldName: string, value: any) => {
      if (shouldTrackField(fieldName)) {
        captureEvent(`${fieldName}_${formName}_field_changed`, {
          form_name: formName,
          form_id: formId,
          field_name: fieldName,
          field_value: getSanitizedValue(fieldName, value),
          timestamp: new Date().toISOString(),
        });
      }
    },
    [formName, formId, captureEvent],
  );

  // Track validation errors
  useEffect(() => {
    const errors = rhfFormState.errors;

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([fieldName, error]) => {
        if (shouldTrackField(fieldName)) {
          captureEvent(`${formName}_validation_error`, {
            form_name: formName,
            form_id: formId,
            field_name: fieldName,
            error_type: error?.type,
            error_message: error?.message,
            timestamp: new Date().toISOString(),
          });
        }
      });
    }
  }, [rhfFormState.errors, formName, formId, captureEvent]);

  // Track form abandonment on unmount
  useEffect(() => {
    return () => {
      const state = formState.current;

      // If form was started but not submitted, track abandonment
      if (state.startedAt && !state.hasSubmitted) {
        const totalFields = state.focusedFields.size;
        const filledFields = state.filledFields.size;
        const completionPercentage =
          totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
        const timeSpent = Date.now() - state.startedAt;

        captureEvent(`${formName}_abandoned`, {
          form_name: formName,
          form_id: formId,
          last_field: state.lastFocusedField,
          total_fields_focused: totalFields,
          fields_filled: filledFields,
          completion_percentage: completionPercentage,
          time_spent_ms: timeSpent,
          timestamp: new Date().toISOString(),
        });
      }
    };
  }, [formName, formId, captureEvent]);

  // Wrapped submit handler
  const trackSubmit = useCallback(
    (onSubmit: (data: T) => Promise<void> | void) => {
      return async (data: T) => {
        formState.current.hasSubmitted = true;
        const timeSpent = formState.current.startedAt
          ? Date.now() - formState.current.startedAt
          : 0;

        captureEvent(`${formName}_submitted`, {
          form_name: formName,
          form_id: formId,
          total_fields: formState.current.focusedFields.size,
          time_spent_ms: timeSpent,
          timestamp: new Date().toISOString(),
        });

        try {
          await onSubmit(data);

          captureEvent(`${formName}_submission_success`, {
            form_name: formName,
            form_id: formId,
            timestamp: new Date().toISOString(),
          });

          onSubmitSuccess?.();
        } catch (error) {
          const errorObj =
            error instanceof Error ? error : new Error(String(error));
          captureEvent(`${formName}_submission_error`, {
            form_name: formName,
            form_id: formId,
            error_message:
              error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          });

          onSubmitError?.(errorObj);
          throw error;
        }
      };
    },
    [formName, formId, captureEvent, onSubmitSuccess, onSubmitError],
  );

  return {
    trackFieldFocus,
    trackFieldBlur,
    trackFieldChange,
    trackFormStart,
    trackSubmit,
    formState: formState.current,
  };
}
