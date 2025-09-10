/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Search,
  Plus,
  Paperclip,
  Send,
  MessageCircle,
  Download,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "admin";
  content: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: string;
  };
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  status: "Pending" | "Ongoing" | "Completed";
  unread?: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/generic-person-avatar.png",
    lastMessage: "Project Details: Digital campaign for...",
    timestamp: "12:00",
    status: "Pending",
    messages: [
      {
        id: "1",
        sender: "admin",
        content: "You sent a new project request",
        timestamp: "12:00PM",
      },
      {
        id: "2",
        sender: "user",
        content:
          "Hi, I'd like support with a social media marketing campaign for the launch of our new skincare line, Glow Essence. We're targeting young adults (18-30) and want to build awareness and engagement primarily on Instagram and TikTok. The launch date is in four weeks, and we'd like help with content planning, ad setup, and influencer outreach. Please let me know what details you need to get started.",
        timestamp: "12:00PM",
      },
      {
        id: "3",
        sender: "admin",
        content:
          "Hi there! Thanks for your message. We're excited to support the launch of Glow Essence. Based on your service request, we'll start working on a campaign strategy tailored to your goals. If you have any recent product photos, promotional ideas, or timelines you'd like us to consider, feel free to share them here. We'll keep you updated every step of the way!",
        timestamp: "12:00PM",
      },
      {
        id: "4",
        sender: "user",
        content: "Name of document.pdf",
        timestamp: "12:24PM",
        attachment: {
          name: "Name of document.pdf",
          type: "pdf",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/jane-smith-avatar.png",
    lastMessage: "Project Details: Digital campaign for...",
    timestamp: "12:00",
    status: "Ongoing",
    unread: true,
    messages: [],
  },
  {
    id: "3",
    name: "John Doe",
    avatar: "/generic-person-avatar.png",
    lastMessage: "Project Details: Digital campaign for...",
    timestamp: "12:00",
    status: "Completed",
    messages: [],
  },
  {
    id: "4",
    name: "John Doe",
    avatar: "/generic-person-avatar.png",
    lastMessage: "Project Details: Digital campaign for...",
    timestamp: "Yesterday",
    status: "Completed",
    messages: [],
  },
  {
    id: "5",
    name: "Jane Smith",
    avatar: "/jane-smith-avatar.png",
    lastMessage: "Project Details: Digital campaign for...",
    timestamp: "Tuesday",
    status: "Ongoing",
    messages: [],
  },
  {
    id: "6",
    name: "Jane Smith",
    avatar: "/jane-smith-avatar.png",
    lastMessage: "Project Details: Digital campaign for...",
    timestamp: "Monday",
    status: "Ongoing",
    messages: [],
  },
  {
    id: "7",
    name: "Jane Smith",
    avatar: "/jane-smith-avatar.png",
    lastMessage: "Project Details: Digital campaign for...",
    timestamp: "Monday",
    status: "Ongoing",
    messages: [],
  },
  {
    id: "8",
    name: "Jane Smith",
    avatar: "/jane-smith-avatar.png",
    lastMessage: "Project Details: Digital campaign for...",
    timestamp: "12/06/2025",
    status: "Ongoing",
    messages: [],
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >("1");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const filters = ["All", "Un-read", "Pending", "Archive"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredConversations = mockConversations.filter((conv) => {
    if (activeFilter === "Un-read") return conv.unread;
    if (activeFilter === "Pending") return conv.status === "Pending";
    if (activeFilter === "Archive") return false; // No archived conversations in mock data
    return true;
  });

  const currentConversation = mockConversations.find(
    (conv) => conv.id === selectedConversation
  );

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50">
      {/* Conversations Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Conversations
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:text-purple-700"
              >
                New
              </Button>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={
                  activeFilter === filter
                    ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    : ""
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id
                  ? "bg-purple-50 border-l-4 border-l-purple-500"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={conversation.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">
                    {conversation.lastMessage}
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getStatusColor(conversation.status)}`}
                  >
                    {conversation.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={currentConversation.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {currentConversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {currentConversation.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Project Details: Digital campaign for...
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(currentConversation.status)}`}
                >
                  {currentConversation.status}
                </Badge>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  May 15, 2025
                </span>
              </div>

              {currentConversation.messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  {message.sender === "admin" && (
                    <div className="text-center">
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {message.content}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp}
                      </div>
                    </div>
                  )}

                  {message.sender === "user" && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage
                          src={currentConversation.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {currentConversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-purple-600">
                            Project Request
                          </span>
                        </div>
                        {message.attachment ? (
                          <Card className="p-3 bg-orange-50 border-orange-200 max-w-xs">
                            <div className="flex items-center gap-2">
                              <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                                PDF
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {message.attachment.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-auto p-1"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        ) : (
                          <div className="bg-gray-100 rounded-lg p-3 max-w-2xl">
                            <p className="text-sm text-gray-900">
                              {message.content}
                            </p>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Paperclip className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                You don't have any messages
              </h3>
              <p className="text-gray-600 mb-4">
                Click on 'New' to start a conversation
              </p>

              {/* Message Input for Empty State */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Input placeholder="Type your message" className="pr-20" />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="p-1">
                        <Paperclip className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
