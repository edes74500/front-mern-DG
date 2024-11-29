import { AlertCircle, Archive, ArrowRightCircle, SquarePen, User, UserX } from "lucide-react";
import { INote } from "../../../../types/note";

interface NoteDetailsProps {
  note: INote;
}

const NoteDetails = ({ note }: NoteDetailsProps) => {
  return (
    <div className="pt-2 mt-4 space-y-2 text-sm text-gray-600 border-t-2">
      {/* Créé par */}
      <p className="flex items-center gap-2">
        <User className="w-5 h-5 text-blue-500" />
        <span className="font-medium">Créé par :</span>{" "}
        {note.createdBy && typeof note.createdBy !== "string"
          ? note.createdBy.username
          : note.createdBy || <span className="italic text-gray-400">Utilisateur supprimé</span>}
      </p>

      {/* Assigné à */}
      {note.assignedTo ? (
        <p className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-500" />
          <span className="font-medium">Assigné à :</span>{" "}
          {note.assignedTo && typeof note.assignedTo !== "string" ? (
            note.assignedTo.username
          ) : (
            <span className="italic text-gray-400">Utilisateur supprimé</span>
          )}
        </p>
      ) : (
        <p className="flex items-center gap-2 text-gray-400">
          <UserX className="w-5 h-5" />
          Non assignée
        </p>
      )}

      {/* Statut */}
      <p className="flex items-center gap-2">
        {note.status === "active" ? (
          <ArrowRightCircle className="w-5 h-5 text-green-500" />
        ) : note.status === "archived" ? (
          <Archive className="w-5 h-5 text-gray-500" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-500" />
        )}
        <span className="font-medium">Statut :</span>{" "}
        {note.status === "active" ? "Active" : note.status === "archived" ? "Archivée" : "Assignée"}
      </p>

      {/* Date de création */}
      <p className="flex items-center gap-2">
        <SquarePen className="w-5 h-5 text-gray-500" />
        <span className="font-medium">Créé le :</span>{" "}
        {new Date(note.createdAt).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};
export default NoteDetails;
