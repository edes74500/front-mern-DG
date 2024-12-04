import { useNavigate, useParams } from "react-router-dom";
import GenericButton from "../../../components/ui/GenericButton";
import { notify } from "../../notifications/utils/notifications";
import EditNoteFetcher from "../components/EditNote/EditNoteFetcher ";

const EditNotePage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    notify("Édition annulée", "info");
    navigate("/dashboard/notes/list");
  };

  return (
    <div>
      {/* Bouton de retour global */}
      <div className="flex items-center gap-2 mb-4">
        <GenericButton text="Retour à la liste des notes" onClick={handleCancel} variant="back" />
      </div>

      {/* Formulaire d'édition */}
      {noteId && <EditNoteFetcher noteId={noteId} />}
    </div>
  );
};

export default EditNotePage;
