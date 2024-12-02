import { ICreateNewUserResponse } from "@shared/index";
import { apiSlice } from "../../../app/api/apiSlice";
import { IApiUser, IUser } from "../../../types/user";
// import { ICreateNewUserTransformedResponse } from "@shared/types/users/user.type";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      {
        users: IUser[];
        total: number;
        totalPages: number;
        limit: number;
        page: number;
      },
      {
        page?: number;
        limit?: number;
        sort?: "asc" | "desc";
        sortBy?: string;

        roles?: string[]; // Tableau de rôles
        active?: boolean; // Statut actif
      }
    >({
      query: ({ page, limit, sort = "desc", sortBy = "username", roles, active }) => {
        // Construire les paramètres de requête dynamiquement
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sort,
          sortBy,
        });

        if (roles && roles.length > 0) params.append("roles", roles.join(","));
        if (active !== undefined) params.append("active", String(active));

        return `/users?${params.toString()}`;
      },
      transformResponse: (response: {
        users: IApiUser[];
        total: number;
        totalPages: number;
        limit: number;
        page: number;
      }) => {
        // Fusionner les nouvelles données avec l'état existant

        const loadedUsers: IUser[] = response.users.map((user) => ({
          ...user,
          id: user._id, // Ajouter le champ `id`
        }));

        // Retourner l'état combiné avec les métadonnées
        return {
          users: loadedUsers,
          totalPages: response.totalPages,
          total: response.total,
          page: response.page,
          limit: response.limit,
        };
      },
      providesTags: (result) =>
        result
          ? [{ type: "User", id: "LIST" }, ...result.users.map((user) => ({ type: "User" as const, id: user.id }))]
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

    //endpoints pour fetch user by role with query parameters
    getUsersByRole: builder.query<IUser[], { role: string[] }>({
      query: ({ role }) => ({
        url: `/users/roles?roles=${role.join(",")}`,
        method: "GET",
      }),
      transformResponse: (response: IApiUser[]) => {
        const loadedUsers: IUser[] = response.map((user) => ({
          ...user,
          id: user._id, // Ajouter le champ `id`
        }));
        return loadedUsers;
      },
      providesTags: (result) =>
        result
          ? [{ type: "User", id: "LIST" }, ...result.map((user) => ({ type: "User" as const, id: user._id }))]
          : [{ type: "User", id: "LIST" }],
    }),

    // Ajout de l'endpoint createUser
    createUser: builder.mutation<
      ICreateNewUserResponse,
      { username: string; password: string; roles: string[]; active: boolean }
    >({
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
  useGetUsersByRoleQuery,
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
