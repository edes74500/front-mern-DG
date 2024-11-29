import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../../components/ui/GenericButton";
import NotesListDisplay from "../components/NotesList/NotesListDisplay";
import { useGetNotesQuery } from "../state/notesApiSlice";

const NoteListPage = () => {
  const { data: notes, isLoading, isError, isFetching } = useGetNotesQuery();
  const navigate = useNavigate();
  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p className="text-red-500">Erreur lors du chargement des notes.</p>;

  if (!notes && !isLoading && !isFetching) return <p className="text-red-500">Aucune note trouvée.</p>;

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Liste des Notes</h1>
      <div className="pt-2 pb-6">
        <GenericButton
          text="Ajouter une note"
          onClick={() => navigate("/dashboard/notes/create-note")}
          icon={<PlusCircle />}
        />
      </div>
      <NotesListDisplay notes={notes} />
      <div className="p-4">{/* <AddUserButton /> */}</div>
    </div>
  );
};
export default NoteListPage;
