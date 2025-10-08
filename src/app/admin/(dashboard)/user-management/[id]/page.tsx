import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function UserDetailsPage() {
  const userInfo = {
    userName: "Babalola Jide",
    userEmail: "babalolajide@123.com",
    phoneNumber: "+234 909 000 8888",
    address: "6 Adekotopo Road, Wuse, Abuja",
    nameOfOrganisation: "Jide Consultancy",
    website: "Jide Consultancy",
    socialMediaHandles: "Jide Consultancy",
    contactPerson: "Jide Consultancy",
    aboutTheCompany: "Jide Consultancy",
    sector: "Jide Consultancy",
    productInformation: "Jide Consultancy",
    targetAudience: "Jide Consultancy",
    targetLocation: "Jide Consultancy",
    selectedPlan: "Jide Consultancy",
  };

  const uploadedDocuments = [
    { name: "National ID", filename: "Filename.pdf" },
    { name: "Drivers License", filename: "Filename.pdf" },
    { name: "Certificate of Incorporation", filename: "Filename.pdf" },
    { name: "Memorandum of Association", filename: "Filename.pdf" },
    { name: "Proof of Business", filename: "Filename.pdf" },
  ];

  const files = [
    { name: "Milestone 1 - 20/05/25", filename: "Filename.pdf" },
    { name: "Milestone 2 - 20/6/25", filename: "Filename.pdf" },
    { name: "Milestone 3 - 12/06/25", filename: "No files yet", isEmpty: true },
  ];

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
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      User Name
                    </label>
                    <p className="text-gray-900 mt-1">{userInfo.userName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      User Email
                    </label>
                    <p className="text-gray-900 mt-1">{userInfo.userEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone Number
                    </label>
                    <p className="text-gray-900 mt-1">{userInfo.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <p className="text-gray-900 mt-1">{userInfo.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Name of Organisation
                    </label>
                    <p className="text-gray-900 mt-1">
                      {userInfo.nameOfOrganisation}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Website
                    </label>
                    <p className="text-gray-900 mt-1">{userInfo.website}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Social Media Handle(s)
                    </label>
                    <p className="text-gray-900 mt-1">
                      {userInfo.socialMediaHandles}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Contact Person
                    </label>
                    <p className="text-gray-900 mt-1">
                      {userInfo.contactPerson}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      About the Company
                    </label>
                    <p className="text-gray-900 mt-1">
                      {userInfo.aboutTheCompany}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Sector
                    </label>
                    <p className="text-gray-900 mt-1">{userInfo.sector}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Product Information
                    </label>
                    <p className="text-gray-900 mt-1">
                      {userInfo.productInformation}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Target Audience
                    </label>
                    <p className="text-gray-900 mt-1">
                      {userInfo.targetAudience}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Target Location
                    </label>
                    <p className="text-gray-900 mt-1">
                      {userInfo.targetLocation}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Selected Plan
                    </label>
                    <p className="text-gray-900 mt-1">
                      {userInfo.selectedPlan}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {uploadedDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-gray-600">{doc.name}</span>
                  <span className="text-purple-600 underline cursor-pointer">
                    {doc.filename}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-gray-600">{file.name}</span>
                  <span
                    className={
                      file.isEmpty
                        ? "text-gray-400"
                        : "text-purple-600 underline cursor-pointer"
                    }
                  >
                    {file.filename}
                  </span>
                </div>
              ))}
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="text-purple-600 border-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload a new file(s)
                </Button>
              </div>
            </CardContent>
          </Card>
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
