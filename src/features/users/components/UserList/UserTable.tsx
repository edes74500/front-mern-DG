import { IGetUsersBodyResponse, IGetUsersQueryRequest } from "@edes74500/fixrepairshared";
import { CheckCircle, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import RoleBadge from "../../../../components/RoleBadge";
import UserTableActionButtons from "./UserTableActionButtons";

interface UserTableProps {
  users: IGetUsersBodyResponse["users"];
  sortBy: IGetUsersQueryRequest["sortBy"];
  sort: IGetUsersQueryRequest["sort"];
  isLoading: boolean;
  isFetching: boolean;
  onSort: (column: IGetUsersQueryRequest["sortBy"]) => void;
  isError: boolean;
}

function UserTable({ isLoading, isFetching, users, sortBy, sort, isError, onSort }: UserTableProps) {
  const columns: Array<{ key: IGetUsersQueryRequest["sortBy"]; label: string }> = [
    { key: "username", label: "Nom d'utilisateur" },
    { key: "createdAt", label: "Date de création" },
    { key: "lastLogin", label: "Dernière connexion" },
    { key: "roles", label: "Rôles" },
    { key: "active", label: "Actif" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full bg-white border border-gray-300 rounded-lg table-auto">
        {/* En-tête du tableau */}
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-sm font-semibold text-gray-700 border-b cursor-pointer text-left`}
                onClick={() => onSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  {sortBy === column.key && (
                    <span className="ml-2 text-sm text-blue-500">
                      {sort === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className="px-4 py-3 text-sm font-semibold text-right text-gray-700 border-b">Actions</th>
          </tr>
        </thead>

        {/* Corps du tableau */}
        <tbody>
          {!isError &&
            users.length > 0 &&
            users.map((user, index) => {
              return (
                <tr key={user.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  {/* Colonne Username */}
                  <td className="py-3 pl-4 text-blue-600 border-b whitespace-nowrap">
                    <Link to={`/dashboard/users/${user.id}`} className="font-medium hover:underline">
                      {user.username}
                    </Link>
                  </td>

                  {/* Date Created */}
                  <td className="px-4 py-3 text-left border-b whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Last Login */}
                  <td className="px-4 py-3 text-left border-b whitespace-nowrap">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Jamais"}
                  </td>

                  {/* Rôles */}
                  <td className="flex flex-wrap gap-2 px-4 py-3 text-left border-b whitespace-nowrap min-w-max">
                    <RoleBadge roles={user.roles} />
                  </td>

                  {/* Active Status */}
                  <td className="px-4 py-3 text-left border-b whitespace-nowrap min-w-max">
                    {user.active ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle size={18} className="mr-1" />
                        <span>Oui</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle size={18} className="mr-1" />
                        <span>Non</span>
                      </div>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="px-4 py-3 text-right border-b whitespace-nowrap">
                    <UserTableActionButtons user={user} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Messages d'état */}
      {(isLoading || isFetching) && (
        <div className="w-full py-4 font-bold text-center text-gray-400">Chargement en cours...</div>
      )}
      {!users && !isLoading && !isFetching && (
        <div className="w-full py-4 font-bold text-center text-red-500">Aucun utilisateur trouvé</div>
      )}
    </div>
  );
}

export default UserTable;
