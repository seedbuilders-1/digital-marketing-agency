export interface Payment {
  transactionId: string;
  serviceName: string;
  dateOfIssue: string;
  time: string;
  amount: number;
  status: "paid" | "pending" | "cancelled";
}

export type PaymentFilter =
  | "all"
  | "active"
  | "pending"
  | "completed"
  | "cancelled";
