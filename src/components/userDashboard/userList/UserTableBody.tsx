import { IUser } from "../../../types/user";

interface UserTableBodyProps {
  users: Record<string, IUser>;
  ids: string[];
}

function UserTableBody({ users, ids }: UserTableBodyProps) {
  return (
    <tbody>
      {ids.map((id) => {
        const user = users[id];
        return (
          <tr key={id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border-b">{id}</td>
            <td className="px-4 py-2 border-b">{user.username}</td>
            <td className="px-4 py-2 border-b">{user.active ? "Oui" : "Non"}</td>
            <td className="px-4 py-2 border-b">{new Date(user.dateCreated).toLocaleDateString()}</td>
            <td className="px-4 py-2 border-b">
              {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Jamais"}
            </td>
            <td className="px-4 py-2 border-b">{user.roles.join(", ")}</td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default UserTableBody;
