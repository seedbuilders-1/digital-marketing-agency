/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useMemo, useState } from "react";

import MessagesList from "@/components/messages/messages-list";
import MessagesSidebar from "@/components/messages/messages-sidebar";
import type { MessageFilter } from "@/lib/types/messages";
import { useGetUserConversationsQuery } from "@/api/conversationApi";

export default function MessagesPage() {
  const [selectedFilter, setSelectedFilter] = useState<MessageFilter>("all");

  // Fetch live conversation data
  const { data: conversations = [], isLoading } =
    useGetUserConversationsQuery(undefined);

  const filteredConversations = useMemo(() => {
    if (selectedFilter === "all") {
      return conversations;
    }
    // Filter based on the service request status attached to each conversation
    return conversations.filter(
      (convo: any) => convo.service_request.status === selectedFilter
    );
  }, [conversations, selectedFilter]);

  if (isLoading) {
    return <div>Loading conversations...</div>; // Replace with a skeleton loader
  }

  const hasConversations = filteredConversations.length > 0;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* ... Header and Mobile Sheet ... */}
          <div className="flex gap-6">
            <div className="hidden md:block w-64">
              <MessagesSidebar
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </div>
            <div className="flex-1 min-w-0">
              {hasConversations ? (
                <MessagesList conversations={filteredConversations} />
              ) : (
                <div className="flex items-center justify-center h-96">
                  <p className="text-gray-500">
                    No messages match your filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
