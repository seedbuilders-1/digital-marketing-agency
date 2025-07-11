"use client";

import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { Message } from "@/lib/types/messages";

interface MessagesListProps {
  messages: Message[];
  selectedMessages: string[];
  onSelectMessage: (messageId: string) => void;
  onSelectAll: () => void;
}

const MessagesList = ({
  messages,
  selectedMessages,
  onSelectMessage,
  onSelectAll,
}: MessagesListProps) => {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "project-request-sent":
        return (
          <Badge className="bg-orange-100 text-orange-800 text-xs whitespace-nowrap">
            Project Request Sent
          </Badge>
        );
      case "work-in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 text-xs whitespace-nowrap">
            Work In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 text-xs whitespace-nowrap">
            Completed Project
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleMessageClick = (messageId: string) => {
    router.push(`/messages/${messageId}`);
  };

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedMessages.includes(message.id)
              ? "bg-purple-50 border-purple-200"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          <Checkbox
            checked={selectedMessages.includes(message.id)}
            onCheckedChange={() => onSelectMessage(message.id)}
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0"
          />

          <div
            className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0"
            onClick={() => handleMessageClick(message.id)}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600 font-medium text-xs sm:text-sm">
                DM
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                  {message.title}
                </h3>
                <div className="flex-shrink-0">
                  {getStatusBadge(message.status)}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-2">
                {message.preview}
              </p>
              <p className="text-xs text-gray-500">{message.targetDate}</p>
            </div>

            <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
              {message.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
