import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice";
import notificationReducer from "../features/notifications/state/notificationSlice"; // Votre slice RTK Query
import { apiSlice } from "./api/apiSlice"; // Votre slice RTK Query
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Gère tous les endpoints RTK Query
    auth: authReducer, // Gère le endpoint login RTK Query
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  // devTools: import.meta.env.MODE === "development", // Active Redux DevTools en mode développement
});
setupListeners(store.dispatch);
// Typage du store (recommandé pour TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
