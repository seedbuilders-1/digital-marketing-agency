/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import type { Country } from "@/lib/types/auth";
import type { ControllerRenderProps } from "react-hook-form";

interface CountrySelectorProps {
  countries: Country[];
  field: ControllerRenderProps<any, "country">; // Precise typing from RHF
}

export const CountrySelector = memo(function CountrySelector({
  countries,
  field,
}: CountrySelectorProps) {
  console.log("Rendering Country Selector"); // This will now only log when the country selection changes.

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select your country..." />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.name}>
            {country.flag} {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
