/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytics: builder.query({
      query: () => "/analytics/dashboard",
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery } = analyticsApi;
