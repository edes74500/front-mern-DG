import { IUser } from "../../../../../types/user";
import DeleteUserButton from "./DeleteUserButton";
import EditUserButton from "./EditUserButton";
import ToogleUserActiveButton from "./ToogleUserActiveButton";

interface UserTableActionButtonsProps {
  user: IUser;
}

const UserTableActionButtons = ({ user }: UserTableActionButtonsProps) => {
  // Fonction pour supprimer un utilisateur

  // Fonction pour désactiver un utilisateur

  return (
    <div className="flex justify-end gap-x-2 ">
      <ToogleUserActiveButton user={user} />
      <EditUserButton user={user} />
      <DeleteUserButton user={user} />
    </div>
  );
};
export default UserTableActionButtons;
