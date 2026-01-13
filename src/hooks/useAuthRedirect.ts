/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useAuthRedirect.ts

/**
 * A custom hook that determines the correct redirect path for a user
 * after they have successfully logged in or registered.
 *
 * @param user The user object from the API response.
 * @returns The path to redirect the user to (e.g., '/dashboard/dashboard').
 */
export const useAuthRedirect = (user: any): string => {
  if (!user) {
    // If for some reason there's no user, redirect to a safe default
    return "/login";
  }

  // --- Rule 1: Not Verified ---
  // If the user's status is 'unverified', they must verify their OTP first.
  if (user.status === "unverified") {
    return "/verify-otp";
  }

  // --- BYPASS KYC FOR NOW ---
  // The client requested to skip the mandatory profile completion steps.
  // Once verified, users should go straight to the dashboard to place orders.
  // --- BYPASS KYC FOR NOW ---
  // The client requested to skip the mandatory profile completion steps.
  // Once verified, users should go straight to the dashboard to place orders.

  // Check if there is a pending service request in session storage or query params
  // NOTE: In a real app, you might want to read this from a robust source.
  // We will assume the caller of this function might want to handle this logic,
  // OR we can check localStorage here if that's where you store the "intended destination".
  // However, for a simple flow, we can just return the dashboard URL and let the component handle redirection
  // if you want to support deep linking.

  // BETTER APPROACH:
  // The components (LoginForm / VerifyOTPForm) should check for `returnUrl` or similar query params.
  // But since we are hardcoding the return path here, we can add a check for the localStorage item
  // that we (will) set when a user clicks "Choose Plan".

  const pendingServiceId =
    typeof window !== "undefined"
      ? sessionStorage.getItem("pendingServiceId")
      : null;
  const pendingPlanId =
    typeof window !== "undefined"
      ? sessionStorage.getItem("pendingPlanId")
      : null;

  if (pendingServiceId) {
    return `/dashboard/services/${pendingServiceId}/request`;
  }

  return "/dashboard/dashboard";
};
