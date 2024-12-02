import { useState, useEffect, useRef } from "react";
import UserTable from "../components/UserList/UserTable";
import Pagination from "../components/UserList/Pagination";
import { IUser } from "../../../types/user";
import { useGetUsersQuery } from "../state/usersApiSlice";
import { notify } from "../../notifications/utils/notifications";
import AddUserButton from "../components/UserList/AddUserButton";

function UserListPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<keyof IUser>("username");

  // Appel de la requête RTK Query
  const { data, isLoading, isError, isFetching } = useGetUsersQuery({ page, limit, sort, sortBy });

  // Référence pour suivre si une erreur a déjà été notifiée
  const hasNotifiedError = useRef(true);

  useEffect(() => {
    // Si une erreur est présente et n'a pas encore été notifiée
    if (!isFetching && isError && !hasNotifiedError.current) {
      notify("Erreur pendant la récupération des données", "error");
      hasNotifiedError.current = true; // Marque l'erreur comme notifiée
    }

    // Réinitialise la notification si tout est normal
    if (!isError) {
      hasNotifiedError.current = false; // Prêt pour une nouvelle erreur
    }
  }, [isError, isFetching]);

  // Calcul des données liées à la pagination
  const totalPages = data?.totalPages || 1;
  const totalUsers = data?.total || 0;
  const users = data?.users || [];

  // Rendu

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Liste des utilisateurs</h1>
      <div className="p-4">
        <AddUserButton />
      </div>
      <UserTable
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        users={users}
        sortBy={sortBy}
        sort={sort}
        onSort={(column) => {
          setSortBy(column);
          setSort((prev) => (prev === "asc" ? "desc" : "asc"));
        }}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        totalUsers={totalUsers}
      />
    </div>
  );
}

export default UserListPage;
