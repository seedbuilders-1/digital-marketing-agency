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

  // --- Rule 2: Individual User Onboarding ---
  if (user.category === "individual") {
    // If they are an individual and haven't completed their profile (pfp_url is a good marker),
    // send them to the individual profile completion page.
    if (!user.pfp_url) {
      return "/complete-profile";
    }
    // Otherwise, they are a complete individual user, send to dashboard.
    return "/dashboard/dashboard";
  }

  // --- Rule 3: Organization User Onboarding ---
  if (user.category === "organisation") {
    // If the user is an organization type but the `organisation` object is null or missing,
    // they need to fill out the organization form first.
    if (!user.organisation) {
      return "/organization-profile";
    }

    // If the organization exists, but the `contacts` array is empty,
    // they need to add the primary contact person.
    if (
      !user.organisation.contacts ||
      user.organisation.contacts.length === 0
    ) {
      return "/contact-person-profile";
    }

    // Otherwise, they are a complete organization user, send to dashboard.
    return "/dashboard/dashboard";
  }

  // --- Fallback ---
  // If the category is unknown or doesn't match, default to the dashboard.
  return "/dashboard/dashboard";
};
