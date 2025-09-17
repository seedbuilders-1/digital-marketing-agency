import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Country } from "@/lib/types/auth";

interface PhoneCodeSelectorProps {
  countries: Country[];
  value: string;
  onValueChange: (value: string) => void;
}

// React.memo prevents this component from re-rendering if its props are the same.
export const PhoneCodeSelector = memo(function PhoneCodeSelector({
  countries,
  value,
  onValueChange,
}: PhoneCodeSelectorProps) {
  console.log("Rendering Phone Code Selector"); // This will now only log when the country code changes.

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.phoneCode}>
            {country.flag} {country.phoneCode}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
