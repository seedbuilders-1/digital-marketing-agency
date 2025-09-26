/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our context's state
interface RequestContextType {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  selectedPlan: any; // Assuming Plan type is defined elsewhere
  setSelectedPlan: (plan: any) => void;
  resetRequest: () => void;
}

// Create the context with a default value
const ServiceRequestContext = createContext<RequestContextType | undefined>(
  undefined
);

// Create the provider component
export const ServiceRequestProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const resetRequest = () => {
    setFormData({});
    setSelectedPlan(null);
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

// Create a custom hook for easy access to the context
export const useServiceRequest = () => {
  const context = useContext(ServiceRequestContext);
  if (context === undefined) {
    throw new Error(
      "useServiceRequest must be used within a ServiceRequestProvider"
    );
  }
  return context;
};
