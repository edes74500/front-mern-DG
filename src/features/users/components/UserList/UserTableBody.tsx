import { Link } from "react-router-dom";
import { IUser } from "../../../../types/user";
import UserTableActionButtons from "./userTableActionButtons/UserTableActionButtons";

interface UserTableBodyProps {
  users: Record<string, IUser>;
  ids: string[];
}

function UserTableBody({ users, ids }: UserTableBodyProps) {
  // Initialisation des hooks pour les mutations
  if (!users || !ids) {
    return null;
  }
  return (
    <tbody>
      {ids.map((id) => {
        const user = users[id];
        return (
          <tr key={id} className="hover:bg-gray-100">
            {/* <td className="px-4 py-2 border-b">{id}</td> */}
            <td className="py-2 pl-10 text-blue-500 border-b">
              <Link to={`/dashboard/user/${id}`}>{user.username}</Link>
            </td>
            <td className="px-4 py-2 text-center border-b">{new Date(user.dateCreated).toLocaleDateString()}</td>
            <td className="px-4 py-2 text-center border-b">
              {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Jamais"}
            </td>
            <td className="px-4 py-2 text-center border-b">{user.roles.join(", ")}</td>
            <td className="w-10 px-4 py-2 text-center border-b">
              {user.active ? (
                <div className="flex items-center justify-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full me-2"></span> Oui
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full me-2"></span> Non
                </div>
              )}
            </td>
            {/* User acton button componant */}
            <td className="w-20 px-4 py-2 pl-20 border-b">
              <UserTableActionButtons user={user} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default UserTableBody;
