/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIS } from "@/constants/apis";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Mutation to complete a user's profile with KYC data.
     * This sends multipart/form-data.
     */
    completeUserProfile: builder.mutation({
      query: ({ userId, formData }) => ({
        url: APIS.USER.INDIVIDUAL_COMPLETE_PROFILE(userId),
        method: "POST",
        body: formData,
        // No 'Content-Type' header needed; the browser sets it for multipart/form-data
      }),
      transformResponse: (response: { data: any }) => response.data,
      // After a successful profile update, invalidate the user's cache tag
      // to force a refetch of their data throughout the app.
      //   invalidatesTags: (result, error, { userId }) => [
      //     { type: "User", id: userId },
      //   ],
    }),
  }),
});

export const { useCompleteUserProfileMutation } = userApi;
