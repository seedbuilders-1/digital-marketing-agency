/* eslint-disable react/no-unescaped-entities */
"use client";

import type React from "react";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  X,
  Send,
  Paperclip,
  ImageIcon,
  Smile,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MESSAGES_DATA } from "@/lib/constants/messages";
import RecentActivities from "@/components/messages/recent-activities";

export default function MessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const messageId = params.messageId as string;
  const [showReminder, setShowReminder] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [activitiesOpen, setActivitiesOpen] = useState(false);

  const message = MESSAGES_DATA.find((m) => m.id === messageId);

  if (!message) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Message Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested message could not be found.
          </p>
          <Button onClick={() => router.push("/messages")}>
            Back to Messages
          </Button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
          <div className="flex gap-4 lg:gap-6">
            {/* Main Chat Area */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/messages")}
                  className="flex items-center gap-2 text-[#7642FE] hover:text-[#5f35cc] p-2 sm:px-4"
                >
                  <ArrowLeft size={20} />
                  <span className="hidden sm:inline">Back to inbox</span>
                  <span className="sm:hidden">Back</span>
                </Button>

                {/* Mobile Activities Toggle */}
                <Sheet open={activitiesOpen} onOpenChange={setActivitiesOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden bg-transparent"
                    >
                      <Menu size={20} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 p-6">
                    <RecentActivities />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Conversation Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-medium text-sm">
                      DM
                    </span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                    {message.title}
                  </h1>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <Trash2 size={18} className="sm:size[20]" />
                </Button>
              </div>

              {/* Reminder Alert */}
              {showReminder && (
                <Alert className="mb-4 sm:mb-6 border-blue-200 bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-blue-900 mb-1">
                          Reminder!
                        </div>
                        <AlertDescription className="text-blue-800 text-sm">
                          Please share all details relevant to your service
                          request so we can serve you better. This chat is
                          private and tied to your current request.
                        </AlertDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowReminder(false)}
                      className="text-blue-600 hover:text-blue-800 p-1 flex-shrink-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </Alert>
              )}

              {/* Chat Messages */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {/* Date Separator */}
                <div className="text-center">
                  <span className="text-sm text-gray-500 bg-white px-3">
                    May 16, 2024
                  </span>
                </div>

                {/* System Message */}
                <div className="text-center">
                  <div className="inline-block bg-gray-100 px-3 sm:px-4 py-2 rounded-full text-sm text-gray-600">
                    You sent a new project request
                  </div>
                  <div className="text-xs text-gray-400 mt-1">12:00PM</div>
                </div>

                {/* Project Request Card */}
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-[#7642FE] text-white text-xs">
                        Project Request
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                      Hi, I'd like support with a social media marketing
                      campaign for the launch of our new skincare line, Glow
                      Essence. We're targeting young adults (18-30) and want to
                      focus on brand awareness and engagement primarily on
                      Instagram and TikTok. The launch date is in four weeks,
                      and we'd like help with content planning, ad setup, and
                      influencer outreach. Please let me know what details you
                      need to get started.
                    </p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Target Date:</span> 29 July,
                      2025
                    </div>
                  </CardContent>
                </Card>

                {/* Response Message */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 text-xs font-medium">
                      DM
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-white border rounded-lg p-3 sm:p-4 shadow-sm">
                      <p className="text-gray-700 mb-3 text-sm sm:text-base">
                        Hi there! Thanks for your message. We're excited to
                        support the launch of Glow Essence. Based on your
                        service request, we'll start working on a campaign
                        strategy tailored to your goals.
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        If you have any recent product photos, promotional
                        ideas, or timelines you'd like us to consider, feel free
                        to share them here.
                      </p>
                      <p className="text-gray-700 mt-3 text-sm sm:text-base">
                        We'll keep you updated every step of the way!
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">12:10PM</div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t pt-4 sm:pt-6">
                <div className="flex items-end gap-2 sm:gap-3">
                  <div className="flex-1">
                    <div className="border rounded-lg p-3">
                      <Input
                        placeholder="Type your message"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
                      />
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button variant="ghost" size="sm" className="p-2">
                            <Send size={16} className="text-[#7642FE]" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hidden sm:inline-flex"
                          >
                            <Paperclip size={16} className="text-gray-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hidden sm:inline-flex"
                          >
                            <ImageIcon size={16} className="text-gray-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hidden sm:inline-flex"
                          >
                            <Smile size={16} className="text-gray-400" />
                          </Button>
                        </div>
                        <div className="w-12 sm:w-16 h-1 bg-gray-200 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Right Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <RecentActivities />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
