"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { EVENTS } from "@/lib/posthog/config";
import { useCaptureEvent } from "./usePostHog";

interface UseExitTrackingOptions {
  idleTimeoutMs?: number; // Time before considering user idle (default: 5 minutes)
  trackTabVisibility?: boolean; // Track when user switches tabs
  trackExitIntent?: boolean; // Track when mouse leaves viewport
}

/**
 * Hook to track user exit behavior and session activity
 */
export function useExitTracking({
  idleTimeoutMs = 5 * 60 * 1000, // 5 minutes default
  trackTabVisibility = true,
  trackExitIntent = true,
}: UseExitTrackingOptions = {}) {
  const captureEvent = useCaptureEvent();
  const pathname = usePathname();

  const sessionStartTime = useRef<number>(Date.now());
  const lastActivityTime = useRef<number>(Date.now());
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const isIdle = useRef<boolean>(false);

  // Update last activity time
  const updateActivity = () => {
    const now = Date.now();
    const wasIdle = isIdle.current;

    lastActivityTime.current = now;
    isIdle.current = false;

    // If user was idle and became active again
    if (wasIdle) {
      captureEvent(EVENTS.USER_ACTIVE, {
        timestamp: new Date().toISOString(),
        page: pathname,
      });
    }

    // Reset idle timer
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }

    idleTimer.current = setTimeout(() => {
      isIdle.current = true;
      const idleDuration = Date.now() - lastActivityTime.current;

      captureEvent(EVENTS.USER_IDLE, {
        idle_duration_ms: idleDuration,
        timestamp: new Date().toISOString(),
        page: pathname,
      });
    }, idleTimeoutMs);
  };

  // Track page exit
  useEffect(() => {
    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - sessionStartTime.current;

      captureEvent(EVENTS.PAGE_LEAVE, {
        exit_page: pathname,
        session_duration_ms: sessionDuration,
        timestamp: new Date().toISOString(),
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname, captureEvent]);

  // Track tab visibility changes
  useEffect(() => {
    if (!trackTabVisibility) return;

    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";

      captureEvent(EVENTS.TAB_VISIBILITY_CHANGED, {
        is_visible: isVisible,
        page: pathname,
        timestamp: new Date().toISOString(),
      });

      if (isVisible) {
        updateActivity();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname, captureEvent, trackTabVisibility]);

  // Track exit intent (mouse leaving viewport)
  useEffect(() => {
    if (!trackExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only track if mouse is leaving from the top of the page
      if (e.clientY <= 0) {
        captureEvent("exit_intent_detected", {
          page: pathname,
          timestamp: new Date().toISOString(),
        });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pathname, captureEvent, trackExitIntent]);

  // Track user activity (mouse movement, clicks, keyboard)
  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      document.addEventListener(event, updateActivity);
    });

    // Initialize idle timer
    updateActivity();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, updateActivity);
      });

      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
  }, [pathname]);

  return {
    isIdle: isIdle.current,
    sessionDuration: Date.now() - sessionStartTime.current,
  };
}
