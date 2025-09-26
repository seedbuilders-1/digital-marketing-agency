/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  tel: string;
  address: string | null;
  status: string;
  category: string;
  pfp_url: string | null;
  id_url: string | null;
  business_status: string | null;
  role_id: string;
}

interface AuthState {
  accessToken: string | null;
  user: any;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // For initial login, which returns everything
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.accessToken = token;
      state.user = user;
    },

    updateUser: (state, action: PayloadAction<User>) => {
      // It's good practice to check if a user is logged in before trying to update.
      if (state.user) {
        // Replace the existing user object with the new one from the action payload.
        // We spread the existing user first to ensure any potential non-serializable
        // properties are handled, then overwrite with the new data.
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateUserOrganization: (state, action: PayloadAction<{ org: any }>) => {
      // If a user is logged in, directly set their 'organisation' property.
      // If state.user.organisation was null, it will now be the organization object.
      // If it already existed, it will be replaced (useful for an "edit" flow).
      if (state.user) {
        state.user.organisation = action.payload.org;
      }
    },

    updateOrganisationContact: (
      state,
      action: PayloadAction<{ contact: any }>
    ) => {
      // 1. Check if a user AND their organisation exist. You can't add a contact
      //    to an organization that doesn't exist in the state.
      if (state.user && state.user.organisation) {
        // 2. Ensure the 'contacts' array exists on the organisation object.
        //    If it's the first contact, it might be undefined or null.
        if (!state.user.organisation.contacts) {
          state.user.organisation.contacts = [];
        }

        // 3. Push the new contact object from the payload into the contacts array.
        //    (Corrected the typo from 'cotacts' to 'contacts')
        state.user.organisation.contacts.push(action.payload.contact);
      }
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const {
  setCredentials,
  logout,
  updateUserOrganization,
  updateOrganisationContact,
  updateUser,
} = authSlice.actions;
export default authSlice.reducer;
