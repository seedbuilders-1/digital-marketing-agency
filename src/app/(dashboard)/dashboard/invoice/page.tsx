/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, FileWarning } from "lucide-react";
import { useGetUserInvoicesQuery } from "@/api/invoiceApi";

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

// Helper to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB");
};

// Helper for status badges
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Paid
        </Badge>
      );
    case "unpaid":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Unpaid
        </Badge>
      );
    case "overdue":
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function InvoicesListPage() {
  const router = useRouter();
  const {
    data: invoicesData,
    isLoading,
    isError,
  } = useGetUserInvoicesQuery(undefined);
  const invoices = invoicesData || [];

  console.log("invoicesData", invoicesData);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load invoices</h2>
        <p className="text-gray-600">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">My Invoices</h1>
        <p className="text-gray-500">
          Track and manage all your payments in one place.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice: any) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-xs text-gray-600">
                      #{invoice.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.service_request.service.title}
                    </TableCell>
                    <TableCell>{formatDate(invoice.created_at)}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/dashboard/invoice/${invoice.id}`)
                        }
                      >
                        {invoice.status.toLowerCase() === "unpaid"
                          ? "Pay Now"
                          : "View"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <FileWarning className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="font-semibold text-lg">No Invoices Found</h3>
              <p className="text-gray-500">
                When you request a service, your invoices will appear here.
              </p>
              <Button asChild className="mt-6 bg-purple-600">
                <Link href="/dashboard/services">Browse Services</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
