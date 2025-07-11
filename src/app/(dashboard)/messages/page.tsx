"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import MessagesList from "@/components/messages/messages-list";
import MessagesSidebar from "@/components/messages/messages-sidebar";
import DeleteConfirmationModal from "@/components/messages/delete-confirmation-modal";
import { MESSAGES_DATA } from "@/lib/constants/messages";
import type { Message, MessageFilter } from "@/lib/types/messages";

export default function MessagesPage() {
  const [selectedFilter, setSelectedFilter] = useState<MessageFilter>("all");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>(MESSAGES_DATA);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredMessages = messages.filter((message) => {
    switch (selectedFilter) {
      case "unread":
        return !message.isRead;
      case "archived":
        return message.isArchived;
      case "work-in-progress":
        return message.status === "work-in-progress";
      case "completed":
        return message.status === "completed";
      default:
        return !message.isArchived;
    }
  });

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map((m) => m.id));
    }
  };

  const handleDelete = () => {
    setMessages((prev) =>
      prev.filter((message) => !selectedMessages.includes(message.id))
    );
    setSelectedMessages([]);
    setShowDeleteModal(false);
  };

  const handleArchive = () => {
    setMessages((prev) =>
      prev.map((message) =>
        selectedMessages.includes(message.id)
          ? { ...message, isArchived: true }
          : message
      )
    );
    setSelectedMessages([]);
  };

  const hasMessages = filteredMessages.length > 0;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Messages
            </h1>

            {/* Mobile Sidebar Toggle */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden bg-transparent"
                >
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-6">
                <MessagesSidebar
                  selectedFilter={selectedFilter}
                  onFilterChange={(filter) => {
                    setSelectedFilter(filter);
                    setSidebarOpen(false);
                  }}
                />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-4 lg:gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <MessagesSidebar
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {hasMessages ? (
                <>
                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <Select value="all-messages">
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-messages">
                            All Messages
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedMessages.length > 0 && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">
                          {selectedMessages.length} item
                          {selectedMessages.length > 1 ? "s" : ""} selected
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowDeleteModal(true)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleArchive}
                            className="text-gray-600 border-gray-200 hover:bg-gray-50 bg-transparent"
                          >
                            Archive
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Messages List */}
                  <MessagesList
                    messages={filteredMessages}
                    selectedMessages={selectedMessages}
                    onSelectMessage={handleSelectMessage}
                    onSelectAll={handleSelectAll}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-64 sm:h-96">
                  <p className="text-gray-500 text-base sm:text-lg">
                    There are no messages
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </Suspense>
  );
}
