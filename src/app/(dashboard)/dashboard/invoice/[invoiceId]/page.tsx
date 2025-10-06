"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InvoicePreview } from "@/components/InvoicePreview";
import { Loader2, FileDown, Eye } from "lucide-react";
import { useGetInvoiceByIdQuery } from "@/api/invoiceApi";
import { PaymentModal } from "@/components/PaymentModal";

export default function InvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.invoiceId as string;

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useGetInvoiceByIdQuery(invoiceId);
  const invoice = invoiceData?.data;

  console.log("invoiceData", error);

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
        <h2>Invoice not found.</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Our Services</h1>
          <p className="text-gray-500">
            Make a request for your preferred service
          </p>
        </header>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Invoice Preview</h2>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-purple-600">
              <Eye className="mr-2 h-4 w-4" />
              Preview order summary
            </Button>
            <Button variant="ghost" className="text-purple-600">
              <FileDown className="mr-2 h-4 w-4" />
              Download invoice
            </Button>
          </div>
        </div>

        <InvoicePreview invoice={invoice} />

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            className="bg-purple-600"
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Make payment
          </Button>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        invoiceId={invoice.id}
      />
    </div>
  );
}
