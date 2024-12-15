"use client";

import { useRefreshTokensQuery } from "@/features/auth/state/authApiSlice";
import { selectCurrentToken } from "@/features/auth/state/authSlice";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ModalSpinner from "./modalSpinner";

export default function TokenRefresh() {
  const tokenRefreshed = useRef(false);
  const token = useSelector(selectCurrentToken);
  const isAppStarting = true;

  const { isError, isLoading } = useRefreshTokensQuery(undefined, {
    skip: tokenRefreshed.current || !!token,
  });

  useEffect(() => {
    if (!isLoading) {
      tokenRefreshed.current = true;
    }
  }, [isError, isLoading]);

  if (!isAppStarting && !isError && isLoading) {
    return <ModalSpinner isVisible={true} />;
  }

  return <Outlet />;
}
