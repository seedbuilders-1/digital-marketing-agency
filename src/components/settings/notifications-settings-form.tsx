"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function NotificationSettingsForm() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "activity-alerts",
      title: "Activity Alerts",
      description: "Be informed about activity, like login alerts",
      enabled: true,
    },
    {
      id: "messages",
      title: "Messages",
      description: "Stay informed about new messages",
      enabled: true,
    },
    {
      id: "project-updates",
      title: "Project Updates",
      description: "Receive notifications about project progress",
      enabled: true,
    },
    {
      id: "invoice-billing",
      title: "Invoice/Billing Alerts",
      description: "Get notified when new invoices are generated",
      enabled: false,
    },
  ]);

  const [deliverySettings, setDeliverySettings] = useState({
    email: true,
    inApp: true,
  });

  const handleSettingChange = (id: string, enabled: boolean) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled } : setting
      )
    );
    toast.success("Notification preference updated");
  };

  const handleDeliveryChange = (type: "email" | "inApp", enabled: boolean) => {
    setDeliverySettings((prev) => ({
      ...prev,
      [type]: enabled,
    }));
    toast.success("Delivery preference updated");
  };

  return (
    <div className="space-y-8">
      {/* Notification Types */}
      <div className="space-y-6">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex-1">
              <Label
                htmlFor={setting.id}
                className="text-base font-medium text-gray-900"
              >
                {setting.title}
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                {setting.description}
              </p>
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

      {/* Delivery Methods */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Receive notifications via:
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="email-delivery"
              className="text-base font-medium text-gray-900"
            >
              Email
            </Label>
            <Switch
              id="email-delivery"
              checked={deliverySettings.email}
              onCheckedChange={(enabled) =>
                handleDeliveryChange("email", enabled)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="inapp-delivery"
              className="text-base font-medium text-gray-900"
            >
              In-app
            </Label>
            <Switch
              id="inapp-delivery"
              checked={deliverySettings.inApp}
              onCheckedChange={(enabled) =>
                handleDeliveryChange("inApp", enabled)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
