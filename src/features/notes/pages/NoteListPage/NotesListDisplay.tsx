import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import NoteDetails from "../../components/shared/NoteDetails";

interface NoteListDisplayBase {
  id: string;
  title: string;
  slug?: string | undefined;
  content: string;
  status: "active" | "assigned" | "completed" | "archived";
}

interface NotesListDisplayProps<T extends NoteListDisplayBase> {
  notes: T[];
}

function NotesListDisplay<T extends NoteListDisplayBase>({ notes }: NotesListDisplayProps<T>) {
  return (
    <div className="">
      {!notes || notes.length === 0 ? (
        <p className="text-lg text-gray-600">Aucune note à afficher.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-5 transition-shadow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                <Link className="text-blue-500 " to={`/dashboard/notes/${note.slug}/${note.id}`}>
                  {note.title}
                </Link>
              </h3>
              <div>
                <p className="mt-3 text-sm text-gray-600 break-words">{note.content}</p>
                <NoteDetails note={note} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesListDisplay;
