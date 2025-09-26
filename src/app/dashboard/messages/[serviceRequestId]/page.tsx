/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

import { useSocket } from "@/context/SocketProvider"; // The custom hook to get our global socket
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetMessagesByRequestIdQuery } from "@/api/conversationApi";
import { useGetServiceRequestByIdQuery } from "@/api/servicesApi";
import { Message } from "@/lib/types/messages";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/selectors";

const ChatPageSkeleton = () => (
  <div className="flex flex-col h-full animate-pulse">
    <div className="p-4 border-b h-16 bg-gray-200"></div>
    <div className="flex-1 p-6 space-y-4">
      <div className="h-12 w-3/5 bg-gray-200 rounded-lg"></div>
      <div className="h-12 w-1/2 bg-gray-200 rounded-lg ml-auto"></div>
      <div className="h-16 w-4/5 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="p-4 border-t h-20 bg-gray-200"></div>
  </div>
);

export default function MessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceRequestId = params.serviceRequestId as string;

  // --- STATE AND HOOKS ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const socket = useSocket(); // Get the single, persistent socket instance from our context.
  const session = useSelector(selectCurrentUser);
  const userId = session?.id;

  // --- DATA FETCHING ---
  const { data: requestData, isLoading: isLoadingRequest } =
    useGetServiceRequestByIdQuery(serviceRequestId);
  const { data: initialMessages = [], isLoading: isLoadingMessages } =
    useGetMessagesByRequestIdQuery(serviceRequestId);

  // --- SIDE EFFECTS ---

  // Effect to load the initial chat history from the API.
  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // Effect for managing this component's event listeners for the global socket.
  useEffect(() => {
    // Do nothing if the socket from the context isn't ready.
    if (!socket) return;

    // Join the private room for this specific chat.
    socket.emit("joinRoom", serviceRequestId);

    const handleReceiveMessage = (receivedMessage: any) => {
      // Ensure the message belongs to this conversation before adding it.
      if (
        receivedMessage.conversation?.service_request_id === serviceRequestId
      ) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    // Attach the event listener.
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup: When the user navigates away, remove THIS component's listener.
    // The socket itself stays connected.
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, serviceRequestId]); // Reruns only if the socket instance or the page (room) changes.

  // Effect to scroll to the bottom of the chat view.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- EVENT HANDLERS ---
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessageText.trim() && userId && socket?.connected) {
      socket.emit("sendMessage", {
        serviceRequestId,
        senderId: userId,
        text: newMessageText,
      });
      setNewMessageText("");
    }
  };

  // --- RENDER LOGIC ---
  if (isLoadingRequest || isLoadingMessages) {
    return <ChatPageSkeleton />;
  }

  const projectTitle = requestData?.service?.title || "Conversation";

  return (
    <Suspense fallback={<ChatPageSkeleton />}>
      <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-white">
        <header className="flex items-center gap-4 p-4 border-b z-10 bg-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/messages")}
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-medium text-gray-600">
              {projectTitle.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            {projectTitle}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg: any) => (
            <div
              key={msg.id}
              className={`flex items-end gap-3 max-w-xl ${
                msg.sender_id === userId
                  ? "ml-auto flex-row-reverse"
                  : "mr-auto"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.sender_id === userId
                    ? "bg-[#7642FE] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
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
          ))}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 border-t bg-white">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-4"
          >
            <Input
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="Type your message..."
              autoComplete="off"
              className="bg-gray-100 border-none focus-visible:ring-1 focus-visible:ring-purple-500"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!newMessageText.trim()}
              className="bg-[#7642FE] hover:bg-[#6c3aE6] disabled:bg-gray-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </footer>
      </div>
    </Suspense>
  );
}
