import { baseApi } from "./baseApi";
import { APIS } from "../constants/apis";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoiceById: builder.query({
      query: (id) => ({
        url: APIS.INVOICE.GET_INVOICE_BY_ID(id),
        method: "GET",
      }),
    }),
    // This is a placeholder for initiating a payment
    processPayment: builder.mutation({
      query: ({ invoiceId, paymentMethod }) => ({
        url: `/payments/process`, // A hypothetical payment processing endpoint
        method: "POST",
        body: { invoiceId, paymentMethod },
      }),
    }),
    initializePaystackPayment: builder.mutation<
      { authorization_url: string }, // Expected successful response data
      { invoiceId: string } // Arguments for the mutation
    >({
      query: ({ invoiceId }) => ({
        url: APIS.INVOICE.INITIALIZE_PAYSTACK_PAYMENT,
        method: "POST",
        body: { invoiceId },
      }),
      // We get the URL from the `data` property of our backend's sendSuccess wrapper
      transformResponse: (response: { data: { authorization_url: string } }) =>
        response.data,
    }),

    verifyPaystackPayment: builder.query<
      { invoice: any; message: string }, // Expected successful response data
      string // The reference string is the argument
    >({
      query: (reference) => APIS.INVOICE.VERIFY_PAYSTACK_PAYMENT(reference),
      transformResponse: (response: {
        data: { invoice: any; message: string };
      }) => response.data,
      /**
       * After successful verification, we MUST invalidate the caches for both
       * the specific invoice and the service request it belongs to. This ensures
       * that when the user navigates back, they see the updated "Paid" status.
       */
      // invalidatesTags: (result, error, reference) =>
      //   result
      //     ? [
      //         { type: "Invoice", id: result.invoice.id },
      //         { type: "ServiceRequest", id: result.invoice.service_request_id },
      //       ]
      //     : [],
    }),
    getUserInvoices: builder.query({
      // Returns an array of Invoices
      query: () => APIS.INVOICE.GET_USER_INVOICES,
      // The backend wraps the response in a `data` object, so we extract it here.
      transformResponse: (response: { data: any }) => response.data,
      // Provides a tag for caching purposes.
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.map(({ id }) => ({ type: "Invoice" as const, id })),
      //         { type: "Invoice", id: "LIST" },
      //       ]
      //     : [{ type: "Invoice", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetInvoiceByIdQuery,
  useProcessPaymentMutation,
  useInitializePaystackPaymentMutation,
  useVerifyPaystackPaymentQuery,
  useGetUserInvoicesQuery,
} = invoiceApi;
