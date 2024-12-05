import { IUserBaseResponse } from "@edes74500/fixrepairshared";
import { Calendar, CheckCircle, Clock, Edit, User as UserIcon, XCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import RoleBadge from "../../../../components/RoleBadge";
import GenericButton from "../../../../components/ui/GenericButton";

interface UserCardProps {
  user: IUserBaseResponse;
  onEdit: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  const navigate = useNavigate();

  return (
    // <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg w-96">
    <>
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-4">
        <GenericButton onClick={() => navigate("/dashboard/users/list")} text="back" variant="back" />
      </div>
      <div className="max-w-sm p-6 space-y-6 bg-white border rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <UserIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{user.username}</h3>
        </div>

        {/* Roles */}
        <div className="mt-2">
          <h4 className="mb-1 text-sm font-semibold text-gray-700">Rôles :</h4>
          <RoleBadge roles={user.roles} />
        </div>

        {/* Statut */}
        <div className="flex items-center gap-2 mt-4">
          {user.active ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <p className={`text-sm ${user.active ? "text-green-600" : "text-red-600"}`}>
            {user.active ? "Actif" : "Inactif"}
          </p>
        </div>

        {/* Date Created */}
        <div className="flex items-center gap-2 mt-4 text-gray-600">
          <Calendar className="w-5 h-5 text-gray-500" />
          <p className="text-sm">
            Créé le :{" "}
            {new Date(user.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Last Login */}
        {user.lastLogin && (
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <Clock className="w-5 h-5 text-gray-500" />
            <p className="text-sm">
              Dernière connexion :{" "}
              {new Date(user.lastLogin).toLocaleString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}

        {/* Edit Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
