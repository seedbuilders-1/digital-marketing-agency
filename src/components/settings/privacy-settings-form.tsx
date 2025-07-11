"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function PrivacySettingsForm() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: "ad-personalization",
      title: "Ad Personalization",
      description: "Use my data to personalize ads",
      enabled: true,
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      description: "Allow app usage data to improve features",
      enabled: true,
    },
    {
      id: "marketing-status",
      title: "Marketing Status",
      description:
        "Allow my data to be used for internal analysis to improve services",
      enabled: true,
    },
    {
      id: "activity-status",
      title: "Activity Status",
      description: "Show when I'm active on the dashboard (visible to admin)",
      enabled: true,
    },
  ]);

  const handleSettingChange = (id: string, enabled: boolean) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled } : setting
      )
    );
    toast.success("Privacy setting updated");
  };

  return (
    <div className="space-y-6">
      {settings.map((setting) => (
        <div
          key={setting.id}
          className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0"
        >
          <div className="flex-1 pr-4">
            <Label
              htmlFor={setting.id}
              className="text-base font-medium text-gray-900"
            >
              {setting.title}
            </Label>
            <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
          </div>
          <Switch
            id={setting.id}
            checked={setting.enabled}
            onCheckedChange={(enabled) =>
              handleSettingChange(setting.id, enabled)
            }
          />
        </div>
      ))}
    </div>
  );
}
