/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Download } from "lucide-react";

const PaymentsTable = ({ payments }: any) => {
  const router = useRouter();
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayments((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleViewDetails = (paymentId: string) => {
    router.push(`/dashboard/payments/${paymentId}`);
  };

  const handleDownload = (paymentId: string) => {
    console.log("Downloading invoice for payment:", paymentId);
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                <Checkbox />
              </th>
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
            {payments.map((payment: any) => (
              <tr
                key={payment.transactionId}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <Checkbox
                    checked={selectedPayments.includes(payment.transactionId)}
                    onCheckedChange={() =>
                      handleSelectPayment(payment.transactionId)
                    }
                  />
                </td>
                <td className="py-4 px-6 text-gray-900">
                  {payment.transactionId}
                </td>
                <td className="py-4 px-6 text-gray-900">
                  {payment.serviceName}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {payment.dateOfIssue} - {payment.time}
                </td>
                <td className="py-4 px-6 text-gray-900">
                  ₦ {payment.amount.toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(payment.transactionId)}
                      >
                        <Eye size={16} className="mr-2" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(payment.transactionId)}
                      >
                        <Download size={16} className="mr-2" />
                        Download
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
        {payments.map((payment: any) => (
          <div
            key={payment.transactionId}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedPayments.includes(payment.transactionId)}
                  onCheckedChange={() =>
                    handleSelectPayment(payment.transactionId)
                  }
                />
                <span className="font-medium text-gray-900">
                  {payment.transactionId}
                </span>
              </div>
              <Badge className={getStatusColor(payment.status)}>
                {payment.status.charAt(0).toUpperCase() +
                  payment.status.slice(1)}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                {payment.serviceName}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {payment.dateOfIssue} - {payment.time}
              </p>
              <p className="text-lg font-semibold text-gray-900">
                ₦ {payment.amount.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(payment.transactionId)}
                className="flex-1 text-[#7642FE] border-[#7642FE] bg-transparent"
              >
                <Eye size={16} className="mr-2" />
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(payment.transactionId)}
                className="flex-1 bg-transparent"
              >
                <Download size={16} className="mr-2" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsTable;
