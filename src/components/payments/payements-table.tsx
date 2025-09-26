// src/components/payments/payments-table.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Download } from "lucide-react";

// Helper to format dates and times
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }); // 04:30 PM
  return `${formattedDate} - ${formattedTime}`;
};

// Helper for currency formatting
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

const PaymentsTable = ({ invoices }: { invoices: any }) => {
  const router = useRouter();
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleViewDetails = (invoiceId: string) => {
    // Navigate to the specific invoice detail page
    router.push(`/dashboard/invoice/${invoiceId}`);
  };

  const handleDownload = (invoiceId: string) => {
    // This would trigger a backend endpoint to generate and download a PDF
    console.log("Downloading invoice for:", invoiceId);
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-50 border-b">
            <tr>
              {/* Add headers as needed */}
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Transaction ID
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Service Name
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Date of Issue
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Amount
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 text-gray-900 font-mono text-xs">
                  {invoice.id}
                </td>
                <td className="py-4 px-6 text-gray-900">
                  {invoice?.service_request?.service?.title}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {formatDateTime(invoice.created_at)}
                </td>
                <td className="py-4 px-6 text-gray-900 font-semibold">
                  {formatCurrency(invoice.amount)}
                </td>
                <td className="py-4 px-6">
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(invoice.id)}
                      >
                        <Eye size={16} className="mr-2" /> View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(invoice.id)}
                      >
                        <Download size={16} className="mr-2" /> Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="font-mono text-xs text-gray-800">
                {invoice.id}
              </div>
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                {invoice?.service_request?.service?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {formatDateTime(invoice?.created_at)}
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(invoice?.amount)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(invoice.id)}
                className="flex-1 text-[#7642FE] border-[#7642FE] bg-transparent"
              >
                <Eye size={16} className="mr-2" /> View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(invoice.id)}
                className="flex-1 bg-transparent"
              >
                <Download size={16} className="mr-2" /> Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsTable;
