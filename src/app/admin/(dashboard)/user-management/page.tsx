import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function UserManagementPage() {
  const users = [
    {
      id: "000001",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000002",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000003",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000004",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000005",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000006",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000007",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000008",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000009",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000010",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000011",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
    {
      id: "000012",
      companyName: "ABC Company",
      contactName: "John Doe",
      lastActivity: "12/06/25 - 10:03 pm",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">All Users</h1>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    User ID
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Company Name
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Contact Name
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Last Activity
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-4 px-6 text-gray-900">{user.id}</td>
                    <td className="py-4 px-6 text-gray-900">
                      {user.companyName}
                    </td>
                    <td className="py-4 px-6 text-gray-900">
                      {user.contactName}
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {user.lastActivity}
                    </td>
                    <td className="py-4 px-6">
                      <Link href={`/admin/user-management/${user.id}`}>
                        <Button
                          variant="link"
                          className="text-purple-600 hover:text-purple-700 p-0"
                        >
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1-12 of 150 entries</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-purple-600 text-white"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="text-gray-500">...</span>
          <Button variant="outline" size="sm">
            12
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
