/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";

// Hooks & API
import { useSocket } from "@/context/SocketProvider";
import { useGetMessagesByRequestIdQuery } from "@/api/conversationApi";
import { useGetServiceRequestByIdQuery } from "@/api/servicesApi";
import { selectCurrentUser } from "@/features/auth/selectors";

// UI Components & Types
import { Button } from "@/components/ui/button";
import { Message } from "@/lib/types/messages";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// --- Reusable Components (Now More Compact) ---

const ChatPageSkeleton = () => (
  // Skeleton remains the same, as it's a placeholder
  <div className="flex flex-col h-full animate-pulse">
    <div className="p-4 border-b h-16 bg-gray-100 dark:bg-gray-800"></div>
    <div className="flex-1 p-4 space-y-4">
      <div className="h-10 w-3/5 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg ml-auto"></div>
      <div className="h-12 w-4/5 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
    <div className="p-4 border-t h-16 bg-gray-100 dark:bg-gray-800"></div>
  </div>
);

const ChatHeader = ({
  projectTitle,
  onBack,
}: {
  projectTitle: string;
  onBack: () => void;
}) => (
  // REDUCED PADDING: p-3 for a shorter header
  <header className="flex items-center gap-3 p-3 border-b z-10 bg-white dark:bg-gray-900 sticky top-0">
    <Button
      variant="ghost"
      size="icon"
      onClick={onBack}
      className="md:hidden flex-shrink-0"
    >
      <ArrowLeft size={20} />
    </Button>
    {/* SMALLER AVATAR: h-9 w-9 */}
    <Avatar className="h-9 w-9">
      <AvatarFallback className="text-xs">
        {projectTitle.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col min-w-0">
      {/* REDUCED FONT SIZE: text-base */}
      <h1 className="text-base font-semibold text-gray-900 dark:text-white truncate">
        {projectTitle}
      </h1>
      {/* SMALLER SUBTEXT */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Project Conversation
      </p>
    </div>
  </header>
);

const MessageBubble = ({ msg, isSender }: { msg: any; isSender: boolean }) => (
  // REDUCED GAP: gap-2 for tighter alignment
  <div
    className={`flex items-end gap-2 max-w-lg ${
      // Increased max-width slightly
      isSender ? "ml-auto flex-row-reverse" : "mr-auto"
    }`}
  >
    <div
      // REDUCED PADDING: p-2 px-3 for a snugger bubble
      className={`p-2 px-3 rounded-xl ${
        isSender
          ? "bg-blue-600 text-white rounded-br-none"
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none"
      }`}
    >
      <p
        className="text-sm"
        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
      >
        {msg.text}
      </p>
    </div>
  </div>
);

const MessageList = ({
  messages,
  userId,
  messagesEndRef,
}: {
  messages: Message[];
  userId: string | undefined;
  messagesEndRef: any;
}) => (
  // REDUCED PADDING & SPACING: p-4 and space-y-4
  <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
    {messages.map((msg: any) => (
      <MessageBubble
        key={msg.id}
        msg={msg}
        isSender={msg.sender_id === userId}
      />
    ))}
    <div ref={messagesEndRef} />
  </main>
);

const MessageInput = ({
  newMessageText,
  setNewMessageText,
  handleSendMessage,
  handleKeyDown,
}: {
  newMessageText: string;
  setNewMessageText: (text: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}) => (
  // REDUCED PADDING: p-3
  <footer className="p-3 border-t bg-white dark:bg-gray-900">
    <form onSubmit={handleSendMessage} className="flex items-end gap-2">
      <TextareaAutosize
        value={newMessageText}
        onChange={(e) => setNewMessageText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        autoComplete="off"
        minRows={1}
        maxRows={5}
        // TWEAKED PADDING: py-2 px-3 for better text alignment
        className="flex-1 resize-none bg-gray-100 border-transparent rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!newMessageText.trim()}
        aria-label="Send message"
        // SMALLER BUTTON: w-9 h-9 to match avatar size
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 rounded-full flex-shrink-0 w-9 h-9"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  </footer>
);

// --- Main Chat Page Component (Logic remains unchanged) ---

export default function MessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceRequestId = params.serviceRequestId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const socket = useSocket();
  const session = useSelector(selectCurrentUser);
  const userId = session?.id;
  const userName = session?.name;

  const { data: requestData, isLoading: isLoadingRequest } =
    useGetServiceRequestByIdQuery(serviceRequestId);
  const { data: initialMessages = [], isLoading: isLoadingMessages } =
    useGetMessagesByRequestIdQuery(serviceRequestId);

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (!socket || !userId) return;

    socket.emit("joinRoom", serviceRequestId);

    const handleReceiveMessage = (receivedMessage: any) => {
      if (receivedMessage.sender_id !== userId) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, serviceRequestId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessageText.trim() && userId && userName && socket?.connected) {
      const optimisticMessage: any = {
        id: uuidv4(),
        text: newMessageText,
        sender_id: userId,
        sender: { id: userId, name: userName },
        created_at: new Date().toISOString(),
        conversation_id: "",
        conversation: { service_request_id: serviceRequestId },
      };

      setMessages((prevMessages) => [...prevMessages, optimisticMessage]);

      socket.emit("sendMessage", {
        serviceRequestId,
        senderId: userId,
        text: newMessageText,
      });

      setNewMessageText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  if (isLoadingRequest || isLoadingMessages) {
    return <ChatPageSkeleton />;
  }

  const projectTitle = requestData.data?.service?.title || "Conversation";

  return (
    <Suspense fallback={<ChatPageSkeleton />}>
      <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-white dark:bg-gray-950">
        <ChatHeader
          projectTitle={projectTitle}
          onBack={() => router.push("/dashboard/messages")}
        />
        <MessageList
          messages={messages}
          userId={userId}
          messagesEndRef={messagesEndRef}
        />
        <MessageInput
          newMessageText={newMessageText}
          setNewMessageText={setNewMessageText}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </Suspense>
  );
}
