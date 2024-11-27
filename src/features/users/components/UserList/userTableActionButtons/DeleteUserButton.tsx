import { Trash2 } from "lucide-react";
import { useDeleteUserByIdMutation } from "../../../usersApiSlice";
import { IUser } from "../../../../../types/user";

interface DeleteUserButtonProps {
  user: IUser;
}

const DeleteUserButton = ({ user }: DeleteUserButtonProps) => {
  const [deleteUser] = useDeleteUserByIdMutation();

  const onClickDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await deleteUser({ id }).unwrap(); // Appel de la mutation avec l'ID
        alert("Utilisateur supprimé avec succès.");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  return (
    <div className="flex justify-end gap-x-2 ">
      <div className="relative group">
        <button
          onClick={() => onClickDelete(user.id)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <Trash2 className="text-destructive" size={18} /> {/* Couleur rouge et taille 24px */}
        </button>

        {/* Tooltip */}
        <span className="absolute z-20 invisible px-2 py-1 mb-2 text-sm text-white transition-opacity transform -translate-x-1/2 bg-gray-600 rounded opacity-0 bottom-full left-1/2 group-hover:visible group-hover:opacity-100">
          Supprimer l'utilisateur
        </span>
      </div>
    </div>
  );
};
export default DeleteUserButton;
