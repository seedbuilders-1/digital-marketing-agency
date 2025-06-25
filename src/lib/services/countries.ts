/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Country } from "@/lib/types/auth";

export class CountriesService {
  private static readonly API_URL =
    "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag";

  static async fetchCountries(): Promise<Country[]> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const formattedCountries: Country[] = data
        .map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
          phoneCode: country.idd?.root
            ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}`
            : "",
          flag: country.flag,
        }))
        .filter((country: Country) => country.phoneCode)
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

      return formattedCountries;
    } catch (error) {
      console.error("Failed to fetch countries:", error);
      throw new Error("Failed to fetch countries");
    }
  }
}
