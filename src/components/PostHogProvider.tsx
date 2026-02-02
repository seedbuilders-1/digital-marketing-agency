"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, getPostHog, EVENTS } from "@/lib/posthog";
import { ExitTracker } from "./ExitTracker";

function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    const posthog = getPostHog();
    if (posthog && pathname) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : "");

      posthog.capture(EVENTS.PAGE_VIEW, {
        $current_url: url,
        path: pathname,
        search: searchParams?.toString() || "",
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Initialize PostHog on mount
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <>
      <ExitTracker />
      <Suspense fallback={null}>
        <PostHogPageViewTracker />
      </Suspense>
      {children}
    </>
  );
}
