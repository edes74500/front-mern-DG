import { IUser } from "../../../../types/user";
import UserTableBody from "./UserTableBody";
import UserTableHeader from "./UserTableHeader";

interface UserTableProps {
  data:
    | {
        entities: Record<string, IUser>;
        ids: string[];
      }
    | undefined;
  sortBy: keyof IUser;
  sort: "asc" | "desc";
  isLoading: boolean;
  onSort: (column: keyof IUser) => void;
}

function UserTable({ isLoading, data, sortBy, sort, onSort }: UserTableProps) {
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <UserTableHeader sortBy={sortBy} sort={sort} onSort={onSort} />
        {data && <UserTableBody users={data.entities} ids={data.ids} />}

        {/* <UserTableBody users={data.entities} ids={data.ids} /> */}
      </table>
      {isLoading && <div className="w-full font-bold text-center text-gray-400">Chargement en cours...</div>}
      {!data && !isLoading && (
        <div className="w-full font-bold text-center text-destructive">Aucun utilisateur trouvé</div>
      )}
    </div>
  );
}

export default UserTable;
