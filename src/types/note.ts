export interface INote {
  id: string;
  _id: string; // Identifiant unique de MongoDB
  status: "active" | "archived" | "assigned"; // Statuts disponibles
  createdBy?: { username: string } | null; // Populé ou null si supprimé
  assignedTo?: { username: string } | null; // Optionnel, populé ou null
  title: string; // Titre de la note
  content: string; // Contenu de la note
  slug: string; // Slug généré à partir du titre
  ticket: number; // Numéro de ticket auto-incrémenté
  createdAt: Date; // Date de création
  updatedAt: Date; // Dernière date de mise à jour
}
