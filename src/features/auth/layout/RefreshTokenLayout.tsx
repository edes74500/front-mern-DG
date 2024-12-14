import { selectCurrentUser } from "@/features/auth/state/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RefreshTokenLayout = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]); // only re-run effect if currentUser changes)

  return <>{currentUser && <Outlet />}</>;
};
export default RefreshTokenLayout;
