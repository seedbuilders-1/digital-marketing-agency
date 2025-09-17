// import "server-only"; // Guarantees this code only runs on the server.
import { cache } from "react";
import type { Country } from "@/lib/types/auth";

// Define a type for the raw API response for better type safety.
type RawCountryAPI = {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  flag: string;
};

const API_URL = "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag";

// Use React's `cache` function to deduplicate requests within a single render pass.
// Next.js's `fetch` will handle the persistent data caching across requests.
export const getCountries = cache(async (): Promise<Country[]> => {
  try {
    // The `fetch` in Next.js is automatically extended with caching capabilities.
    // By default, this will cache the result "forever" until the next deployment.
    const response = await fetch(API_URL, {
      next: { revalidate: 3600 * 24 }, // Optional: revalidate data once a day
    });

    if (!response.ok) {
      // Throwing an error here will be caught by the nearest error.js boundary.
      throw new Error(`Failed to fetch countries: ${response.statusText}`);
    }

    const data: RawCountryAPI[] = await response.json();

    // Map and sort the data with improved type safety.
    const formattedCountries: Country[] = data
      .map((country) => ({
        name: country.name.common,
        code: country.cca2,
        // Robustly handle cases where `idd` or `suffixes` might be missing.
        phoneCode: country.idd?.root
          ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}`
          : "",
        flag: country.flag,
      }))
      .filter((country) => country.phoneCode) // Ensure we only have countries with a phone code.
      .sort((a, b) => a.name.localeCompare(b.name));

    return formattedCountries;
  } catch (error) {
    console.error("Country Fetching Error:", error);
    // Re-throwing the error allows for graceful error handling further up the tree.
    throw new Error("Could not fetch country data. Please try again later.");
  }
});
