Oui, absolument ! Avec l'ID généré directement dans le slice, vous pouvez avoir plusieurs notifications en même temps.
Voici pourquoi :

Chaque notification est unique grâce à son ID :

L'ID garantit que chaque notification est indépendante dans la liste d'état notifications. Le slice gère une liste de
notifications :

Au lieu de remplacer une notification précédente, chaque nouvelle notification est ajoutée à la liste. React-Toastify
affiche les notifications individuellement :

React-Toastify est conçu pour afficher plusieurs notifications en parallèle si elles sont gérées comme des entrées
distinctes dans votre état. Exemple complet Avec l'ID généré dans le slice, le flux fonctionne comme suit :

1. Slice avec ID généré typescript Copy code import { createSlice, PayloadAction } from "@reduxjs/toolkit"; import {
   nanoid } from "nanoid";

interface Notification { id: string; // Identifiant unique message: string; type: "success" | "error" | "info"; }

interface NotificationState { notifications: Notification[]; }

const initialState: NotificationState = { notifications: [], };

const notificationSlice = createSlice({ name: "notification", initialState, reducers: { addNotification( state, action:
PayloadAction<{ message: string; type: "success" | "error" | "info" }> ) { state.notifications.push({ id: nanoid(), //
Génération d’un ID unique ...action.payload, }); }, removeNotification(state, action: PayloadAction<string>) {
state.notifications = state.notifications.filter( (notification) => notification.id !== action.payload ); }, }, });

export const { addNotification, removeNotification } = notificationSlice.actions; export default
notificationSlice.reducer; 2. NotificationProvider avec gestion de plusieurs notifications Le NotificationProvider
affiche chaque notification individuellement :

tsx Copy code import React, { useEffect } from "react"; import { useSelector, useDispatch } from "react-redux"; import {
RootState } from "./store"; import { removeNotification } from "./notificationSlice"; import { toast, ToastContainer }
from "react-toastify";

const NotificationProvider = () => { const dispatch = useDispatch(); const notifications = useSelector((state:
RootState) => state.notification.notifications);

useEffect(() => { notifications.forEach((notification) => { // Affiche la notification avec React-Toastify
toast[notification.type](notification.message, { onClose: () => dispatch(removeNotification(notification.id)), //
Supprime après fermeture }); }); }, [notifications, dispatch]);

return <ToastContainer />; };

export default NotificationProvider; 3. Exemple d'utilisation dans un composant Ajoutez plusieurs notifications sans
risque de conflit grâce à l'ID unique :

tsx Copy code import React from "react"; import { useDispatch } from "react-redux"; import { addNotification } from
"./notificationSlice";

const ExampleComponent = () => { const dispatch = useDispatch();

const handleSuccess = () => { dispatch( addNotification({ message: "Action réussie!", type: "success", }) ); };

const handleError = () => { dispatch( addNotification({ message: "Une erreur s'est produite.", type: "error", }) ); };

const handleInfo = () => { dispatch( addNotification({ message: "Voici une information importante.", type: "info", }) );
};

return ( <div> <button
        onClick={handleSuccess}
        className="px-4 py-2 text-white bg-green-600 rounded-md"
      > Succès </button> <button
        onClick={handleError}
        className="px-4 py-2 text-white bg-red-600 rounded-md"
      > Erreur </button> <button
        onClick={handleInfo}
        className="px-4 py-2 text-white bg-blue-600 rounded-md"
      > Info </button> </div> ); };

export default ExampleComponent; Comportement attendu Lorsque vous cliquez sur les boutons, chaque notification est
ajoutée avec un ID unique. React-Toastify affiche toutes les notifications en parallèle. Chaque notification est
automatiquement supprimée après sa fermeture, grâce à onClose. Bonus : Empiler ou limiter le nombre de notifications Si
vous voulez ajouter une limite (par exemple, 5 notifications max), vous pouvez ajuster le reducer :

typescript Copy code addNotification( state, action: PayloadAction<{ message: string; type: "success" | "error" | "info"
}> ) { if (state.notifications.length >= 5) { state.notifications.shift(); // Retirer la notification la plus ancienne }
state.notifications.push({ id: nanoid(), ...action.payload, }); } Avec cette configuration, vous pouvez afficher
plusieurs notifications de manière simultanée et les gérer efficacement ! 🎉
