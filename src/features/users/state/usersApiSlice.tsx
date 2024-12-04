import {
  ICreateUserBodyRequest,
  ICreateUserBodyResponse,
  IDeleteUserQueryRequest,
  IGetUserByIdQueryRequest,
  IGetUsersBodyResponse,
  IGetUsersQueryRequest,
  IUpdateUserBodyRequest,
  IUpdateUserQueryRequest,
  IUserBaseResponse,
} from "@edes74500/fixrepairshared";
import { apiSlice } from "../../../app/api/apiSlice";
// import { IUser } from "../../../types/user";
// import { ICreateNewUserTransformedResponse } from "@shared/types/users/user.type";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IGetUsersBodyResponse, IGetUsersQueryRequest>({
      query: ({ page, limit, sort = "desc", sortBy = "username", roles, active, search }) => {
        // Construire les paramètres de requête dynamiquement
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sort,
          sortBy,
        });

        if (roles && roles.length > 0) params.append("roles", String(roles));
        if (active !== undefined) params.append("active", String(active));
        if (search) params.append("search", search);

        return `/users?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [{ type: "User", id: "LIST" }, ...result.users.map((user) => ({ type: "User" as const, id: user.id }))]
          : [{ type: "User", id: "LIST" }],
      //   refetchOnInvalidate: true,
    }),

    getUserById: builder.query<IUserBaseResponse, IGetUserByIdQueryRequest>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: result.id }, // Associe l'utilisateur par ID
              { type: "User", id: "LIST" }, // Invalide aussi la liste
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // Ajout de l'endpoint createUser
    createUser: builder.mutation<
      // { username: string; password: string; roles: string[]; active: boolean }
      ICreateUserBodyResponse,
      ICreateUserBodyRequest
    >({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),

      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // Mise à jour de l'utilisateur
    updateUserById: builder.mutation<
      IUserBaseResponse,
      IUpdateUserBodyRequest & IUpdateUserQueryRequest
      // { id: string; username?: string; password?: string; roles?: string[]; active?: boolean }
    >({
      query: ({ userId, username, password, roles, active }) => {
        return {
          url: `/users/${userId}`,
          method: "PATCH",
          body: { username, password, roles, active },
        };
      },
      invalidatesTags: (_, __, { userId }) => [
        { type: "User", id: "LIST" },
        { type: "User", id: userId },
      ],
    }),

    // Suppression d'un utilisateur
    deleteUserById: builder.mutation<IUserBaseResponse, IDeleteUserQueryRequest>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { userId }) => [
        { type: "User", id: "LIST" },
        { type: "User", id: userId },
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
// export const selectUsersResult = (queryArg: {
//   page: number;
//   limit: number;
//   sort?: "asc" | "desc";
//   sortBy?: string;
//   search?: string;
//   roles?: string[];
//   active?: boolean;
// }) => usersApiSlice.endpoints.getUsers.select(queryArg);

//  //endpoints pour fetch user by role with query parameters
//     getUsersByRole: builder.query<IUser[], { role: string[] }>({
//       query: ({ role }) => ({
//         url: `/users/roles?roles=${role.join(",")}`,
//         method: "GET",
//       }),
//       transformResponse: (response: IApiUser[]) => {
//         const loadedUsers: IUser[] = response.map((user) => ({
//           ...user,
//           id: user._id, // Ajouter le champ `id`
//         }));
//         return loadedUsers;
//       },
//       providesTags: (result) =>
//         result
//           ? [{ type: "User", id: "LIST" }, ...result.map((user) => ({ type: "User" as const, id: user._id }))]
//           : [{ type: "User", id: "LIST" }],
//     }),
