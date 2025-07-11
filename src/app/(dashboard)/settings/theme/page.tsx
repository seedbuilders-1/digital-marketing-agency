import { ThemeSettingsForm } from "@/components/settings/theme-settings-form";

export default function ThemeSettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Theme</h2>
      </div>
      <ThemeSettingsForm />
    </div>
  );
}
