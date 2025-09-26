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
    }),
    getAllServies: builder.query({
      query: () => ({
        url: APIS.SERVICES.GET_ALL_SERVICES,
        method: "GET",
      }),
    }),
    getServiceById: builder.query({
      query: (id) => ({
        url: APIS.SERVICES.GET_SERVICE_BY_ID(id),
        method: "GET",
      }),
    }),
    updateServiceForm: builder.mutation({
      query: ({ serviceId, formFields }) => ({
        url: APIS.SERVICES.UPDATE_SERVICE_FORM(serviceId), // Matches your new route
        method: "PUT",
        body: { formFields }, // Sends the JSON in the body
      }),
    }),
    initializeServiceRequest: builder.mutation({
      query: (requestData) => ({
        url: APIS.SERVICES.INITIALIZE_SERVICE_REQUEST, // <-- This is the API route it calls
        method: "POST",
        body: requestData,
      }),
    }),
    getUserServiceRequests: builder.query({
      query: () => ({
        url: APIS.SERVICES.GET_USER_SERVICE_REQUESTS,
        method: "GET",
        // providesTags: ["ServiceRequest"],
      }),
    }),
    getServiceRequestById: builder.query({
      query: (id) => ({
        url: APIS.SERVICES.GET_SERVICE_REQUEST_BY_ID(id),
        method: "GET",
      }),
    }),
    getAllServicesRequest: builder.query({
      query: () => ({
        url: APIS.SERVICES.GET_ALL_SERVICE_REQUESTS,
        method: "GET",
      }),
    }),
    updateServiceRequestStatus: builder.mutation({
      query: ({ requestId, status, milestones }) => ({
        url: APIS.SERVICES.UPDATE_SERVICE_REQUEST_STATUS(requestId),
        method: "PATCH",
        body: { status, milestones },
      }),
    }),
    uploadMilestoneDeliverable: builder.mutation({
      query: ({ milestoneId, formData }) => {
        return {
          url: APIS.SERVICES.UPLOAD_MILESTONE_DELIVERABLE(milestoneId),
          method: "POST",
          body: formData,
        };
      },
    }),
    reviewMilestone: builder.mutation({
      query: ({ milestoneId, ...body }) => ({
        url: APIS.SERVICES.REVIEW_MILESTONE(milestoneId),
        method: "PATCH",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateServiceMutation,
  useGetAllServiesQuery,
  useGetServiceByIdQuery,
  useInitializeServiceRequestMutation,
  useUpdateServiceFormMutation,
  useGetUserServiceRequestsQuery,
  useGetServiceRequestByIdQuery,
  useGetAllServicesRequestQuery,
  useUpdateServiceRequestStatusMutation,
  useUploadMilestoneDeliverableMutation,
  useReviewMilestoneMutation,
} = servicesApi;
