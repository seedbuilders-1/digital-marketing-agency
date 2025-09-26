"use client";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard/dashboard"
              className="flex items-center gap-2"
            >
              <div className="bg-[#7642FE] rounded-lg p-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">DMA</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/dashboard/services"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Services
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 text-xs"
                >
                  2
                </Badge>
              </Link>
              <Link
                href="/dashboard/messages"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Messages
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 text-xs"
                >
                  2
                </Badge>
              </Link>

              <Link
                href="/dashboard/projects"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Projects
              </Link>

              <Link
                href="/dashboard/payments"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Payments & Billings
              </Link>
            </nav>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white rounded-full"
              />
            </div>

            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell size={20} />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
