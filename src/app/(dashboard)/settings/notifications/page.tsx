import { NotificationSettingsForm } from "@/components/settings/notifications-settings-form";

export default function NotificationSettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Notification Settings
        </h2>
      </div>
      <NotificationSettingsForm />
    </div>
  );
}
