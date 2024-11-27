import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IUser } from "../../../../types/user";
import { useUpdateUserByIdMutation, useGetUserByIdQuery } from "../../usersApiSlice";
import { useParams } from "react-router-dom";

const EditUserForm = () => {
  const { userId } = useParams<{ userId: IUser["id"] }>();

  const { data: user, isLoading, isError } = useGetUserByIdQuery({ userId: userId || "" });

  const [updateUser] = useUpdateUserByIdMutation();

  // États locaux pour les champs du formulaire
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [active, setActive] = useState(false);
  const [password, setPassword] = useState("");

  // Synchronisation des données utilisateur lorsqu'elles sont disponibles
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRoles(user.roles);
      setActive(user.active);
    }
  }, [user]);

  if (!userId) {
    return <p className="text-red-500">ID utilisateur invalide.</p>;
  }

  if (isLoading) {
    return <p>Chargement des données...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Impossible de charger les données utilisateur.</p>;
  }

  if (!user) {
    return <p className="text-red-500">Aucun utilisateur trouvé.</p>;
  }

  const handleRoleChange = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role)); // Retirer le rôle si déjà sélectionné
    } else {
      setRoles([...roles, role]); // Ajouter le rôle si non sélectionné
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Le nom d'utilisateur est requis.");
      return;
    }
    try {
      await updateUser({
        id: user.id,
        username,
        roles,
        active,
        ...(password && { password }), // Inclure le mot de passe uniquement s'il est renseigné
      }).unwrap();
      toast.success("Utilisateur mis à jour avec succès.");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Une erreur inconnue est survenue. Veuillez réessayer.";
      toast.error(`Erreur : ${errorMessage}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={onSubmit} className="p-6 space-y-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">Modifier l'utilisateur</h2>

        {/* Nom d'utilisateur */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Nom d'utilisateur
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Rôles */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Rôles</label>
          <div className="mt-2 space-y-2">
            {["Admin", "Employee", "Manager"].map((role) => (
              <label key={role} className="flex items-center space-x-3">
                <input type="checkbox" checked={roles.includes(role)} onChange={() => handleRoleChange(role)} />
                <span className="text-sm text-gray-700">{role}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actif */}
        <div className="flex items-center gap-3">
          <input
            id="active"
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="active" className="text-sm text-gray-700">
            Actif
          </label>
        </div>

        {/* Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Nouveau mot de passe (laisser vide pour ne pas changer)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => toast.info("Modification annulée")}
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Annuler
          </button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
