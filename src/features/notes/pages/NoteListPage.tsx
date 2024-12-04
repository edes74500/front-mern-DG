import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../../components/ui/GenericButton";
import { notify } from "../../notifications/utils/notifications";
import NotesListDisplay from "../components/NotesList/NotesListDisplay";
import { useGetNotesQuery } from "../state/notesApiSlice";

const NoteListPage = () => {
  const { data: notes, isLoading, isError, isFetching } = useGetNotesQuery();
  const navigate = useNavigate();

  // Référence pour suivre si une erreur a déjà été notifiée
  const [hasNotifiedError, setHasNotifiedError] = useState(true);

  useEffect(() => {
    // Si une erreur est présente et n'a pas encore été notifiée
    if (isError && !hasNotifiedError) {
      notify("Erreur pendant la récupération des données", "error");
      setHasNotifiedError(true); // Marque l'erreur comme notifiée
    }

    // Réinitialise la notification si tout est normal
    if (!isError) {
      setHasNotifiedError(false); // Prêt pour une nouvelle erreur
    }
  }, [isError]);

  // if (isError) {
  //   notify("Erreur lors du chargement des notes.", "error");
  // }

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
      {(isLoading || isFetching) && <p className="text-lg text-gray-500">Chargement des notes...</p>}
      {!notes && !isFetching && !isLoading && <p className="text-lg text-red-600">Aucune note à afficher.</p>}
      {notes && <NotesListDisplay notes={notes} />}
      <div className="p-4">{/* <AddUserButton /> */}</div>
    </div>
  );
};
export default NoteListPage;
