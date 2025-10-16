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
 * A custom hook to transform a flat array of service plans into groups.
 * It correctly groups recurring plans (monthly, quarterly, yearly)
 * and treats one-off plans as individual groups.
 *
 * @param plans The raw array of plan objects from the API.
 * @param serviceTitle The title of the parent service.
 * @returns An object containing the grouped plans and tools to manage them.
 */
export const useGroupedPlans = (plans: Plan[], serviceTitle?: string) => {
  const [selectedCycles, setSelectedCycles] = useState<Record<string, string>>(
    {}
  );

  const groupedPlans = useMemo(() => {
    if (!plans || plans.length === 0) return [];

    const groups: Record<string, GroupedPlan> = {};

    // --- THIS IS THE KEY FIX ---
    // A special group for all recurring plans
    const recurringGroupName = serviceTitle || "Subscription";
    let recurringGroupInitialized = false;

    plans.forEach((plan) => {
      // Check if the plan is a recurring subscription
      if (plan.priceUnit.toLowerCase() !== "one-off") {
        // If this is the first recurring plan we've seen, initialize the group
        if (!recurringGroupInitialized) {
          groups[recurringGroupName] = {
            name: recurringGroupName,
            audience: plan.audience, // Use the audience & features from the first recurring plan
            features: plan.features,
            options: [],
          };
          recurringGroupInitialized = true;
        }

        // Add the recurring plan's details to the group's options
        groups[recurringGroupName].options.push({
          id: plan.id,
          price: plan.price,
          priceUnit: plan.priceUnit,
        });
      } else {
        // If it's a 'one-off' plan, treat it as its own unique group
        groups[plan.name] = {
          name: plan.name,
          audience: plan.audience,
          features: plan.features,
          options: [
            {
              id: plan.id,
              price: plan.price,
              priceUnit: plan.priceUnit,
            },
          ],
        };
      }
    });

    return Object.values(groups);
  }, [plans, serviceTitle]);

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
