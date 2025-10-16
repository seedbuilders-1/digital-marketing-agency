"use client";

import { useMemo, useState, useEffect } from "react";

// --- Type Definitions ---
interface Plan {
  id: string;
  name: string;
  price: string;
  priceUnit: string;
  audience: string;
  features: string[];
}

export interface GroupedPlan {
  name: string;
  audience: string;
  features: string[];
  options: {
    id: string;
    price: string;
    priceUnit: string;
  }[];
}

/**
 * A custom hook to intelligently transform a flat array of service plans into groups.
 * It groups plans based on their shared set of features, which is the true
 * identifier of a "plan package".
 *
 * @param plans The raw array of plan objects from the API.
 * @returns An object containing the correctly grouped plans and tools to manage them.
 */
export const useGroupedPlans = (plans: Plan[]) => {
  const [selectedCycles, setSelectedCycles] = useState<Record<string, string>>(
    {}
  );

  const groupedPlans = useMemo(() => {
    if (!plans || plans.length === 0) return [];

    const groups: Record<string, GroupedPlan> = {};

    plans.forEach((plan) => {
      // --- THE DEFINITIVE FIX ---
      // 1. Create a unique, consistent key for each group by sorting and joining its features.
      //    This ensures that plans with the same features, even if the features are in a
      //    different order in the database, will end up in the same group.
      const featuresKey = [...plan.features].sort().join("|");

      // 2. If this is the first time we've seen this set of features, initialize the group.
      if (!groups[featuresKey]) {
        groups[featuresKey] = {
          // Use the name of the first plan found as the group's display name.
          // This is more intuitive than using the service title.
          name: plan.name.replace(/ - (Monthly|Quarterly|Yearly)/i, ""), // Clean up the name
          audience: plan.audience,
          features: plan.features,
          options: [],
        };
      }

      // 3. Add the current plan's payment option to the group.
      groups[featuresKey].options.push({
        id: plan.id,
        price: plan.price,
        priceUnit: plan.priceUnit,
      });
    });

    return Object.values(groups);
  }, [plans]);

  // Effect to set default selections (remains the same)
  useEffect(() => {
    if (groupedPlans.length > 0) {
      const defaultSelections: Record<string, string> = {};
      groupedPlans.forEach((group) => {
        if (group.options.length > 0 && !selectedCycles[group.name]) {
          defaultSelections[group.name] = group.options[0].id;
        }
      });
      if (Object.keys(defaultSelections).length > 0) {
        setSelectedCycles((prev) => ({ ...prev, ...defaultSelections }));
      }
    }
  }, [groupedPlans, selectedCycles]);

  const handleCycleChange = (groupName: string, optionId: string) => {
    setSelectedCycles((prev) => ({
      ...prev,
      [groupName]: optionId,
    }));
  };

  return {
    groupedPlans,
    selectedCycles,
    handleCycleChange,
  };
};
