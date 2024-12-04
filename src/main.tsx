import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/global.css";
import "./css/forms.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import ScrollToHash from "./components/utils/ScrollToHash.tsx";
import NotificationProvider from "./features/notifications/components/Notification.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotificationProvider />
        <ScrollToHash />
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
