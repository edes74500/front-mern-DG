import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { INote } from "../../../../types/note";
import NoteDetails from "../shared/NoteDetails";

interface NotesListDisplayProps {
  notes: INote[];
}

function NotesListDisplay({ notes }: NotesListDisplayProps) {
  return (
    <div className="">
      {notes.length === 0 ? (
        <p className="text-lg text-gray-600">Aucune note à afficher.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-5 transition-shadow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                <Link className="text-blue-500 " to={`/dashboard/notes/${note.id}`}>
                  {note.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-gray-600">{note.content}</p>
              <NoteDetails note={note} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesListDisplay;
