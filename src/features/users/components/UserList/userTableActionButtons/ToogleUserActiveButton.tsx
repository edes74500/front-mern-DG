import { UserRoundCheck, UserRoundX } from "lucide-react";
import { useUpdateUserByIdMutation } from "../../../usersApiSlice";
import { IUser } from "../../../../../types/user";

interface ToogleUserActiveButtonProps {
  user: IUser;
}
const ToogleUserActiveButton = ({ user }: ToogleUserActiveButtonProps) => {
  const [updateUser] = useUpdateUserByIdMutation();

  const onClickToogleActiveStatus = async (user: IUser) => {
    if (window.confirm("Voulez-vous désactiver cet utilisateur ?")) {
      try {
        await updateUser({ id: user.id, active: !user.active }).unwrap();
        alert("Utilisateur désactivé avec succès.");
      } catch (error) {
        console.error("Erreur lors de la désactivation :", error);
        alert("Une erreur est survenue lors de la désactivation.");
      }
    }
  };

  return (
    <div className="relative group">
      {/* Bouton */}
      {!user.active && (
        <>
          <button onClick={() => onClickToogleActiveStatus(user)} className="border-none cursor-pointer bg-none">
            <UserRoundX className="text-orange-500" size={18} />
          </button>

          <span className="absolute z-20 invisible px-2 py-1 mb-2 text-sm text-white transition-opacity transform -translate-x-1/2 bg-gray-600 rounded opacity-0 bottom-full left-1/2 group-hover:visible group-hover:opacity-100">
            Activer l'utilisateur
          </span>
        </>
      )}
      {user.active && (
        <>
          <button onClick={() => onClickToogleActiveStatus(user)} className="border-none cursor-pointer bg-none">
            <UserRoundCheck className="text-green-500" size={18} />
          </button>

          <span className="absolute z-20 invisible px-2 py-1 mb-2 text-sm text-white transition-opacity transform -translate-x-1/2 bg-gray-600 rounded opacity-0 bottom-full left-1/2 group-hover:visible group-hover:opacity-100">
            Desactiver l'utilisateur
          </span>
        </>
      )}
    </div>
  );
};
export default ToogleUserActiveButton;
