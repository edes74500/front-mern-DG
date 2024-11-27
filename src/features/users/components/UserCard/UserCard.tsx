import React from "react";
import { IUser } from "../../../../types/user";

interface UserCardProps {
  user: IUser;
  onEdit: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{user.username}</h3>
      <p className="text-sm">Rôles : {user.roles.join(", ")}</p>
      <p className="text-sm">
        Statut :{" "}
        <span className={user.active ? "text-green-600" : "text-red-600"}>{user.active ? "Actif" : "Inactif"}</span>
      </p>
      <div className="flex justify-end mt-4">
        <button onClick={onEdit} className="px-4 py-2 text-white bg-yellow-500 rounded">
          Modifier
        </button>
      </div>
    </div>
  );
};

export default UserCard;
