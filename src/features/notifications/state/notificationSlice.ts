import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// Interface pour une notification
interface Notification {
  id: string; // Identifiant unique
  message: string;
  type: "success" | "error" | "info";
}

// État initial des notifications
export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Ajouter une notification
    addNotification(state, action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>) {
      state.notifications.push({
        id: nanoid(), // Génération d’un ID unique
        ...action.payload,
      });
    },
    // Supprimer une notification
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
