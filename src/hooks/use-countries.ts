"use client";
import { useState, useEffect } from "react";
import type { Country } from "@/lib/types/auth";
import { CountriesService } from "@/lib/services/countries";

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedCountries = await CountriesService.fetchCountries();
        setCountries(fetchedCountries);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch countries"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  return { countries, loading, error };
}
