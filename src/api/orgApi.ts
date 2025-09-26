/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export const orgApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Mutation to create a new organization profile.
     * This sends multipart/form-data to the backend.
     */
    createOrganization: builder.mutation({
      query: ({ formData }) => ({
        url: `/orgs`,
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: { data: { org: any } }) => response.data,
      // You might want to invalidate a list of organizations if you have one
      //   invalidatesTags: ["Organisation"],
    }),
    createContact: builder.mutation({
      query: (formData) => ({
        url: `/orgs/contact`, // POST /api/orgs/contact
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: { data: { contact: any } }) =>
        response.data,
      // You could invalidate a list of contacts here if you have one
    }),
  }),
});

export const { useCreateOrganizationMutation, useCreateContactMutation } =
  orgApi;
