import { User, FileText, AlertCircle, Archive, ArrowRightCircle, UserX } from "lucide-react";
import { INote } from "../../../../types/note";

interface NotesListDisplayProps {
  notes: INote[];
}

function NotesListDisplay({ notes }: NotesListDisplayProps) {
  return (
    <div className="">
      {notes.length === 0 ? (
        <p className="text-lg text-gray-600">Aucune note à afficher.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-5 transition-shadow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                {note.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600">{note.content}</p>
              <div className="mt-5 space-y-2 text-sm text-gray-500">
                {/* Créé par */}
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Créé par :</span>{" "}
                  {note.createdBy && typeof note.createdBy !== "string"
                    ? note.createdBy.username
                    : note.createdBy || <span className="italic text-gray-400">Utilisateur supprimé</span>}
                </p>

                {/* Assigné à */}
                {note.assignedTo ? (
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Assigné à :</span>{" "}
                    {note.assignedTo && typeof note.assignedTo !== "string" ? (
                      note.assignedTo.username
                    ) : (
                      <span className="italic text-gray-400">Utilisateur supprimé</span>
                    )}
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-gray-400">
                    <UserX className="w-4 h-4" />
                    Non assignée
                  </p>
                )}

                {/* Statut */}
                <p className="flex items-center gap-2">
                  {note.status === "active" ? (
                    <ArrowRightCircle className="w-4 h-4 text-green-500" />
                  ) : note.status === "archived" ? (
                    <Archive className="w-4 h-4 text-gray-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className="font-medium">Statut :</span>{" "}
                  {note.status === "active" ? "Active" : note.status === "archived" ? "Archivée" : "Assignée"}
                </p>

                {/* Date de création */}
                <p>
                  <span className="font-medium">Créé le :</span>{" "}
                  {new Date(note.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesListDisplay;
