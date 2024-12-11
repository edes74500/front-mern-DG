import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardSidebarMenu from "./features/dashboard/layout/UserDashboardLayout";
import DashboardSettingsPage from "./features/dashboard/pages/DashboardSettingsPage";
import DashboardWelcomePage from "./features/dashboard/pages/DashboardWelcomePage";
import NoteCardPage from "./features/notes/pages/NoteCardPage";
import AddNotePage from "./features/notes/pages/NoteCreate";
import NoteEditPage from "./features/notes/pages/NoteEdit";
import UserCardPage from "./features/users/pages/UserCardPage";
import UserEditPage from "./features/users/pages/UserEditPage";
import UserListPage from "./features/users/pages/UserListPage/index";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/home";
import NoteListPage from "./features/notes/pages/NoteListPage";
import UserCreatePage from "./features/users/pages/UserCreatePage";

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
          <Route path="notes">
            <Route path="list" element={<NoteListPage />} />
            <Route path="create-note" element={<AddNotePage />} />
            <Route path=":slug/:noteId" element={<NoteCardPage />} />
            <Route path="edit/:noteId" element={<NoteEditPage />} />
          </Route>
          <Route path="users">
            <Route path="list" element={<UserListPage />} />
            <Route path="create-user" element={<UserCreatePage />} />
            <Route path="edit/:userId" element={<UserEditPage />} />
            <Route path=":userId" element={<UserCardPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
