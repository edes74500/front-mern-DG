import { IUserGetReqQueryDTO } from "@edes74500/fixrepairshared";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetUsersQuery } from "../../state/usersApiSlice";
import { DataTable } from "./User-data-table";
import { columns } from "./User-data-table-columns";
import Pagination from "./User-data-table-pagination";
import UserTableSearch from "./User-table-search.tsx";
//TODO : faire le tableau
const UserListPage = () => {
  const [queryOptions, setQueryOptions] = useState<IUserGetReqQueryDTO>({
    page: 1,
    limit: 10,
    sort: "asc",
    sortBy: "username",
    search: undefined,
    roles: undefined,
  });
  // Fetch des données utilisateur avec RTK Query
  const { data } = useGetUsersQuery(queryOptions);
  const users = data?.users || [];

  const handleSortingChange = (sorting: SortingState) => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      setQueryOptions((prev: any) => ({
        ...prev,
        sortBy: `${id}`,
        sort: `${desc ? "desc" : "asc"}`,
      }));
    }
  };

  return (
    <div className="w-full p-5 mx-auto ">
      <UserTableSearch setQueryOptions={setQueryOptions} />
      <DataTable columns={columns} data={users} onSortingChange={handleSortingChange} />
      {data && <Pagination data={data} setQueryOptions={setQueryOptions} />}
    </div>
  );
};
export default UserListPage;
