import { apiSlice } from "@/app/api/apiSlice";
import { AuthLoginReqBodyDTO, AuthLoginResBodyDTO } from "@edes74500/fixrepairshared";
import { clearUserState, setAccessToken, setIsAppLoading, setUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthLoginResBodyDTO, AuthLoginReqBodyDTO>({
      query: ({ username, password, rememberMe }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password, rememberMe },
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

    logMe: builder.query<AuthLoginResBodyDTO, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log("Query fulfilled:", result);
          if (result.data) {
            // Vérifiez la structure de la réponse
            const { user, accessToken } = result.data;
            // Dispatch des actions Redux
            dispatch(setUser(user));
            dispatch(setAccessToken(accessToken));
            // dispatch(setIsAppStarting(true));
          }
          dispatch(setIsAppLoading(false));
        } catch (error) {
          dispatch(setIsAppLoading(false));
          dispatch(clearUserState());
          dispatch(apiSlice.util.resetApiState());
          console.log("Error during queryFulfilled:", error);
        }
      },
    }),

    refreshTokens: builder.query<AuthLoginResBodyDTO, void>({
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
        } catch (error) {
          dispatch(clearUserState());
          dispatch(apiSlice.util.resetApiState());
          console.log("Error during queryFulfilled:", error);
        }
      },
    }),

    sendLogout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await dispatch(clearUserState()); // Clear user state immédiatement
        await queryFulfilled;
        // Étape 1 : Update optimiste avant le fetch
        dispatch(apiSlice.util.resetApiState()); // Clear local API cache immédiatement
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshTokensQuery, useLogMeQuery } = authApiSlice;
