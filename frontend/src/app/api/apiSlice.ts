import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    validateStatus: (response: Response, result: any) => {
      return response.status >= 200 && response.status < 300 && !result.isError;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["User", "Note"],
});
