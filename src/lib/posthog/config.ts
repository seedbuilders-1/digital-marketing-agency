import { PostHogConfig } from "posthog-js";

export const posthogConfig: Partial<PostHogConfig> = {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",

  // Enable session recording
  session_recording: {
    maskAllInputs: false, // We'll selectively mask sensitive fields
    maskInputOptions: {
      password: true, // Always mask password fields
    },
    recordCrossOriginIframes: false,
  },

  // Autocapture settings
  autocapture: {
    dom_event_allowlist: ["click", "change", "submit"], // Capture clicks, changes, and form submissions
    url_allowlist: [], // Empty means all URLs are allowed
    element_allowlist: [], // Empty means all elements are allowed
    css_selector_allowlist: [], // Can add specific selectors if needed
  },

  // Capture pageviews automatically
  capture_pageview: false, // We'll handle this manually for better control with Next.js

  // Capture page leave events
  capture_pageleave: true,

  // Enable debug mode in development
  loaded: (posthog) => {
    if (process.env.NODE_ENV === "development") {
      posthog.debug();
    }
  },

  // Persistence
  persistence: "localStorage+cookie",

  // Cross-domain tracking
  cross_subdomain_cookie: true,

  // Disable if user has Do Not Track enabled
  respect_dnt: true,

  // Advanced features
  enable_recording_console_log: true, // Capture console logs in session recordings
  disable_session_recording: false,

  // Performance
  _capture_metrics: true,
  capture_performance: true,
};

// Event names constants for consistency
export const EVENTS = {
  // Page events
  PAGE_VIEW: "$pageview",
  PAGE_LEAVE: "$pageleave",

  // Form events
  FORM_STARTED: "form_started",
  FORM_FIELD_FOCUSED: "form_field_focused",
  FORM_FIELD_FILLED: "form_field_filled",
  FORM_FIELD_BLURRED: "form_field_blurred",
  FORM_FIELD_CHANGED: "form_field_changed",
  FORM_ABANDONED: "form_abandoned",
  FORM_SUBMITTED: "form_submitted",
  FORM_SUBMISSION_SUCCESS: "form_submission_success",
  FORM_SUBMISSION_ERROR: "form_submission_error",
  FORM_VALIDATION_ERROR: "form_validation_error",

  // User interaction events
  BUTTON_CLICKED: "button_clicked",
  LINK_CLICKED: "link_clicked",
  FILE_UPLOADED: "file_uploaded",
  FILE_DOWNLOAD: "file_downloaded",
  SEARCH_PERFORMED: "search_performed",
  FILTER_APPLIED: "filter_applied",
  MODAL_OPENED: "modal_opened",
  MODAL_CLOSED: "modal_closed",
  TAB_CHANGED: "tab_changed",

  // Session events
  SESSION_STARTED: "session_started",
  USER_IDLE: "user_idle",
  USER_ACTIVE: "user_active",
  TAB_VISIBILITY_CHANGED: "tab_visibility_changed",

  // Error events
  JAVASCRIPT_ERROR: "javascript_error",
  API_ERROR: "api_error",

  // User events
  USER_SIGNED_UP: "user_signed_up",
  USER_LOGGED_IN: "user_logged_in",
  USER_LOGGED_OUT: "user_logged_out",
} as const;

// Sensitive field patterns to mask in session recordings
export const SENSITIVE_FIELD_SELECTORS = [
  'input[type="password"]',
  'input[name*="password"]',
  'input[name*="card"]',
  'input[name*="cvv"]',
  'input[name*="ssn"]',
  'input[autocomplete="cc-number"]',
  'input[autocomplete="cc-csc"]',
  ".sensitive-data",
  '[data-sensitive="true"]',
];

// Fields to exclude from tracking
export const EXCLUDED_FIELD_NAMES = [
  "password",
  "confirmPassword",
  "currentPassword",
  "newPassword",
  "cardNumber",
  "cvv",
  "ssn",
  "pin",
];
