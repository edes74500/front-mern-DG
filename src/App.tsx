import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import EditUserPage from "./features/users/pages/EditUserPage";
import UserCardPage from "./features/users/pages/UserCardPage";
import UserSettings from "./features/users/pages/UserSettings";
import MainLayout from "./layout/MainLayout";
import DashboardSidebarMenu from "./features/dashboard/layout/UserDashboardLayout";
import HomePage from "./pages/HomePage";
import UserListPage from "./features/users/pages/UserListPage";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        {/* // User dashboard routes 
        
        // userDashboard Menu layout */}
        <Route path="dashboard" element={<DashboardSidebarMenu />}>
          <Route index element={<DashboardPage />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="user">
            <Route path="list" element={<UserListPage />} />
            <Route path="edit/:userId" element={<EditUserPage />} />
            <Route path=":userId" element={<UserCardPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
