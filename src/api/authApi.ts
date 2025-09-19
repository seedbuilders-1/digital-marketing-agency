import { baseApi } from "./baseApi";
import { APIS } from "../constants/apis";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: APIS.AUTH.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: APIS.AUTH.REGISTER,
        method: "POST",
        body: userData,
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ id, body }) => ({
        url: APIS.AUTH.EMAIL_VERIFY(id),
        method: "POST",
        body: body,
      }),
    }),
    emailResendOtp: builder.mutation({
      query: (userData) => ({
        url: APIS.AUTH.EMAIL_RESEND_OTP,
        method: "POST",
        body: userData,
      }),
    }),
    passwordResetSendOtp: builder.mutation({
      query: (userData) => ({
        url: APIS.AUTH.PASSWORD_RESET_SEND_OTP,
        method: "POST",
        body: userData,
      }),
    }),
    verifyResetOtp: builder.mutation({
      query: (userData) => ({
        url: APIS.AUTH.VERIFY_RESET_PASSWORD_OTP,
        method: "POST",
        body: userData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (userData) => ({
        url: APIS.AUTH.RESET_PASSWORD,
        method: "POST",
        body: userData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useEmailResendOtpMutation,
  usePasswordResetSendOtpMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
} = authApi;
