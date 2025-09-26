// src/app/dashboard/payments/page.tsx (or your path)

"use client";

import { Suspense, useState, useMemo } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PaymentStatsCards from "@/components/payments/payment-stats-cards";
import { useGetUserInvoicesQuery } from "@/api/invoiceApi";
import PaymentsTable from "@/components/payments/payements-table";

// Define the filter type based on your actual invoice statuses
type PaymentFilter = "all" | "Paid" | "Pending";

const PaymentsPageSkeleton = () => (
  // A simple skeleton loader for the page
  <div className="px-4 sm:px-6 py-4 sm:py-8 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-10 w-1/3 bg-gray-200 rounded-md mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="h-24 bg-gray-200 rounded-lg"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="h-96 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<PaymentFilter>("all");

  const { data: invoices = [], isLoading, isError } = useGetUserInvoicesQuery();

  console.log("invoices", invoices);

  // Memoize filtered invoices to prevent recalculation on every render
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice?.service_request?.service?.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" || invoice.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [invoices, searchTerm, selectedFilter]);

  // Memoize stats calculation
  const stats = useMemo(() => {
    return {
      totalPayments: invoices.reduce(
        (sum, inv) => sum + parseInt(inv.amount),
        0
      ),
      pendingPayments: invoices
        .filter((inv) => inv.status === "Unpaid")
        .reduce((sum, inv) => sum + parseInt(inv.amount), 0),
      completedPayments: invoices
        .filter((inv) => inv.status === "Paid")
        .reduce((sum, inv) => sum + parseInt(inv.amount), 0),
    };
  }, [invoices]);

  if (isLoading) {
    return <PaymentsPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load payments</h2>
        <p className="text-gray-600">Please try refreshing the page.</p>
      </div>
    );
  }

  const hasInvoices = filteredInvoices.length > 0;

  return (
    <Suspense fallback={<PaymentsPageSkeleton />}>
      <div className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Payment & Billings
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Track all your service payments and invoices in one place.
            </p>
          </div>

          {/* Stats Cards */}
          <PaymentStatsCards stats={stats} />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {[
                { key: "all", label: "All" },
                { key: "Paid", label: "Paid" },
                { key: "Pending", label: "Pending" },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={
                    selectedFilter === filter.key ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedFilter(filter.key as PaymentFilter)}
                  className={`whitespace-nowrap ${
                    selectedFilter === filter.key
                      ? "bg-[#7642FE] text-white"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search by Service or Transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Content */}
          {hasInvoices ? (
            <PaymentsTable invoices={filteredInvoices} />
          ) : (
            <div className="flex items-center justify-center h-64 sm:h-96 bg-white rounded-lg border">
              <p className="text-gray-500 text-base sm:text-lg">
                No payments match your current filters.
              </p>
            </div>
          )}

          {/* Pagination (Note: This is still static. Real pagination requires backend support) */}
          {hasInvoices && (
            <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
              <span>
                Showing {filteredInvoices.length} of {invoices.length} entries
              </span>
              {/* Pagination UI remains for demonstration */}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
