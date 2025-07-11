import { AccountSettingsForm } from "@/components/settings/account-settings-form";

export default function AccountSettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Information
        </h2>
      </div>
      <AccountSettingsForm />
    </div>
  );
}
