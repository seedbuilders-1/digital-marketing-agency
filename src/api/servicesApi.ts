import { baseApi } from "./baseApi";
import { APIS } from "../constants/apis";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => ({
        url: APIS.SERVICES.CREATE_SERVICE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),

    getAllServies: builder.query({
      query: () => ({
        url: APIS.SERVICES.GET_ALL_SERVICES,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    getAllPublicServices: builder.query({
      query: () => ({
        url: APIS.SERVICES.GET_ALL_PUBLIC_SERVICES,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    getServiceById: builder.query({
      query: (id) => ({
        url: APIS.SERVICES.GET_SERVICE_BY_ID(id),
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    updateServiceForm: builder.mutation({
      query: ({ serviceId, formFields }) => ({
        url: APIS.SERVICES.UPDATE_SERVICE_FORM(serviceId), // Matches your new route
        method: "PUT",
        body: { formFields }, // Sends the JSON in the body
      }),
      invalidatesTags: ["Services"],
    }),
    updateService: builder.mutation({
      query: ({ serviceId, data }) => ({
        url: APIS.SERVICES.UPDATE_SERVICE(serviceId), // Matches your new route
        method: "PUT",
        body: data, // Sends the JSON in the body
      }),
      invalidatesTags: ["Services"],
    }),
    initializeServiceRequest: builder.mutation({
      query: (requestData) => ({
        url: APIS.SERVICES.INITIALIZE_SERVICE_REQUEST, // <-- This is the API route it calls
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["Services"],
    }),
    initializeWithReferral: builder.mutation({
      query: (requestData) => ({
        url: APIS.SERVICES.INITIALIZE_WITH_REFERRAL_REQUEST,
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["Services"],
    }),
    getUserServiceRequests: builder.query({
      query: () => ({
        url: APIS.SERVICES.GET_USER_SERVICE_REQUESTS,
        method: "GET",
        // providesTags: ["ServiceRequest"],
      }),
      providesTags: ["Services"],
    }),
    getServiceRequestById: builder.query({
      query: (id) => ({
        url: APIS.SERVICES.GET_SERVICE_REQUEST_BY_ID(id),
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    getAllServicesRequest: builder.query({
      query: () => ({
        url: APIS.SERVICES.GET_ALL_SERVICE_REQUESTS,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    updateServiceRequestStatus: builder.mutation({
      query: ({ requestId, status, milestones }) => ({
        url: APIS.SERVICES.UPDATE_SERVICE_REQUEST_STATUS(requestId),
        method: "PATCH",
        body: { status, milestones },
      }),
      invalidatesTags: ["Services"],
    }),
    uploadMilestoneDeliverable: builder.mutation({
      query: ({ milestoneId, formData }) => {
        return {
          url: APIS.SERVICES.UPLOAD_MILESTONE_DELIVERABLE(milestoneId),
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Services"],
    }),
    reviewMilestone: builder.mutation({
      query: ({ milestoneId, ...body }) => ({
        url: APIS.SERVICES.REVIEW_MILESTONE(milestoneId),
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: APIS.SERVICES.DELETE_SERVICE(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateServiceMutation,
  useGetAllServiesQuery,
  useGetAllPublicServicesQuery,
  useGetServiceByIdQuery,
  useDeleteServiceMutation,
  useInitializeServiceRequestMutation,
  useUpdateServiceFormMutation,
  useGetUserServiceRequestsQuery,
  useGetServiceRequestByIdQuery,
  useGetAllServicesRequestQuery,
  useUpdateServiceRequestStatusMutation,
  useUploadMilestoneDeliverableMutation,
  useReviewMilestoneMutation,
  useUpdateServiceMutation,
  useInitializeWithReferralMutation,
} = servicesApi;
