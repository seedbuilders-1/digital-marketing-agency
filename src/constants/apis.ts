export const api = "https://api.digitalmarketingagency.ng/api";
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
};
