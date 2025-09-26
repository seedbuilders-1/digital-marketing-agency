export const api = "http://localhost:3000/api";
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
    EMAIL_VERIFY: (id) => `${authApi}/verify-email/${id}`,
    EMAIL_RESEND_OTP: `${authApi}/resend-otp`,
    VERIFY_RESET_PASSWORD_OTP: `${authApi}/password-recovery/verify-otp`,
  },
  SERVICES: {
    CREATE_SERVICE: `${api}/services`,
    GET_ALL_SERVICES: `${api}/services`,
    GET_SERVICE_BY_ID: (id) => `${api}/services/${id}`,
    UPDATE_SERVICE_FORM: (serviceId) => `${api}/services/${serviceId}/form`,
    INITIALIZE_SERVICE_REQUEST: `${api}/service-requests/initialize`,
    GET_USER_SERVICE_REQUESTS: `${api}/service-requests/my-requests`,
    GET_SERVICE_REQUEST_BY_ID: (id) => `${api}/service-requests/${id}`,
    GET_ALL_SERVICE_REQUESTS: `${api}/service-requests`,
    UPDATE_SERVICE_REQUEST_STATUS: (requestId) =>
      `${api}/service-requests/${requestId}/status`,
    UPLOAD_MILESTONE_DELIVERABLE: (milestoneId) =>
      `${api}/milestones/${milestoneId}/deliverable`,
    REVIEW_MILESTONE: (milestoneId) =>
      `${api}/milestones/${milestoneId}/review`,
  },
  INVOICE: {
    GET_INVOICE_BY_ID: (id) => `${api}/invoices/${id}`,
    INITIALIZE_PAYSTACK_PAYMENT: `${api}/payments/paystack/initialize`,
    VERIFY_PAYSTACK_PAYMENT: (reference) =>
      `${api}/payments/paystack/verify/${reference}`,
    GET_USER_INVOICES: `${api}/invoices`,
  },
};
