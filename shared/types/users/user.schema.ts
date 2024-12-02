import { z } from "zod";

// Rôles autorisés
export const AllowedRoles = ["Admin", "Manager", "Employee"] as const;
export const RoleEnum = z.enum(AllowedRoles);

export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username is too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roles: z.array(RoleEnum).nonempty("At least one role is required").default(["Employee"]),
  active: z.boolean().default(true),
  lastLogin: z.date().optional(),
  createdAt: z.date().optional(), // Timestamps sont gérés ici
  updatedAt: z.date().optional(),
});
