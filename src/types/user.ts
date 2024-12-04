export const AllowedRoles = ["admin", "manager", "employee"] as const;

// Définir le type des rôles basé sur l'énumération
export type IRole = (typeof AllowedRoles)[number]; // Les valeurs autorisées : "Admin", "Manager", "Employee"

export type IApiUser = {
  _id: string; // ID MongoDB par exemple
  username: string;
  password: string; // Hash stocké côté serveur
  slug: string;
  roles: IRole[]; // Les rôles tels que renvoyés par l'API
  active: boolean;
  dateCreated: Date; // Date sous forme de chaîne
  lastLogin?: Date; // Optionnel, sous forme de chaîne
};

export type IUser = IApiUser & {
  id: string; // ID MongoDB par exemple
};

export type IApiUserWithPopulatedRoles = IApiUser & {
  roles: {
    name: string; // Nom du rôle
    permissions: string[]; // Permissions associées
  }[]; // Tableau de rôles peuplés
};

export type IUserWithPopulatedRoles = IUser & {
  roles: {
    name: string; // Nom du rôle
    permissions: string[]; // Permissions associées
  }[]; // Tableau de rôles peuplés
};

// TypeScript : Type pour User
// export type IUser = {
//   id: string; // Ajout du champ `id`
//   _id: string; // Ajoute _id si c'est la structure renvoyée par ton backend
//   username: string;
//   password: string;
//   slug: string;
//   roles: IRole[];
//   active: boolean;
//   dateCreated: Date;
//   lastLogin?: Date; // Optionnel
// };

// export type IUser = IDbUser & {
//   id: string; // Ajout du champ `id`
// };
