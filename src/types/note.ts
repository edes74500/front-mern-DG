export interface INote {
  id: string;
  _id: string; // Identifiant unique de MongoDB
  status: "active" | "archived" | "assigned" | "completed"; // Statuts disponibles
  createdBy?: { username: string } | null | string | undefined; // Populé ou null si supprimé
  assignedTo?: { username: string } | null | string | undefined; // Optionnel, populé ou null
  title: string; // Titre de la note
  content: string; // Contenu de la note
  slug: string; // Slug généré à partir du titre
  ticket: number; // Numéro de ticket auto-incrémenté
  createdAt: Date; // Date de création
  updatedAt: Date; // Dernière date de mise à jour
}

export interface IApiNote {
  id: string;
  _id: string; // Identifiant unique de MongoDB
  status: "active" | "archived" | "assigned" | "completed"; // Statuts disponibles
  createdBy?: string | undefined; // Populé ou null si supprimé
  assignedTo?: string | undefined; // Optionnel, populé ou null
  title: string; // Titre de la note
  content: string; // Contenu de la note
  slug: string; // Slug généré à partir du titre
  ticket: number; // Numéro de ticket auto-incrémenté
  createdAt: Date; // Date de création
  updatedAt: Date; // Dernière date de mise à jour
}

export type IApiNoteWithPopulatedUser = IApiNote & {
  createdBy: {
    _id: string;
    username: string;
  } | null; // Remplacé par l'utilisateur créateur
  assignedTo: {
    _id: string;
    username: string;
  } | null; // Remplacé par l'utilisateur assigné ou null si non assigné
};

export type INoteWithPopulatedUser = IApiNoteWithPopulatedUser & {
  id: string;
};
