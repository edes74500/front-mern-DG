import { IGetUsersBodyResponse } from "@edes74500/fixrepairshared";
import { Edit3, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../../components/utils/ConfirmModal";
import { notify } from "../../../notifications/utils/notifications";
import { useDeleteUserByIdMutation } from "../../state/usersApiSlice";

interface UserTableActionButtonsProps {
  user: IGetUsersBodyResponse["users"][number];
}

const UserTableActionButtons = ({ user }: UserTableActionButtonsProps) => {
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserByIdMutation();
  // const [updateUser] = useUpdateUserByIdMutation();
  const [isModalOpen, setModalOpen] = useState(false);

  // Navigation pour édition
  const navigateToEdit = () => {
    navigate(`/dashboard/users/edit/${user.id}`);
  };

  // Suppression de l'utilisateur
  const handleConfirmDelete = async () => {
    try {
      await deleteUser({ userId: user.id }).unwrap();
      notify(`Utilisateur ${user.username} supprimé avec succès.`, "success");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      notify("Erreur lors de la suppression de l'utilisateur.", "error");
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        {/* Activer / Désactiver */}
        {/* <button
          onClick={toggleActiveStatus}
          className="flex items-center px-2 py-1 text-xs font-medium text-gray-600 transition bg-gray-100 rounded hover:bg-gray-200 focus:ring focus:ring-blue-500 focus:outline-none"
        >
          {user.active ? (
            <>
              <XCircle className="w-5 h-5 mr-1 text-red-500" />
              Désactiver
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-1 text-green-500" />
              Activer
            </>
          )}
        </button> */}

        {/* Modifier */}
        <button
          onClick={navigateToEdit}
          className="flex items-center px-2 py-1 text-xs font-medium text-gray-600 transition bg-gray-100 rounded hover:bg-gray-200 focus:ring focus:ring-blue-500 focus:outline-none"
        >
          <Edit3 className="w-5 h-5 mr-1 text-orange-500" />
          Modifier
        </button>

        {/* Supprimer */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center px-2 py-1 text-xs font-medium text-gray-600 transition bg-gray-100 rounded hover:bg-gray-200 focus:ring focus:ring-blue-500 focus:outline-none"
        >
          <Trash className="w-5 h-5 mr-1 text-red-500" />
          Supprimer
        </button>
      </div>

      {/* Modale de confirmation */}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
        title="Confirmer la suppression"
        description={`Êtes-vous sûr de vouloir supprimer ${user.username} ? Cette action est irréversible.`}
      />
    </>
  );
};

export default UserTableActionButtons;
