import { Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import HomePage from "../pages/home";

const PublicRoutes = () => (
  <>
    <Route index element={<HomePage />} />
    <Route path="login" element={<LoginPage />} />
  </>
);

export default PublicRoutes;
