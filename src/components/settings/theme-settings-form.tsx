"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function ThemeSettingsForm() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false);

  const themes = [
    {
      id: "light",
      name: "Light",
      description: "Clean and bright interface",
    },
    {
      id: "dark",
      name: "Dark",
      description: "Easy on the eyes in low light",
    },
    {
      id: "system",
      name: "System Default",
      description: "Follows your system preference",
    },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Theme preference saved!");
    } catch (error) {
      toast.error("Failed to save theme preference");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <RadioGroup
        value={selectedTheme}
        onValueChange={setSelectedTheme}
        className="space-y-4"
      >
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RadioGroupItem value={theme.id} id={theme.id} />
            <div className="flex-1">
              <Label
                htmlFor={theme.id}
                className="text-base font-medium text-gray-900 cursor-pointer"
              >
                {theme.name}
              </Label>
              <p className="text-sm text-gray-500 mt-1">{theme.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
