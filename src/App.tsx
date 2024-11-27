import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardSidebarMenu from "./features/dashboard/layout/UserDashboardLayout";
import DashboardSettingsPage from "./features/dashboard/pages/DashboardSettingsPage";
import DashboardWelcomePage from "./features/dashboard/pages/DashboardWelcomePage";
import AddUserPage from "./features/users/pages/AddUserPage";
import EditUserPage from "./features/users/pages/EditUserPage";
import UserCardPage from "./features/users/pages/UserCardPage";
import UserListPage from "./features/users/pages/UserListPage";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";

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
          <Route index element={<DashboardWelcomePage />} />
          <Route path="settings" element={<DashboardSettingsPage />} />
          <Route path="users">
            <Route path="list" element={<UserListPage />} />
            <Route path="add-user" element={<AddUserPage />} />
            <Route path="edit/:userId" element={<EditUserPage />} />
            <Route path=":userId" element={<UserCardPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
