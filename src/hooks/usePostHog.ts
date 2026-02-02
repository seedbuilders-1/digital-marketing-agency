"use client";

import { useEffect } from "react";
import { getPostHog } from "@/lib/posthog";

/**
 * Hook to access PostHog instance
 * Returns null if PostHog is not initialized or on server
 */
export function usePostHog() {
  const posthog = getPostHog();

  return posthog;
}

/**
 * Hook to identify the current user
 * Call this when user logs in or when user data is available
 */
export function useIdentifyUser(
  userId?: string,
  properties?: Record<string, any>,
) {
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog && userId) {
      posthog.identify(userId, properties);
    }
  }, [posthog, userId, properties]);
}

/**
 * Hook to capture a custom event
 */
export function useCaptureEvent() {
  const posthog = usePostHog();

  return (eventName: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.capture(eventName, properties);
    }
  };
}
