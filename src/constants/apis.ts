/* eslint-disable @typescript-eslint/no-explicit-any */
const url = process.env.NEXT_PUBLIC_API_BASE_URL;
export const api = `${url}/api`;
const authApi = `${api}/auth`;

export const APIS = {
  AUTH: {
    REGISTER: `${authApi}/register`,
    LOGIN: `${authApi}/login`,
    PASSWORD_RESET_SEND_OTP: `${authApi}/password-recovery/send-otp`,
    PASSWORD_RESET_RESEND_OTP: `${authApi}/password-recovery/resend-otp`,
    RESET_PASSWORD: `${authApi}/password-recovery/reset-password`,
    LOGOUT: `${authApi}/logout`,
    EMAIL_SEND_OTP: `${authApi}/email/send-otp`,
    EMAIL_VERIFY: (id: any) => `${authApi}/verify-email/${id}`,
    EMAIL_RESEND_OTP: `${authApi}/resend-otp`,
    VERIFY_RESET_PASSWORD_OTP: `${authApi}/password-recovery/verify-otp`,
  },
  USER: {
    INDIVIDUAL_COMPLETE_PROFILE: (userId: any) =>
      `${api}/users/profile/${userId}`,
    GET_USER: (id: any) => `${api}/users/${id}`,
    GET_LOGGED_IN_USER: `${api}/users/me`,
  },
  SERVICES: {
    CREATE_SERVICE: `${api}/services`,
    GET_ALL_SERVICES: `${api}/services`,
    GET_ALL_PUBLIC_SERVICES: `${api}/services/public`,
    GET_SERVICE_BY_ID: (id: any) => `${api}/services/${id}`,
    UPDATE_SERVICE_FORM: (serviceId: any) =>
      `${api}/services/${serviceId}/form`,
    UPDATE_SERVICE: (serviceId: any) => `${api}/services/${serviceId}`,
    DELETE_SERVICE: (serviceId: any) => `${api}/services/${serviceId}`,
    INITIALIZE_SERVICE_REQUEST: `${api}/service-requests/initialize`,
    INITIALIZE_WITH_REFERRAL_REQUEST: `${api}/service-requests/initialize-with-referral`,
    GET_USER_SERVICE_REQUESTS: `${api}/service-requests/my-requests`,
    GET_SERVICE_REQUEST_BY_ID: (id: any) => `${api}/service-requests/${id}`,
    GET_ALL_SERVICE_REQUESTS: `${api}/service-requests`,
    UPDATE_SERVICE_REQUEST_STATUS: (requestId: any) =>
      `${api}/service-requests/${requestId}/status`,
    UPLOAD_MILESTONE_DELIVERABLE: (milestoneId: any) =>
      `${api}/milestones/${milestoneId}/deliverable`,
    REVIEW_MILESTONE: (milestoneId: any) =>
      `${api}/milestones/${milestoneId}/review`,
  },
  INVOICE: {
    GET_INVOICE_BY_ID: (id: any) => `${api}/invoices/${id}`,
    INITIALIZE_PAYSTACK_PAYMENT: `${api}/payments/paystack/initialize`,
    VERIFY_PAYSTACK_PAYMENT: (reference: any) =>
      `${api}/payments/paystack/verify/${reference}`,
    GET_USER_INVOICES: `${api}/invoices`,
  },
  CONVERSATION: {
    GET_USER_CONVERSATIONS: `${api}/conversations`,
    GET_MESSAGES_BY_REQUEST_ID: (serviceRequestId: any) =>
      `${api}/conversations/${serviceRequestId}/messages`,
    GET_ADMIN_CONVOS: `${api}/conversations/admin`,
  },
};
