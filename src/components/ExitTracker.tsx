"use client";

import { useExitTracking } from "@/hooks/useExitTracking";

/**
 * Component to enable exit and session tracking
 * Add this to your main layout or specific pages
 */
export function ExitTracker() {
  useExitTracking({
    idleTimeoutMs: 5 * 60 * 1000, // 5 minutes
    trackTabVisibility: true,
    trackExitIntent: true,
  });

  return null; // This component doesn't render anything
}
