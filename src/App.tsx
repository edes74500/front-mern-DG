import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/public/HomePage";
import { Login } from "./pages/public/Login";
import UserDashboard from "./pages/private/UserDashboard";
import DashboardMenu from "./components/layout/dashboard/DashboardMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<DashboardMenu />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
