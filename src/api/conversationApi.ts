/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";
import { APIS } from "../constants/apis";

export const conversationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserConversations: builder.query({
      query: () => APIS.CONVERSATION.GET_USER_CONVERSATIONS,
      transformResponse: (response: { data: any }) => response.data,
    }),
    getMessagesByRequestId: builder.query({
      query: (serviceRequestId) =>
        APIS.CONVERSATION.GET_MESSAGES_BY_REQUEST_ID(serviceRequestId),
      transformResponse: (response: { data: any }) => response.data,
      //   providesTags: (result, error, id) => [{ type: "Messages", id }],
    }),
    getAdminConversations: builder.query({
      query: () => APIS.CONVERSATION.GET_ADMIN_CONVOS, // Calls the new backend endpoint
      transformResponse: (response: { data: any }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Conversation" as const,
                id,
              })),
              { type: "Conversation", id: "LIST" },
            ]
          : [{ type: "Conversation", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserConversationsQuery,
  useGetMessagesByRequestIdQuery,
  useGetAdminConversationsQuery,
} = conversationApi;
