/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// --- Constants ---
// Using constants for localStorage keys prevents typos.
const FORM_DATA_KEY = "service_request_form_data";
const SELECTED_PLAN_KEY = "service_request_selected_plan";

// --- Type Definitions ---
interface RequestContextType {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  selectedPlan: any;
  setSelectedPlan: (plan: any) => void;
  resetRequest: () => void;
}

// Create the context
const ServiceRequestContext = createContext<RequestContextType | undefined>(
  undefined
);

// --- The Updated Provider Component ---
export const ServiceRequestProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // The state is now initialized from localStorage on the client side.
  // This uses a function to ensure localStorage is only accessed in the browser.
  const [formData, setFormDataState] = useState<Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(FORM_DATA_KEY);
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  });

  const [selectedPlan, setSelectedPlanState] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const savedPlan = localStorage.getItem(SELECTED_PLAN_KEY);
      return savedPlan ? JSON.parse(savedPlan) : null;
    }
    return null;
  });

  // --- Wrapper Functions ---
  // These functions update both the React state AND localStorage.

  const setFormData = (data: Record<string, any>) => {
    setFormDataState(data);
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
  };

  const setSelectedPlan = (plan: any) => {
    setSelectedPlanState(plan);
    localStorage.setItem(SELECTED_PLAN_KEY, JSON.stringify(plan));
  };

  // The reset function now also clears localStorage.
  const resetRequest = () => {
    setFormDataState({});
    setSelectedPlanState(null);
    localStorage.removeItem(FORM_DATA_KEY);
    localStorage.removeItem(SELECTED_PLAN_KEY);
  };

  const value = {
    formData,
    setFormData,
    selectedPlan,
    setSelectedPlan,
    resetRequest,
  };

  return (
    <ServiceRequestContext.Provider value={value}>
      {children}
    </ServiceRequestContext.Provider>
  );
};

// --- Custom Hook (Unchanged) ---
export const useServiceRequest = () => {
  const context = useContext(ServiceRequestContext);
  if (context === undefined) {
    throw new Error(
      "useServiceRequest must be used within a ServiceRequestProvider"
    );
  }
  return context;
};
