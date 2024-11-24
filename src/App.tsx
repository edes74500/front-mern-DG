import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/public/HomePage";
import { Login } from "./pages/public/Login";
import UserDashboard from "./pages/private/userDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
