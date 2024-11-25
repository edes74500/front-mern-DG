import { useState } from "react";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import { IUser } from "../../../types/user";
import { useGetUsersQuery } from "../../../features/users/usersApiSlice";

function UserList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<keyof IUser>("username");

  const { data, isLoading, isError } = useGetUsersQuery({ page, limit, sort, sortBy });

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Une erreur s'est produite.</p>;

  const totalPages = data?.totalPages || 1;
  const totalUsers = data?.total || 0;

  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Liste des utilisateurs</h1>
      {data && (
        <UserTable
          data={data}
          sortBy={sortBy}
          sort={sort}
          onSort={(column) => {
            setSortBy(column);
            setSort((prev) => (prev === "asc" ? "desc" : "asc"));
          }}
        />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onNext={() => setPage((prev) => prev + 1)}
        onPrevious={() => setPage((prev) => prev - 1)}
        totalUsers={totalUsers}
      />
    </div>
  );
}

export default UserList;
