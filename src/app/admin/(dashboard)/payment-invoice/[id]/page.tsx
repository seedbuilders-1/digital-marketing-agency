"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaymentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("User Information");

  const tabs = ["User Information", "Service Information", "Invoice"];

  const userInfo = {
    name: "Babalola Jide",
    email: "babalolajide@123.com",
    phone: "+234 800 000 0000",
    address: "6 Adekotubọ Road, Wuse, Abuja",
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
  };

  const serviceInfo = {
    serviceId: "000001",
    serviceName: "Digital Marketing Audit",
    startEndDate: "12/05/25 - 12/06/25",
    package: "Premium",
    payment: "₦ 4,000.00",
    status: "Pending",
    projectBrief:
      "Hi, I'd like support with a social media marketing campaign for the launch of our new skincare line, Glow Essence. We're targeting young adults (18-30) and want to build awareness and engagement primarily on Instagram and TikTok. The launch date is in four weeks, and we'd like help with content planning, ad setup, and influencer outreach. Please let me know what details you need to get started.",
  };

  const documents = [
    { name: "National ID", filename: "Filename.pdf" },
    { name: "Drivers License", filename: "Filename.pdf" },
    { name: "Certificate of Incorporation", filename: "Filename.pdf" },
    { name: "Memorandum of Association", filename: "Filename.pdf" },
    { name: "Proof of Business", filename: "Filename.pdf" },
  ];

  const milestoneFiles = [
    { milestone: "Milestone 1 - 20/05/25", filename: "Filename.pdf" },
    { milestone: "Milestone 2 - 2/06/25", filename: "Filename.pdf" },
    { milestone: "Milestone 3 - 12/06/25", status: "No files yet" },
  ];

  const renderUserInformation = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                User Name
              </label>
              <p className="text-gray-900">{userInfo.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                User Email
              </label>
              <p className="text-gray-900">{userInfo.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <p className="text-gray-900">{userInfo.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Address
              </label>
              <p className="text-gray-900">{userInfo.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Name of Organization
              </label>
              <p className="text-gray-900">{userInfo.organization}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Website
              </label>
              <p className="text-gray-900">{userInfo.website}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Social Media Handle(s)
              </label>
              <p className="text-gray-900">{userInfo.socialMedia}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Contact Person
              </label>
              <p className="text-gray-900">{userInfo.contactPerson}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                About the Company
              </label>
              <p className="text-gray-900">{userInfo.aboutCompany}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Sector
              </label>
              <p className="text-gray-900">{userInfo.sector}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Product Information
              </label>
              <p className="text-gray-900">{userInfo.productInfo}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Target Audience
              </label>
              <p className="text-gray-900">{userInfo.targetAudience}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Target Location
              </label>
              <p className="text-gray-900">{userInfo.targetLocation}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Selected Plan
              </label>
              <p className="text-gray-900">{userInfo.selectedPlan}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-sm font-medium text-gray-600">
                  {doc.name}
                </span>
                <span className="text-sm text-purple-600 underline cursor-pointer">
                  {doc.filename}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderServiceInformation = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Service Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Service ID
              </label>
              <p className="text-gray-900">{serviceInfo.serviceId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Service Name
              </label>
              <p className="text-gray-900">{serviceInfo.serviceName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Start/End Date
              </label>
              <p className="text-gray-900">{serviceInfo.startEndDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Package
              </label>
              <p className="text-gray-900">{serviceInfo.package}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Payment
              </label>
              <p className="text-gray-900">{serviceInfo.payment}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>
              <Badge className="bg-yellow-100 text-yellow-800">
                {serviceInfo.status}
              </Badge>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-600">
              Project Brief
            </label>
            <p className="text-gray-900 mt-2">{serviceInfo.projectBrief}</p>
            <Button
              variant="outline"
              className="mt-4 text-purple-600 border-purple-600 hover:bg-purple-50 bg-transparent"
            >
              Open conversation ↗
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Files</h3>
          <div className="space-y-3">
            {milestoneFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-sm font-medium text-gray-600">
                  {file.milestone}
                </span>
                {file.filename ? (
                  <span className="text-sm text-purple-600 underline cursor-pointer">
                    {file.filename}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">{file.status}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInvoice = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Invoice Preview</h3>
        <div className="flex gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Verify Payment
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </div>
      </div>

      {/* Invoice Preview */}
      <Card>
        <CardContent className="p-8">
          <div className="max-w-2xl mx-auto bg-white">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
              </div>
              <div className="bg-purple-600 text-white px-4 py-2 rounded">
                <span className="font-bold text-lg">DM</span>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex justify-between mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Billed to</h3>
                <p className="text-gray-600">ABC Company</p>
                <p className="text-gray-600">123 Highway Crescent</p>
                <p className="text-gray-600">LA, USA</p>
              </div>
              <div className="text-right">
                <p className="text-purple-600 font-semibold">
                  Digital Marketing Agency NG
                </p>
                <p className="text-gray-600">Business address</p>
                <p className="text-gray-600">Abuja, FCT,</p>
                <p className="text-gray-600">Nigeria</p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600">Invoice #</p>
                  <p className="text-gray-900">AB2324-01</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600">
                    Invoice date
                  </p>
                  <p className="text-gray-900">01 Aug, 2023</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600">Reference</p>
                  <p className="text-gray-900">INV-057</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Due date</p>
                  <p className="text-gray-900">15 Aug, 2023</p>
                </div>
              </div>
            </div>

            {/* Services Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">
                      Services
                    </th>
                    <th className="text-center py-2 text-sm font-medium text-gray-600">
                      Qty
                    </th>
                    <th className="text-right py-2 text-sm font-medium text-gray-600">
                      Rate
                    </th>
                    <th className="text-right py-2 text-sm font-medium text-gray-600">
                      Line total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 text-gray-900">
                      Digital Marketing Audit
                    </td>
                    <td className="py-3 text-center text-gray-900">1</td>
                    <td className="py-3 text-right text-gray-900">₦3,000.00</td>
                    <td className="py-3 text-right text-gray-900">₦3,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₦9,000.00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="text-gray-900">₦900.00</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-semibold">
                  <span className="text-purple-600">Total due</span>
                  <span className="text-purple-600">₦ 9,900.00</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
              Please pay within 15 days of receiving this invoice.
            </div>

            {/* Footer */}
            <div className="mt-8 bg-purple-50 p-4 rounded flex justify-between text-sm text-gray-600">
              <span>www.digitalmarketingagencyng.com</span>
              <span>+91 00000 00000</span>
              <span>hello@email.com</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/payment-invoice"
          className="flex items-center text-purple-600 hover:text-purple-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Payment & Invoice
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Payment Details
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "User Information" && renderUserInformation()}
        {activeTab === "Service Information" && renderServiceInformation()}
        {activeTab === "Invoice" && renderInvoice()}
      </div>
    </div>
  );
}
