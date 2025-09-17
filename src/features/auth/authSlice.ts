import { createSlice } from "@reduxjs/toolkit";

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
  user: User | null;
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

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
