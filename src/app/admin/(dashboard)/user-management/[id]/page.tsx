/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/api/userApi";

export default function UserDetailsPage() {
  const params = useParams();
  const userId = params.id as string;

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserByIdQuery(userId);

  const user = userData?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading user details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load user details</h2>
        <p className="text-gray-600">Please try refreshing the page.</p>
        <Button onClick={() => refetch()} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold">User not found</h2>
        <p className="text-gray-600">
          The user you're looking for doesn't exist.
        </p>
        <Link href="/admin/user-management">
          <Button className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to User Management
          </Button>
        </Link>
      </div>
    );
  }

  // Extract organisation data if available
  const organisation = user.organisation;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/user-management">
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to User Management
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
      </div>

      <Tabs defaultValue="information" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger
            value="information"
            className="data-[state=active]:text-purple-600"
          >
            User Information
          </TabsTrigger>
          <TabsTrigger value="history">Request History</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      User Name
                    </label>
                    <p className="text-gray-900 mt-1">{user.name || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      User Email
                    </label>
                    <p className="text-gray-900 mt-1">{user.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone Number
                    </label>
                    <p className="text-gray-900 mt-1">{user.tel || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <p className="text-gray-900 mt-1">
                      {user.address || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Country
                    </label>
                    <p className="text-gray-900 mt-1">
                      {user.country || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      City
                    </label>
                    <p className="text-gray-900 mt-1">{user.city || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Category
                    </label>
                    <p className="text-gray-900 mt-1 capitalize">
                      {user.category || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <p className="text-gray-900 mt-1 capitalize">
                      {user.status || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Role
                    </label>
                    <p className="text-gray-900 mt-1 capitalize">
                      {user.role?.title || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Business Status
                    </label>
                    <p className="text-gray-900 mt-1">
                      {user.business_status !== null
                        ? user.business_status
                          ? "Owns a business"
                          : "Does not own a business"
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Registered with Business
                    </label>
                    <p className="text-gray-900 mt-1">
                      {user.registered_with_a_business !== null
                        ? user.registered_with_a_business
                          ? "Yes"
                          : "No"
                        : "N/A"}
                    </p>
                  </div>
                  {user.pfp_url && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Profile Picture
                      </label>
                      <div className="mt-2">
                        <img
                          src={user.pfp_url}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organisation Information - Only show if user has an organisation */}
          {organisation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Organisation Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Organisation Name
                      </label>
                      <p className="text-gray-900 mt-1">
                        {organisation.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <p className="text-gray-900 mt-1">
                        {organisation.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Address
                      </label>
                      <p className="text-gray-900 mt-1">
                        {organisation.address || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Country
                      </label>
                      <p className="text-gray-900 mt-1">
                        {organisation.country || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        RC Number
                      </label>
                      <p className="text-gray-900 mt-1">
                        {organisation.rc_number || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Industry
                      </label>
                      <p className="text-gray-900 mt-1">
                        {organisation.industry || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Type
                      </label>
                      <p className="text-gray-900 mt-1">
                        {organisation.type || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Staff Size
                      </label>
                      <p className="text-gray-900 mt-1">
                        {organisation.staff_size || "N/A"}
                      </p>
                    </div>
                    {organisation.logo_url && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Logo
                        </label>
                        <div className="mt-2">
                          <img
                            src={organisation.logo_url}
                            alt="Organisation Logo"
                            className="w-24 h-24 object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Uploaded Documents - Show ID documents if available */}
          {user.id_url &&
            Array.isArray(user.id_url) &&
            user.id_url.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Uploaded ID Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.id_url.map((url: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-gray-600">
                        ID Document {index + 1}
                      </span>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 underline cursor-pointer hover:text-purple-700"
                      >
                        View Document
                      </a>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

          {/* Organisation Documents - Show if organisation exists */}
          {organisation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Organisation Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">
                    Certificate of Incorporation
                  </span>
                  <a
                    href={organisation.cert_of_inc_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline cursor-pointer hover:text-purple-700"
                  >
                    View Document
                  </a>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">
                    Memorandum of Association
                  </span>
                  <a
                    href={organisation.mem_of_assoc_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline cursor-pointer hover:text-purple-700"
                  >
                    View Document
                  </a>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">
                    Proof of Business Address
                  </span>
                  <a
                    href={organisation.proof_of_address_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline cursor-pointer hover:text-purple-700"
                  >
                    View Document
                  </a>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Company Status Report</span>
                  <a
                    href={organisation.company_status_report_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline cursor-pointer hover:text-purple-700"
                  >
                    View Document
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 text-center">
                Request history will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 text-center">
                Activity logs will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
