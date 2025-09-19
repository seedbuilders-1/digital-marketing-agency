"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Eye, Edit, MessageSquare } from "lucide-react";
import Link from "next/link";

const mockRequest = {
  id: "000001",
  name: "Digital Marketing Audit",
  startDate: "12/05/25",
  endDate: "12/06/25",
  payment: "₦ 4,000.00",
  status: "Pending",
  projectBrief:
    "Hi, I'd like support with a social media marketing campaign for the launch of our new skincare line, Glow Essence. We're targeting young adults (18-30) and want to build awareness and engagement primarily on Instagram and TikTok. The launch date is in four weeks, and we'd like help with content planning, ad setup, and influencer outreach. Please let me know what details you need to get started.",
  user: {
    name: "Babalola Jide",
    email: "babalolajide@123.com",
    phone: "+234 800 000 0000",
    address: "6 Adekotun Road, Wuse, Abuja",
    organization: "Jide Consultancy",
    website: "Jide Consultancy",
    socialMedia: "Jide Consultancy",
    contactPerson: "Jide Consultancy",
    aboutCompany: "Jide Consultancy",
    sector: "Jide Consultancy",
    productInfo: "Jide Consultancy",
    targetAudience: "Jide Consultancy",
    targetLocation: "Jide Consultancy",
    selectedPlan: "Jide Consultancy",
  },
};

const mockFiles = [
  {
    milestone: "Milestone 1 - 20/05/25",
    filename: "Filename.pdf",
    hasFile: true,
  },
  {
    milestone: "Milestone 2 - 25/05/25",
    filename: "Filename.pdf",
    hasFile: true,
  },
  {
    milestone: "Milestone 3 - 30/05/25",
    filename: "Filename.pdf",
    hasFile: true,
  },
  {
    milestone: "Milestone 4 - 12/06/25",
    filename: "No files yet",
    hasFile: false,
  },
];

const mockActivities = [
  {
    date: "12-05-2025",
    time: "10:31am",
    title: "Request Created",
    description: "User Babalola Jide submitted a request",
  },
  {
    date: "12-05-2025",
    time: "10:31am",
    title: "Request Created",
    description: "User Babalola Jide submitted a request",
  },
  {
    date: "12-05-2025",
    time: "10:31am",
    title: "Request Created",
    description: "User Babalola Jide submitted a request",
  },
];

export default function RequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("information");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/request-management">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to request management
            </Button>
          </Link>
        </div>
        <Button className="bg-gray-200 text-gray-600 hover:bg-gray-300">
          Update Request Status
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          {mockRequest.name}
        </h1>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="information">Request Information</TabsTrigger>
          <TabsTrigger value="history">Request history</TabsTrigger>
          <TabsTrigger value="activity" className="text-purple-600">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Project ID
                    </label>
                    <p className="text-sm text-gray-900">{mockRequest.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Project Name
                    </label>
                    <p className="text-sm text-gray-900">{mockRequest.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Start/End Date
                    </label>
                    <p className="text-sm text-gray-900">
                      {mockRequest.startDate} - {mockRequest.endDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Payment
                    </label>
                    <p className="text-sm text-gray-900">
                      {mockRequest.payment}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {mockRequest.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Project brief
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {mockRequest.projectBrief}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-purple-600 border-purple-600 bg-transparent"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open conversation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Details */}
            <Card>
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(mockRequest.user).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4">
                      <label className="text-sm font-medium text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <p className="text-sm text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="space-y-6">
            {/* Uploaded Files */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Uploaded Files</CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload a new file(s)
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          {file.milestone}
                        </span>
                        <span className="text-sm text-gray-900">
                          {file.filename}
                        </span>
                      </div>
                      {file.hasFile && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-600"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-600"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Change File
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milestone Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>Milestone tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-purple-600 -translate-y-1/2"></div>

                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-2">Start</span>
                  </div>

                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-2">
                      Milestone 1
                    </span>
                  </div>

                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-2">
                      Milestone 2
                    </span>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    className="text-purple-600 border-purple-600 bg-transparent"
                  >
                    Edit Milestone
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockActivities.map((activity, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="text-sm text-gray-500 w-20 flex-shrink-0">
                      {activity.date}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
