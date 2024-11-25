import { IUser } from "../../../types/user";
import UserTableBody from "./UserTableBody";
import UserTableHeader from "./UserTableHeader";

interface UserTableProps {
  data: {
    entities: Record<string, IUser>;
    ids: string[];
  };
  sortBy: keyof IUser;
  sort: "asc" | "desc";
  onSort: (column: keyof IUser) => void;
}

function UserTable({ data, sortBy, sort, onSort }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <UserTableHeader sortBy={sortBy} sort={sort} onSort={onSort} />
        <UserTableBody users={data.entities} ids={data.ids} />
      </table>
    </div>
  );
}

export default UserTable;
