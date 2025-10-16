"use client";
import { useState } from "react"; // Import useState for menu toggle
import Link from "next/link";
import { Search, Bell, Menu, X } from "lucide-react"; // Import Menu and X icons
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Using shadcn/ui Dropdown
import { selectCurrentUser } from "@/features/auth/selectors";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

import DMALogo from "../../../public/dma_svg.svg";
import Image from "next/image";

const Logo = () => <Image src={DMALogo} alt="" width={60} />;

const DashboardHeader = () => {
  const user = useSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Define navigation links for reuse
  const navLinks = [
    {
      href: "/dashboard/dashboard",
      label: "Dashboard",
      // badge: "2",
    },
    {
      href: "/dashboard/services",
      label: "Services",
      // badge: "2",
    },
    {
      href: "/dashboard/messages",
      label: "Messages",
      badge: "2",
    },
    {
      href: "/dashboard/projects",
      label: "Projects",
    },
    {
      href: "/dashboard/payments",
      label: "Payments & Billings",
    },

    {
      href: "/dashboard/invoice",
      label: "Invoices",
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-[#7642FE] p-3 flex items-center justify-center">
                <Logo />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  {link.label}
                  {link.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 text-xs"
                    >
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search..."
                className="pl-10 w-40 md:w-64 bg-gray-50 border-gray-200 focus:bg-white rounded-full"
              />
            </div>

            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell size={20} className="text-gray-500" />
            </Button>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7642FE]">
                  <img
                    src={user?.id_url || "https://avatar.vercel.sh/user.png"} // Fallback avatar
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent> */}
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between text-gray-700 hover:text-gray-900 font-medium p-2 rounded-md hover:bg-gray-50"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 text-xs"
                    >
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
