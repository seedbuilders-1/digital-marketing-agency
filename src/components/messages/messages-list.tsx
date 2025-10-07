/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// Helper to format the time for the message preview
const formatPreviewTime = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();

  // Check if the date is today
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Check if the date was yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // Otherwise, return the date
  return date.toLocaleDateString("en-GB"); // e.g., 28/09/2025
};

// Helper to map backend status to UI-friendly text and color
const getStatusBadge = (status: any) => {
  switch (status) {
    case "PENDING_APPROVAL":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Pending
        </Badge>
      );
    case "ACTIVE":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          Active
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Completed
        </Badge>
      );
    case "CANCELLED":
    case "DECLINED":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return null;
  }
};

interface MessagesListProps {
  conversations: any;
  isAdminView?: boolean;
}

const MessagesList = ({
  conversations,
  isAdminView = false,
}: MessagesListProps) => {
  const router = useRouter();
  console.log("conversations", conversations);

  // The chat room URL is the same for both admin and user, based on the service request ID
  const handleConversationClick = (serviceRequestId: string) => {
    router.push(`/dashboard/messages/${serviceRequestId}`);
  };

  return (
    <div className="space-y-3">
      {conversations.map((convo: any) => {
        // The last message is the first (and only) in the messages array from our backend query
        const lastMessage = convo.messages[0];

        return (
          <div
            key={convo.id}
            onClick={() => handleConversationClick(convo.service_request_id)}
            className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-purple-600 text-sm">
                {convo.service_request.service.title
                  .substring(0, 2)
                  .toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {convo.service_request.service.title}
                  </h3>
                  {getStatusBadge(convo.service_request.status)}
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {formatPreviewTime(lastMessage?.created_at)}
                </span>
              </div>

              {/* --- CONDITIONAL NAME DISPLAY FOR ADMIN VIEW --- */}
              {isAdminView && (
                <p className="text-sm font-medium text-purple-700 mb-1">
                  Client: {convo.service_request.user.name}
                </p>
              )}

              <p className="text-sm text-gray-600 truncate">
                {lastMessage ? (
                  <>
                    <span className="font-medium">
                      {lastMessage.sender.name.split(" ")[0]}:
                    </span>{" "}
                    {lastMessage.text}
                  </>
                ) : (
                  "No messages in this conversation yet."
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
