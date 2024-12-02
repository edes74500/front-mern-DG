import { z } from "../../../setupZ";
import { RoleEnum } from "../user.schema";

export const createUserRequestSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username is too long")
      .openapi({ example: "johndoe" }),
    password: z.string().min(6, "Password must be at least 6 characters").openapi({ example: "securepassword123" }),
    roles: z
      .array(RoleEnum)
      .nonempty("Roles are required")
      .default(["Employee"])
      .openapi({
        example: ["Admin", "Employee"],
      }),
    active: z.boolean().default(true).openapi({ example: true }),
  })
  .openapi("CreateUserRequest"); // Ajout d'un nom pour le schéma

export const createUserResponseSchema = z
  .object({
    _id: z.string().openapi({ example: "648f4e1e1e4f89c89c4dcb31" }),
    username: z.string().openapi({ example: "johndoe" }),
    roles: z.array(RoleEnum).openapi({ example: ["Admin", "Employee"] }),
    active: z.boolean().openapi({ example: true }),
    lastLogin: z.string().nullable().optional().openapi({ example: "2024-12-01T15:30:00Z" }),
    createdAt: z.date().openapi({ example: "2024-01-01T12:00:00Z" }),
    updatedAt: z.date().openapi({ example: "2024-12-01T16:00:00Z" }),
  })
  .openapi("CreateUserResponse"); // Ajout d'un nom pour le schéma

export const createUserTransformedResponseSchema = createUserResponseSchema.extend({
  id: z.string().openapi({ example: "648f4e1e1e4f89c89c4dcb31" }),
});

export const CreateNewUserPath = {
  method: "post" as const,
  path: "/users",
  description: "Create a new user",
  summary: "Create user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createUserRequestSchema, // Utilisation du schéma
        },
      },
    },
  },
  responses: {
    200: {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: createUserResponseSchema, // Utilisation du schéma
        },
      },
    },
    400: {
      description: "Validation errors",
    },
  },
};
