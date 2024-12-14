import { Route, Routes, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import RefreshTokenLayout from "./features/auth/layout/RefreshTokenLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import { useRefreshTokensQuery } from "./features/auth/state/authApiSlice";
import DashboardSidebarMenu from "./features/dashboard/layout/UserDashboardLayout";
import DashboardSettingsPage from "./features/dashboard/pages/DashboardSettingsPage";
import DashboardWelcomePage from "./features/dashboard/pages/DashboardWelcomePage";
import NoteCardPage from "./features/notes/pages/NoteCardPage";
import AddNotePage from "./features/notes/pages/NoteCreate";
import NoteEditPage from "./features/notes/pages/NoteEdit";
import NoteListPage from "./features/notes/pages/NoteListPage";
import UserCardPage from "./features/users/pages/UserCardPage";
import UserCreatePage from "./features/users/pages/UserCreatePage";
import UserEditPage from "./features/users/pages/UserEditPage";
import UserListPage from "./features/users/pages/UserListPage/index";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/home";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { selectCurrentUser } from "./features/auth/state/authSlice";
import ModalSpinner from "./components/modalSpinner";

function App() {
  const [jwtUsed, setJwtUsed] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const isReady = useSelector((state: RootState) => state.auth.isReady);
  // refresh tokens on app mount
  useEffect(() => {
    setJwtUsed(true);
  }, [jwtUsed]);

  const { isError } = useRefreshTokensQuery(undefined, { skip: jwtUsed });

  useEffect(() => {
    console.log(isError);
    if (isError) {
      navigate("/login", { replace: true });
      console.error("Erreur lors du refresh des tokens :", isError);
    }
  }, [isError]);

  if (!isReady && !isError) return <ModalSpinner isVisible={true} />;

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        {/* // User dashboard routes 
        
        // userDashboard Menu layout */}
        <Route element={<RefreshTokenLayout />}>
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
      </Route>
    </Routes>
  );
}

export default App;
