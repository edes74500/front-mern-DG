import { store } from "../../../app/store"; // Assure-toi que le store est exporté
import { addNotification } from "../state/notificationSlice";

let canNotify = true; // Variable pour contrôler le délai

export const notify = (message: string, type: "success" | "error" | "info") => {
  if (!canNotify) return; // Bloque la fonction si le délai n'est pas respecté

  canNotify = false; // Désactive temporairement
  setTimeout(() => {
    canNotify = true; // Réactive la fonction après 0,1 seconde
  }, 100); // 100ms = 0,1s

  store.dispatch(
    addNotification({
      message,
      type,
    }),
  );
};
