import { RootState } from "@/app/store";
import { IUserApi } from "@edes74500/fixrepairshared";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isReady: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setIsReady(state, action) {
      state.isReady = action.payload;
    },
    clearUserState(state) {
      state.user = null;
      state.accessToken = null;
      state.isReady = false;
    },
  },
});

export const { setUser, setAccessToken, clearUserState, setIsReady } = authSlice.actions;

export const selectCurrentUser = (state: RootState): IUserApi | null => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
