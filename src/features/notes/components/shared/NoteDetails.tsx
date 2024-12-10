import UserInfo from "@/components/UserInfo";
import { AlertCircle, Archive, ArrowRightCircle, SquarePen, User } from "lucide-react";

interface NoteBase {
  createdBy?: { username: string } | string | null | undefined;
  assignedTo?: { username: string } | string | null | undefined;
  status: "active" | "archived" | "completed" | "assigned";
  createdAt?: string | Date | undefined;
}

interface NoteDetailsProps<T extends NoteBase> {
  note: T;
}
const NoteDetails = <T extends NoteBase>({ note }: NoteDetailsProps<T>) => {
  const statusIcons = {
    active: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    archived: <Archive className="w-5 h-5 text-gray-500" />,
    completed: <ArrowRightCircle className="w-5 h-5 text-green-500" />,
    assigned: <ArrowRightCircle className="w-5 h-5 text-green-500" />,
  };

  const statusLabels = {
    active: "Non assignée",
    archived: "Archivée",
    completed: "Completee",
    assigned: "Assignée",
  };

  return (
    <div className="pt-2 mt-4 space-y-2 text-sm text-gray-600 border-t-2">
      {/* Créé par */}
      <UserInfo
        label="Créé par"
        icon={<User className="w-5 h-5 text-blue-500" />}
        username={typeof note.createdBy === "string" ? note.createdBy : note.createdBy?.username}
        isDeleted={!note.createdBy}
      />

      {/* Assigné à */}
      <UserInfo
        label="Assigné à"
        icon={<User className="w-5 h-5 text-purple-500" />}
        username={typeof note.assignedTo === "string" ? note.assignedTo : note.assignedTo?.username}
        isDeleted={!note.assignedTo}
      />

      {/* Statut */}
      <p className="flex items-center gap-2">
        {statusIcons[note.status]}
        <span className="font-medium">Statut :</span> {statusLabels[note.status]}
      </p>

      {/* Date de création */}
      <p className="flex items-center gap-2">
        <SquarePen className="w-5 h-5 text-gray-500" />
        <span className="font-medium">Créé le :</span>
        {note.createdAt
          ? new Date(note.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Non precise"}
      </p>
    </div>
  );
};

export default NoteDetails;
