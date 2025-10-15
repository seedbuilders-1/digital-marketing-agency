"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InvoicePreview } from "@/components/InvoicePreview";
import { Loader2, FileDown, Eye, CheckCircle, ArrowLeft } from "lucide-react";
import { useGetInvoiceByIdQuery } from "@/api/invoiceApi";
import { PaymentModal } from "@/components/PaymentModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function InvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.invoiceId as string;

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Add a refetchOnMountOrArgChange to always get the latest invoice status
  const {
    data: invoiceData,
    isLoading,
    isError,
  } = useGetInvoiceByIdQuery(invoiceId, {
    refetchOnMountOrArgChange: true,
  });

  const invoice = invoiceData?.data;

  // --- DERIVED STATE ---
  // A boolean to easily check if the invoice has been paid.
  // We use .toLowerCase() for a case-insensitive and robust check.
  const isPaid = invoice?.status?.toLowerCase() === "paid";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
      </div>
    );
  }

  if (isError || !invoice) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-bold">Invoice Not Found</h2>
        <p className="text-gray-500 mt-2">
          The link may be invalid or the invoice has been removed.
        </p>
        <Button
          onClick={() => router.push("/dashboard/invoices")}
          className="mt-6"
        >
          Back to Invoices
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/invoices")}
            className="flex items-center gap-2 text-purple-600 mb-4 p-0 hover:bg-transparent"
          >
            <ArrowLeft size={20} />
            Back to all invoices
          </Button>
          <h1 className="text-3xl font-bold">Invoice Details</h1>
          <p className="text-gray-500">
            {isPaid
              ? "Thank you for your payment."
              : "Please review and complete your payment."}
          </p>
        </header>

        {/* --- NEW: Paid Confirmation Alert --- */}
        {isPaid && (
          <Alert className="mb-8 bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="font-bold">Payment Confirmed</AlertTitle>
            <AlertDescription>
              This invoice has been successfully paid. Your project is now being
              processed.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Invoice Preview</h2>
          <div className="flex gap-2 sm:gap-4">
            <Button variant="ghost" className="text-purple-600">
              <Eye className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Order Summary</span>
            </Button>
            <Button variant="ghost" className="text-purple-600">
              <FileDown className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </div>

        <InvoicePreview invoice={invoice} />

        {/* --- UPDATED: Conditional Action Buttons --- */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>

          {/* Only show the 'Make Payment' button if the invoice is NOT paid */}
          {!isPaid && (
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Make Payment
            </Button>
          )}
        </div>
      </div>

      {/* The payment modal will only be triggered if the button is visible */}
      {!isPaid && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          invoiceId={invoice.id}
        />
      )}
    </div>
  );
}
