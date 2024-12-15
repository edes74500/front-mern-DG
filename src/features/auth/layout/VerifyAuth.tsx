import { selectCurrentUser, selectIsAppLoading } from "@/features/auth/state/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const VerifyAuth = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isAppLoading = useSelector(selectIsAppLoading);

  useEffect(() => {
    if (!currentUser && !isAppLoading) {
      navigate("/login");
    }
  }, [currentUser, navigate, isAppLoading]); // only re-run effect if currentUser changes)

  if (isAppLoading) {
    return <div>Loading...</div>;
  }

  return <>{currentUser && <Outlet />}</>;
};
export default VerifyAuth;
