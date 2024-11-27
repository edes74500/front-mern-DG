import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { RootState } from "../../app/store";
import { IUser } from "../../types/user";

// Configuration de l'Entity Adapter
const usersAdapter = createEntityAdapter<IUser>({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      {
        entities: Record<string, IUser>;
        ids: string[];
        total: number;
        totalPages: number;
      },
      {
        page: number;
        limit: number;
        sort?: "asc" | "desc";
        sortBy?: string;
        search?: string;
        roles?: string[]; // Tableau de rôles
        active?: boolean; // Statut actif
      }
    >({
      query: ({ page, limit, sort = "desc", sortBy = "username", search = "", roles, active }) => {
        // Construire les paramètres de requête dynamiquement
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sort,
          sortBy,
        });

        if (search) params.append("search", search);
        if (roles && roles.length > 0) params.append("roles", roles.join(","));
        if (active !== undefined) params.append("active", String(active));

        return `/users?${params.toString()}`;
      },
      transformResponse: (response: { data: IUser[]; total: number; totalPages: number }) => {
        // Fusionner les nouvelles données avec l'état existant
        const usersState = usersAdapter.getInitialState();

        const loadedUsers = response.data.map((user) => ({
          ...user,
          id: user._id, // Ajouter le champ `id`
        }));

        // Ajouter les nouveaux utilisateurs sans écraser les précédents
        const updatedState = usersAdapter.upsertMany(usersState, loadedUsers);

        // Retourner l'état combiné avec les métadonnées
        return {
          ...updatedState,
          totalPages: response.totalPages,
          total: response.total,
        };
      },
      //   refetchOnFocus: true, // Force un refetch lorsque l'onglet du navigateur devient actif
      //   refetchOnReconnect: true, // Force un refetch lors de la reconnexion réseau
      providesTags: (result) =>
        result
          ? [{ type: "User", id: "LIST" }, ...result.ids.map((id) => ({ type: "User" as const, id }))]
          : [{ type: "User", id: "LIST" }],
      //   refetchOnInvalidate: true,
    }),

    getUserById: builder.query<IUser, { userId: string }>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return {
          ...response,
          id: response._id, // Ajout d'un champ `id` basé sur `_id`
        };
      },
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: result.id }, // Associe l'utilisateur par ID
              { type: "User", id: "LIST" }, // Invalide aussi la liste
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    // Ajout de l'endpoint createUser
    createUser: builder.mutation<IUser, { username: string; password: string; roles: string[] }>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),

      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUserById: builder.mutation<
      IUser,
      { id: string; username?: string; password?: string; roles?: string[]; active?: boolean }
    >({
      query: ({ id, username, password, roles, active }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { username, password, roles, active },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "User", id: "LIST" },
        { type: "User", id: id },
      ],
    }),

    deleteUserById: builder.mutation<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "User", id: "LIST" },
        { type: "User", id: id },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
} = usersApiSlice;

// Sélecteur pour les résultats bruts de l'API
export const selectUsersResult = (queryArg: {
  page: number;
  limit: number;
  sort?: "asc" | "desc";
  sortBy?: string;
  search?: string;
  roles?: string[];
  active?: boolean;
}) => usersApiSlice.endpoints.getUsers.select(queryArg);

// Créez un sélecteur pour accéder aux données de l'utilisateur transformées
const selectUsersData =
  (queryArg: {
    page: number;
    limit: number;
    sort?: "asc" | "desc";
    sortBy?: string;
    search?: string;
    roles?: string[];
    active?: boolean;
  }) =>
  (state: RootState) => {
    const usersResult = usersApiSlice.endpoints.getUsers.select(queryArg)(state); // Appeler avec l'état Redux
    return usersResult?.data ?? initialState; // Retourner les données ou l'état initial
  };

// Sélecteurs pour accéder aux utilisateurs via l'adapter
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: RootState) =>
  selectUsersData({ page: 1, limit: 10, sort: "asc", sortBy: "username" })(state),
);

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query<EntityState<IUser, string>, void>({
//       query: () => "/users",
//       transformResponse: (responseData: Omit<IUser, "id">[]): EntityState<IUser, string> => {
//         const loadedUsers = responseData.map((user) => ({
//           ...user,
//           id: user._id, // Ajouter le champ `id`
//         }));
//         return usersAdapter.setAll(initialState, loadedUsers);
//       },
//       providesTags: (result) => {
//         if (result?.ids) {
//           return [{ type: "User", id: "LIST" }, ...result.ids.map((id) => ({ type: "User" as const, id }))];
//         } else return [{ type: "User", id: "LIST" }];
//       },
//     }),
//   }),
// });
