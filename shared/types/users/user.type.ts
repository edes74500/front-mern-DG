import { z } from "zod";
import { getUsersResponseSchema, getUsersQuerySchema } from "./routes/getUser.routes";
import { userSchema } from "./user.schema";
import {
  createUserRequestSchema,
  createUserResponseSchema,
  createUserTransformedResponseSchema,
} from "./routes/createNewUser.routes";

// Générer les types TypeScript à partir des schémas Zod
export type IUser = z.infer<typeof userSchema>;
export type IGetUsersResponse = z.infer<typeof getUsersResponseSchema>;
export type IGetUsersQuery = z.infer<typeof getUsersQuerySchema>;

//routes schemas

//getUsers
export type ICreateNewUserRequest = z.infer<typeof createUserRequestSchema>;
export type ICreateNewUserResponse = z.infer<typeof createUserResponseSchema>;
export type ICreateNewUserTransformedResponse = z.infer<typeof createUserTransformedResponseSchema>;
