import { PrivacySettingsForm } from "@/components/settings/privacy-settings-form";

export default function PrivacySettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
      </div>
      <PrivacySettingsForm />
    </div>
  );
}
