import { apiSlice } from "@/app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),
      transformErrorResponse: (error, meta) => {
        const headers = meta?.response?.headers;
        console.log("Headers:", headers); // Log des headers
        return {
          error,
          rateLimit: {
            limit: headers?.get("RateLimit-Limit"),
            remaining: headers?.get("RateLimit-Remaining"),
            reset: headers?.get("RateLimit-Reset"),
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
