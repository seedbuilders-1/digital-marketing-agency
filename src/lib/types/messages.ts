export interface Message {
  id: string;
  title: string;
  preview: string;
  targetDate: string;
  time: string;
  status: "project-request-sent" | "work-in-progress" | "completed";
  isRead: boolean;
  isArchived: boolean;
}

export type MessageFilter =
  | "all"
  | "unread"
  | "archived"
  | "work-in-progress"
  | "completed";
