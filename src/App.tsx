import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/public/HomePage";
import { Login } from "./pages/public/Login";
import UserDashboard from "./pages/private/UserDashboard";
import DashboardContent from "./components/userDashboard/DashboardContent";
import UserSettings from "./components/userDashboard/UserSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<UserDashboard />}>
          <Route index element={<DashboardContent />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
