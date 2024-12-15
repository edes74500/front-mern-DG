import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import ScrollToHash from "./components/utils/ScrollToHash.tsx";
import "./css/forms.css";
import "./css/global.css";
import NotificationProvider from "./features/notifications/components/Notification.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotificationProvider />
        <ScrollToHash />

        <Routes>
          {/* <Route element={<TokenRefresh />}> */}
          <Route path="*" element={<App />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
