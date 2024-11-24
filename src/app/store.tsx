import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"; // Votre slice RTK Query

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Gère tous les endpoints RTK Query
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.MODE === "development", // Active Redux DevTools en mode développement
});

// Typage du store (recommandé pour TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
