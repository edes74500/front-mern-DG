import {
  IUserCreateReqBodyDTO,
  IUserCreateResBodyDTO,
  IUserDeleteReqParamsDTO,
  IUserDeleteResDTO,
  IUserGetByIdParamsDTO,
  IUserGetByIdResBodyDTO,
  IUserGetReqQueryDTO,
  IUserGetResBodyDTO,
  IUserUniqueReqQueryTDO,
  IUserUniqueResBodyTDO,
  IUserUpdateReqBodyDTO,
  IUserUpdateReqParamDTO,
  IUserUpdateResBodyDTO,
} from "@edes74500/fixrepairshared";
import { apiSlice } from "../../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* get all users with query params
    getUsers: builder.query<IUserGetResBodyDTO, IUserGetReqQueryDTO>({
      query: ({ page = 1, limit = 15, sort = "desc", sortBy = "username", roles, active, search, username }) => ({
        url: `/users`,
        method: "GET",
        params: {
          page: String(page),
          limit: String(limit),
          sort,
          sortBy,
          ...(roles && { roles: roles.join(",") }),
          ...(active !== undefined && { active: String(active) }),
          ...(search && { search: String(search) }),
          ...(username && { username }),
        },
      }),
      providesTags: (result) =>
        result
          ? [{ type: "User", id: "LIST" }, ...result.users.map((user) => ({ type: "User" as const, id: user.id }))]
          : [{ type: "User", id: "LIST" }],
    }),
    //* get user by id
    getUserById: builder.query<IUserGetByIdResBodyDTO, IUserGetByIdParamsDTO>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: result.id },
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    //* Creation d'un nouvel utilisateur
    createUser: builder.mutation<IUserCreateResBodyDTO, IUserCreateReqBodyDTO>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),

      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    //* Mise à jour de l'utilisateur par son ID
    updateUserById: builder.mutation<IUserUpdateResBodyDTO, IUserUpdateReqBodyDTO & IUserUpdateReqParamDTO>({
      query: ({ userId, username, password, roles, active }) => {
        return {
          url: `/users/${userId}`,
          method: "PUT",
          body: { username, password, roles, active },
        };
      },
      invalidatesTags: (_, __, { userId }) => [
        { type: "User", id: "LIST" },
        { type: "User", id: userId },
      ],
    }),

    //* Suppression d'un utilisateur par son ID
    deleteUserById: builder.mutation<IUserDeleteResDTO, IUserDeleteReqParamsDTO>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { userId }) => [
        { type: "User", id: "LIST" },
        { type: "User", id: userId },
      ],
    }),

    //* Vérification d'unicité d'un utilisateur
    checkUniqueness: builder.query<IUserUniqueResBodyTDO, IUserUniqueReqQueryTDO>({
      query: ({ username, email }) => ({
        url: `/users/check-unique`,
        method: "GET",
        params: { username, email },
      }),
      keepUnusedDataFor: 10,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
  useCheckUniquenessQuery,
} = usersApiSlice;
