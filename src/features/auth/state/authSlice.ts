import { RootState } from "@/app/store";
import { IUserApi } from "@edes74500/fixrepairshared";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isAppLoading: true,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setIsAppLoading(state, action) {
      state.isAppLoading = action.payload;
    },

    clearUserState(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, setAccessToken, clearUserState, setIsAppLoading } = authSlice.actions;

export const selectCurrentUser = (state: RootState): IUserApi | null => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectIsAppLoading = (state: RootState) => state.auth.isAppLoading;

export default authSlice.reducer;
