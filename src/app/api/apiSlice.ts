import { clearUserState, setAccessToken, setUser } from "@/features/auth/state/authSlice";
import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if ((result.error as FetchBaseQueryError)?.status === 401) {
    console.log("Token expired, attempting to refresh...");
    const refreshResult = (await baseQuery({ url: "/auth/refresh", method: "GET" }, api, extraOptions)) as any;

    if (refreshResult && refreshResult.data) {
      await api.dispatch(setAccessToken(refreshResult.data.accessToken));
      await api.dispatch(setUser(refreshResult.data.user));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearUserState());
      api.dispatch(apiSlice.util.resetApiState());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["User", "Note", "Auth"],
});

export const { middleware } = apiSlice;
