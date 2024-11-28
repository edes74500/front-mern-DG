import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.passionanim.fr",
    validateStatus: (response, result) => {
      return response.status >= 200 && response.status < 300 && !result.isError;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["User", "Note"],
});
