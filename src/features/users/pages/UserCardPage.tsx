import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../types/user";
import { useGetUserByIdQuery } from "../state/usersApiSlice";
import UserCard from "../components/UserCard/UserCard";

const UserCardPage = () => {
  const { userId } = useParams<{ userId: IUser["id"] }>(); // Typage des params
  const { data: user, isLoading, isError } = useGetUserByIdQuery({ userId: userId || "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Peut contenir d'autres effets spécifiques à la page
    // Par exemple, suivi analytique, mise à jour du titre de la page, etc.
  }, []);

  // Gestion des états de chargement et d'erreurs
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Chargement de l'utilisateur...</p>
      </div>
    );
  }

  if (isError || !userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-red-600">Erreur : utilisateur introuvable ou ID invalide.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Utilisateur introuvable.</p>
      </div>
    );
  }

  // Affichage de la carte utilisateur
  return (
    <div className="max-w-sm p-6 space-y-6 bg-white border rounded-lg shadow-md">
      <UserCard
        user={user}
        onEdit={() => navigate(`/dashboard/users/edit/${userId}`)} // Gère la navigation
      />
    </div>
  );
};

export default UserCardPage;
