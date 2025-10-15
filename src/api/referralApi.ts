import { APIS } from "@/constants/apis";
import { baseApi } from "./baseApi";

export const referralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    validateReferral: builder.mutation({
      query: ({ referralEmail }) => ({
        url: APIS.REFERRAL.VALIDATE,
        method: "POST",
        body: { referralEmail },
      }),
    }),
  }),
});

export const { useValidateReferralMutation } = referralApi;
