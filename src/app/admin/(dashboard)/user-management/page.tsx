/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { useGetAllUsersQuery, useDeleteUserMutation } from "@/api/userApi";

// API & State

// Helper to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function UserManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  // --- Data Fetching ---
  const {
    data: usersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllUsersQuery(undefined);

  // --- Delete Mutation ---
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const allUsers = usersData?.data || [];

  console.log("usersData", usersData);
  console.log("error", error);

  // --- Live Search Filtering ---
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return allUsers;
    return allUsers.filter(
      (user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allUsers, searchTerm]);

  // --- Delete Handlers ---
  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id).unwrap();
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      refetch(); // Refresh the user list
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      alert(error?.data?.message || "Failed to delete user. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        {/* You can replace this with a more detailed skeleton loader */}
        <p>Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load users</h2>
        <p className="text-gray-600">Please try refreshing the page.</p>
        <Button onClick={() => refetch()} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">All Users</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => refetch()}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user: any) => (
                    <TableRow
                      key={user.id}
                      className={user.deleted_at ? "bg-red-50 opacity-60" : ""}
                    >
                      <TableCell className="font-mono text-xs">
                        #{user.id.substring(0, 8)}...
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.name}
                        {user.deleted_at && (
                          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                            Soft Deleted
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-gray-600 capitalize">
                        {user.deleted_at ? (
                          <span className="text-red-600 font-medium">
                            Deleted
                          </span>
                        ) : (
                          user.status
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {formatDate(user.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="link"
                            className="text-purple-600 hover:text-purple-700 p-0"
                            onClick={() =>
                              router.push(`/admin/user-management/${user.id}`)
                            }
                          >
                            View Details
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteClick(user)}
                            disabled={!!user.deleted_at}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination (Note: This is static UI. Real pagination requires backend support) */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredUsers.length} of {allUsers.length} entries
        </p>
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
          <Button variant="outline" size="sm" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Delete User
              </h2>
            </div>

            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>

            {userToDelete && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500">User Details:</p>
                <p className="font-medium text-gray-900">{userToDelete.name}</p>
                <p className="text-sm text-gray-600">{userToDelete.email}</p>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete User"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
