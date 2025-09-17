import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);
