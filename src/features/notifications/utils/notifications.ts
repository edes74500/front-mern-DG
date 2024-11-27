import { store } from "../../../app/store"; // Assure-toi que le store est exporté
import { addNotification } from "../notificationSlice";

export const notify = (message: string, type: "success" | "error" | "info") => {
  store.dispatch(
    addNotification({
      message,
      type,
    }),
  );
};
