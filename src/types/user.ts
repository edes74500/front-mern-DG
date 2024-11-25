export const AllowedRoles = ["Admin", "Manager", "Employee"] as const;

// Définir le type des rôles basé sur l'énumération
export type IRole = (typeof AllowedRoles)[number]; // Les valeurs autorisées : "Admin", "Manager", "Employee"

// TypeScript : Type pour User
export type IUser = {
  id: string; // Ajout du champ `id`
  _id: string; // Ajoute _id si c'est la structure renvoyée par ton backend
  username: string;
  password: string;
  roles: IRole[]; // Tableau contenant des valeurs de type "Role"
  active: boolean;
  dateCreated: Date;
  lastLogin?: Date; // Optionnel
};

// export type IUser = IDbUser & {
//   id: string; // Ajout du champ `id`
// };
