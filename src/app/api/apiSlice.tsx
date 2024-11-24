import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3500" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users", // L'URL de l'API pour récupérer les utilisateurs
      providesTags: ["User"], // Indique que ce endpoint est lié au tag "User"
    }),
  }),
  tagTypes: ["User", "Note"],
});
