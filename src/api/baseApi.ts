/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: api,
  prepareHeaders: (headers, { getState }: any) => {
    // Correctly type getState to access your RootState
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Explicitly type the arguments for better safety and intellisense
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Check for a 401 Unauthorized error
  if (result.error && result.error.status === 401) {
    // Dispatch the logout action to clear user credentials from the store
    api.dispatch(logout());
    // Optionally, you could dispatch another action here to set a "sessionExpired" flag
    // api.dispatch(sessionExpired());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Services", "Analytics"],
  endpoints: () => ({}),
});

import { RootState } from "@/features/store";
import { api } from "@/constants/apis";
