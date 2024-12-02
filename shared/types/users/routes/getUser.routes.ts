import { z } from "zod";
import { userSchema } from "../user.schema";

// Schéma Zod pour valider les paramètres de la requête
export const getUsersQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  sortBy: z.string().optional(),
  search: z.string().optional(),
  roles: z.union([z.string(), z.array(z.string())]).optional(),
  active: z.union([z.string(), z.boolean()]).optional(),
});

// Schéma Zod pour la réponse contenant la liste des utilisateurs
export const getUsersResponseSchema = z.object({
  users: z.array(userSchema), // Liste des utilisateurs
  total: z.number(), // Nombre total d'utilisateurs
  totalPages: z.number(), // Nombre total de pages
  page: z.number(), // Page actuelle
  limit: z.number(), // Limite par page
});
