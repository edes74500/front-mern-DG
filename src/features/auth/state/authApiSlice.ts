import { apiSlice } from "@/app/api/apiSlice";
import { clearUserState, setAccessToken, setIsReady, setUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("starting onQueryStarted");
        try {
          console.log("Login arguments:", arg);
          const result = await queryFulfilled;
          console.log("Query fulfilled:", result);

          // Vérifiez la structure de la réponse
          const { user, accessToken } = result.data;

          // Dispatch des actions Redux
          dispatch(setUser(user));
          dispatch(setAccessToken(accessToken));
        } catch (error) {
          console.log("Error during queryFulfilled:", error);
        }
      },
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
    refreshTokens: builder.query<any, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log("Query fulfilled:", result);

          // Vérifiez la structure de la réponse
          const { user, accessToken } = result.data;

          // Dispatch des actions Redux
          dispatch(setUser(user));
          dispatch(setAccessToken(accessToken));
          dispatch(setIsReady(true));
        } catch (error) {
          dispatch(setIsReady(true));
          console.log("Error during queryFulfilled:", error);
        }
      },
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUserState());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshTokensQuery } = authApiSlice;
