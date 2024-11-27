import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { RootState } from "../../../app/store";
import { removeNotification } from "../state/notificationSlice";

const NotificationProvider = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  useEffect(() => {
    notifications.forEach((notification) => {
      // Affiche la notification
      toast[notification.type](notification.message);

      // Supprime immédiatement la notification après affichage
      dispatch(removeNotification(notification.id));
    });
  }, [notifications, dispatch]);

  return <ToastContainer />;
};

export default NotificationProvider;
