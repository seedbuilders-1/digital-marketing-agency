"use client";

import { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENTS_DATA } from "@/lib/constants/payments";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/selectors";

export default function PaymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const paymentId = params.paymentId as string;

  const payment = PAYMENTS_DATA.find((p) => p.transactionId === paymentId);

  const user = useSelector(selectCurrentUser);

  if (!payment) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Payment Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested payment could not be found.
          </p>
          <Button onClick={() => router.push("/dashboard/payments")}>
            Back to Payments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard/payments")}
              className="flex items-center gap-2 text-[#7642FE] hover:text-[#5f35cc] mb-4 p-2 sm:px-4"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to payment list</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Order Details
              </h1>
              <Badge className="bg-green-100 text-green-800 self-start sm:self-auto">
                Paid
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Payment preview</CardTitle>
                  <Button variant="link" className="text-[#7642FE] p-0">
                    View project details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Payment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID</span>
                      <span className="font-medium">
                        {payment.transactionId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mode of Payment</span>
                      <span className="font-medium">PayPal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Transaction</span>
                      <span className="font-medium">
                        {payment.dateOfIssue} 12:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        Paid
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Invoice preview</CardTitle>
                  <Button variant="link" className="text-[#7642FE] p-0">
                    View invoice details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">INVOICE</h2>
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>Billed to</strong>
                        </div>
                        <div>{user.address}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-[#7642FE] text-white px-4 py-2 rounded mb-4">
                        <span className="font-bold">DMA</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="font-medium">
                          Digital Marketing Agency Inc.
                        </div>
                        <div>6A Embu Street, Wuse 2</div>
                        <div>Abuja, FCT</div>
                        <div>Nigeria</div>
                        <div>44 Ogunlana Drive</div>
                        <div>Surulere, Lagos</div>
                        <div>Nigeria</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <div className="font-medium">Invoice #</div>
                      <div>INV-001</div>
                    </div>
                    <div>
                      <div className="font-medium">Services</div>
                      <div>Digital Marketing Audit</div>
                    </div>
                    <div>
                      <div className="font-medium">Invoice date</div>
                      <div>01 Aug, 2023</div>
                    </div>
                    <div>
                      <div className="font-medium">Qty</div>
                      <div>1</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Line total</span>
                      <span className="font-bold text-lg">
                        ₦{payment.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
