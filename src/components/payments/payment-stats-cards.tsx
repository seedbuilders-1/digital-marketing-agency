// src/components/payments/payment-stats-cards.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Hourglass, CheckCircle } from "lucide-react";

// Helper for consistent currency formatting
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

// Update the interface to match the stats object from the parent page
interface PaymentStatsCardsProps {
  stats: {
    totalPayments: number;
    pendingPayments: number;
    completedPayments: number;
  };
}

const PaymentStatsCards = ({ stats }: PaymentStatsCardsProps) => {
  // The card data is now mapped directly to the props and has dynamic styling
  const cards = [
    {
      title: "Total Payments",
      amount: stats.totalPayments,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pending Payments",
      amount: stats.pendingPayments,
      icon: Hourglass, // More descriptive icon
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Completed Payments",
      amount: stats.completedPayments,
      icon: CheckCircle, // More descriptive icon
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    // Updated grid to handle 3 cards gracefully
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="border border-gray-200 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {card.title}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {formatCurrency(card.amount)}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaymentStatsCards;
