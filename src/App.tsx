import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/public/HomePage";
import { Login } from "./pages/public/Login";
import UserDashboardLayout from "./layout/UserDashboardLayout";
import UserSettings from "./pages/private/UserSettings";
import DashboardContent from "./pages/private/DashboardContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<UserDashboardLayout />}>
          <Route index element={<DashboardContent />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
