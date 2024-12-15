import { Route, Routes } from "react-router-dom";
import DashboardRoutes from "./DashboardRoutes";
import PublicRoutes from "./PublicRoutes";
import MainLayout from "@/layout/MainLayout";
import VerifyAuth from "@/features/auth/layout/VerifyAuth";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      {PublicRoutes()}
      <Route element={<VerifyAuth />}>{DashboardRoutes()}</Route>
    </Route>
  </Routes>
);

export default AppRoutes;
