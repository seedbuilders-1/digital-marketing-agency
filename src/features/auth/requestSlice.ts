import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the slice's state
interface Plan {
  // You can expand this from your shared types
  name: string;
  price: string;
  [key: string]: any; // Allow other properties
}

interface RequestState {
  formData: Record<string, any>;
  selectedPlan: Plan | null;
}

const initialState: RequestState = {
  formData: {},
  selectedPlan: null,
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    // Action to save the data from the multi-step form
    setFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = action.payload;
    },
    // Action to save the plan the user chooses
    setSelectedPlan: (state, action: PayloadAction<Plan>) => {
      state.selectedPlan = action.payload;
    },
    // Action to clear the state after the process is complete
    resetRequest: (state) => {
      state.formData = {};
      state.selectedPlan = null;
    },
  },
});

// Export the actions to be used in your components
export const { setFormData, setSelectedPlan, resetRequest } =
  requestSlice.actions;

// Export the reducer to be added to your main store
export default requestSlice.reducer;
