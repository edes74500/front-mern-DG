import { z } from "zod";

// Fonction pour valider un ID MongoDB
export const ObjectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

// Exemple de helper pour transformer une chaîne en date
export const DateFromString = z.string().transform((str) => new Date(str));
