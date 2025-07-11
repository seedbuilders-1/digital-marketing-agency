"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface PaymentStatsCardsProps {
  stats: {
    totalPayments: number;
    activePayments: number;
    pendingPayments: number;
    completedPayments: number;
  };
}

const PaymentStatsCards = ({ stats }: PaymentStatsCardsProps) => {
  const cards = [
    {
      title: "Total payments",
      amount: stats.totalPayments,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Active payments",
      amount: stats.activePayments,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pending payments",
      amount: stats.pendingPayments,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Completed payments",
      amount: stats.completedPayments,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="border border-gray-200 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {card.title}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${card.amount.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <DollarSign className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaymentStatsCards;
