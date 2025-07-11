export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "completed" | "cancelled";
  payment: number;
}

export type ProjectFilter =
  | "all"
  | "active"
  | "pending"
  | "completed"
  | "cancelled";
