import AddNoteButton from "../components/NotesList/AddNoteButton";
import NotesListDisplay from "../components/NotesList/NotesListDisplay";
import { useGetNotesQuery } from "../state/notesApiSlice";

const NoteListPage = () => {
  const { data: notes, isLoading, isError, isFetching } = useGetNotesQuery();

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p className="text-red-500">Erreur lors du chargement des notes.</p>;

  if (!notes && !isLoading && !isFetching) return <p className="text-red-500">Aucune note trouvée.</p>;

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Liste des Notes</h1>
      <div className="p-4">
        <AddNoteButton />
      </div>
      <NotesListDisplay notes={notes} />
      <div className="p-4">{/* <AddUserButton /> */}</div>
    </div>
  );
};
export default NoteListPage;
