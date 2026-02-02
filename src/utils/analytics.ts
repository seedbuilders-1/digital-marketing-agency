import { EVENTS } from "@/lib/posthog/config";
import { captureEvent } from "@/lib/posthog/client";

/**
 * Track button click events
 */
export const trackButtonClick = (
  buttonText: string,
  buttonId?: string,
  additionalProps?: Record<string, any>,
) => {
  captureEvent(EVENTS.BUTTON_CLICKED, {
    button_text: buttonText,
    button_id: buttonId,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track link click events
 */
export const trackLinkClick = (
  linkText: string,
  linkUrl: string,
  isExternal: boolean = false,
  additionalProps?: Record<string, any>,
) => {
  captureEvent(EVENTS.LINK_CLICKED, {
    link_text: linkText,
    link_url: linkUrl,
    is_external: isExternal,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track file upload events
 */
export const trackFileUpload = (
  fileType: string,
  fileSize: number,
  fileName?: string,
  additionalProps?: Record<string, any>,
) => {
  captureEvent(EVENTS.FILE_UPLOADED, {
    file_type: fileType,
    file_size: fileSize,
    file_name: fileName,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track search events
 */
export const trackSearch = (
  searchQuery: string,
  resultsCount?: number,
  additionalProps?: Record<string, any>,
) => {
  captureEvent(EVENTS.SEARCH_PERFORMED, {
    search_query: searchQuery,
    results_count: resultsCount,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track filter application
 */
export const trackFilterApplied = (
  filterType: string,
  filterValue: any,
  additionalProps?: Record<string, any>,
) => {
  captureEvent(EVENTS.FILTER_APPLIED, {
    filter_type: filterType,
    filter_value: filterValue,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track modal open/close
 */
export const trackModal = (
  modalName: string,
  action: "opened" | "closed",
  additionalProps?: Record<string, any>,
) => {
  const event = action === "opened" ? EVENTS.MODAL_OPENED : EVENTS.MODAL_CLOSED;

  captureEvent(event, {
    modal_name: modalName,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track tab changes
 */
export const trackTabChange = (
  tabName: string,
  tabIndex: number,
  additionalProps?: Record<string, any>,
) => {
  captureEvent(EVENTS.TAB_CHANGED, {
    tab_name: tabName,
    tab_index: tabIndex,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track JavaScript errors
 */
export const trackError = (
  error: Error,
  errorInfo?: any,
  additionalProps?: Record<string, any>,
) => {
  captureEvent(EVENTS.JAVASCRIPT_ERROR, {
    error_message: error.message,
    error_name: error.name,
    stack_trace: error.stack,
    error_info: errorInfo,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track API errors
 */
export const trackAPIError = (
  endpoint: string,
  statusCode: number,
  errorMessage: string,
  additionalProps?: Record<string, any>,
) => {
  captureEvent(EVENTS.API_ERROR, {
    endpoint,
    status_code: statusCode,
    error_message: errorMessage,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};

/**
 * Track user authentication events
 */
export const trackAuth = (
  action: "signup" | "login" | "logout",
  userId?: string,
  additionalProps?: Record<string, any>,
) => {
  const eventMap = {
    signup: EVENTS.USER_SIGNED_UP,
    login: EVENTS.USER_LOGGED_IN,
    logout: EVENTS.USER_LOGGED_OUT,
  };

  captureEvent(eventMap[action], {
    user_id: userId,
    timestamp: new Date().toISOString(),
    ...additionalProps,
  });
};
