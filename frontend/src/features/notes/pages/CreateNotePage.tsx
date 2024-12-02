import { useNavigate } from "react-router-dom";
import CreateNoteForm from "../components/CreateNote/CreateNoteForm";
import GenericButton from "../../../components/ui/GenericButton";

const CreateNotePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <GenericButton
          text="Retour à la liste des notes"
          onClick={() => navigate("/dashboard/notes/list")}
          variant="back"
        />
      </div>
      <div className="max-w-xl space-y-6 bg-white border rounded-lg shadow-md">
        <CreateNoteForm />
      </div>
    </>
  );
};
export default CreateNotePage;
