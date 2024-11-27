import { IUser } from "../../../../types/user";

interface UserTableHeaderProps {
  sortBy: keyof IUser;
  sort: "asc" | "desc";
  onSort: (column: keyof IUser) => void;
}

function UserTableHeader({ sortBy, sort, onSort }: UserTableHeaderProps) {
  const columns: Array<{ key: keyof IUser; label: string }> = [
    // { key: "id", label: "ID" },
    { key: "username", label: "Nom d'utilisateur" },
    { key: "dateCreated", label: "Date de création" },
    { key: "lastLogin", label: "Dernière connexion" },
    { key: "roles", label: "Rôles" },
    { key: "active", label: "Actif" },
  ];

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className="px-4 py-2 text-sm font-semibold text-center text-gray-600 border-b cursor-pointer"
            onClick={() => onSort(column.key)}
          >
            {column.label}
            {sortBy === column.key && <span className="ml-1 text-sm">{sort === "asc" ? "▲" : "▼"}</span>}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default UserTableHeader;
