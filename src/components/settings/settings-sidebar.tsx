"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Bell, Palette, Shield } from "lucide-react";

const settingsNavigation = [
  {
    name: "Account Settings",
    href: "/settings/account",
    icon: User,
    description: "Manage your profile and preferences",
  },
  {
    name: "Notification Settings",
    href: "/settings/notifications",
    icon: Bell,
    description: "Customize your notification preferences",
  },
  {
    name: "Theme",
    href: "/settings/theme",
    icon: Palette,
    description: "Choose your preferred theme",
  },
  {
    name: "Privacy Settings",
    href: "/settings/privacy",
    icon: Shield,
    description: "Manage your privacy settings",
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {settingsNavigation.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-start gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "bg-purple-100 text-purple-700 border border-purple-200"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {item.description}
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
