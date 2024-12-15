import { Route } from "react-router-dom";
import DashboardSidebarMenu from "../features/dashboard/layout/UserDashboardLayout";
import DashboardSettingsPage from "../features/dashboard/pages/DashboardSettingsPage";
import DashboardWelcomePage from "../features/dashboard/pages/DashboardWelcomePage";
import NoteCardPage from "../features/notes/pages/NoteCardPage";
import AddNotePage from "../features/notes/pages/NoteCreate";
import NoteEditPage from "../features/notes/pages/NoteEdit";
import NoteListPage from "../features/notes/pages/NoteListPage";
import UserCardPage from "../features/users/pages/UserCardPage";
import UserCreatePage from "../features/users/pages/UserCreatePage";
import UserEditPage from "../features/users/pages/UserEditPage";
import UserListPage from "../features/users/pages/UserListPage";

const DashboardRoutes = () => (
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
);

export default DashboardRoutes;
