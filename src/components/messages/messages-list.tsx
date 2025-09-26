/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// Helper to format date/time for display
const formatPreviewTime = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const MessagesList = ({ conversations }: { conversations: any }) => {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    // ... (Your existing getStatusBadge logic can be adapted here)
    if (status === "ACTIVE")
      return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
    if (status === "COMPLETED")
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    // ...etc
    return null;
  };

  // Navigate to the correct chat room page
  const handleConversationClick = (serviceRequestId: string) => {
    router.push(`/dashboard/messages/${serviceRequestId}`);
  };

  return (
    <div className="space-y-2">
      {conversations.map((convo: any) => {
        const lastMessage = convo.messages[0]; // The last message we fetched

        return (
          <div
            key={convo.id}
            onClick={() => handleConversationClick(convo.service_request_id)}
            className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            {/* ... Avatar/Icon ... */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {convo.service_request.service.title}
                </h3>
                {getStatusBadge(convo.service_request.status)}
              </div>
              <p className="text-sm text-gray-600 truncate">
                {lastMessage
                  ? `${lastMessage.sender.name}: ${lastMessage.text}`
                  : "No messages yet"}
              </p>
            </div>
            <div className="text-xs text-gray-500 flex-shrink-0">
              {formatPreviewTime(lastMessage?.created_at)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
