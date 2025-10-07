/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, AlertCircle } from "lucide-react";

// API & State
import {
  useGetUserConversationsQuery,
  useGetAdminConversationsQuery,
} from "@/api/conversationApi";
import { selectCurrentUser } from "@/features/auth/selectors";

// Components
import MessagesSidebar, {
  MessageFilter,
} from "@/components/messages/messages-sidebar";
import MessagesList from "@/components/messages/messages-list";

const MessagesPageSkeleton = () => (
  <div className="px-4 sm:px-6 py-4 sm:py-8 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-8 w-40 bg-gray-200 rounded-md mb-8"></div>
      <div className="flex gap-6">
        <div className="hidden md:block w-64 h-60 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 space-y-3">
          <div className="h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function MessagesPage() {
  const [selectedFilter, setSelectedFilter] = useState<MessageFilter>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useSelector(selectCurrentUser);
  const isAdmin = user?.role?.title === "admin";

  // --- THE DEFINITIVE FIX: UNCONDITIONAL HOOK CALLS ---

  // Call the user hook, but skip it if the user is an admin or doesn't exist yet.
  const {
    data: userConversations = [],
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserConversationsQuery(undefined, {
    skip: isAdmin || !user,
  });

  // Call the admin hook, but skip it if the user is NOT an admin.
  const {
    data: adminConversations = [],
    isLoading: isLoadingAdmin,
    isError: isErrorAdmin,
  } = useGetAdminConversationsQuery(undefined, {
    skip: !isAdmin,
  });

  // --- END FIX ---

  // Determine the final data and loading states based on the user's role
  const conversations = isAdmin ? adminConversations : userConversations;
  const isLoading = isAdmin ? isLoadingAdmin : isLoadingUser;
  const isError = isAdmin ? isErrorAdmin : isErrorUser;

  console.log("userConversations", conversations);

  // The rest of the component logic remains the same
  const filteredConversations = useMemo(() => {
    if (selectedFilter === "all") {
      return conversations;
    }
    return conversations.filter(
      (convo: any) => convo.service_request.status === selectedFilter
    );
  }, [conversations, selectedFilter]);

  if (isLoading) {
    return <MessagesPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load messages</h2>
        <p className="text-gray-600">Please try refreshing the page.</p>
      </div>
    );
  }

  const hasConversations = filteredConversations.length > 0;

  return (
    <Suspense fallback={<MessagesPageSkeleton />}>
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
                  onFilterChange={(filter: any) => {
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
              {hasConversations ? (
                <MessagesList
                  conversations={filteredConversations}
                  isAdminView={isAdmin}
                />
              ) : (
                <div className="flex items-center justify-center h-64 sm:h-96 bg-white border rounded-lg">
                  <p className="text-gray-500 text-base sm:text-lg">
                    No messages match your current filter.
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
