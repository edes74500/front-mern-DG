import { FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import GenericButton from "../../../components/ui/GenericButton";
import { notify } from "../../notifications/utils/notifications";
import NoteDetails from "../components/shared/NoteDetails";
import { useDeleteNoteByIdMutation, useGetNoteByIdQuery } from "../state/notesApiSlice";
import ConfirmModal from "../../../components/utils/ConfirmModal";
import { useState } from "react";

const NoteCardPage = () => {
  const { noteId } = useParams(); // Récupérer l'id depuis l'URL
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteNote] = useDeleteNoteByIdMutation();
  const {
    data: note,
    isLoading,
    isError,
  } = useGetNoteByIdQuery(
    {
      noteId: noteId || "",
    },
    { skip: isDeleting },
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  // Gestion des états de chargement et d'erreurs
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Chargement de la note...</p>
      </div>
    );
  }

  if (isError || !noteId) {
    if (!noteId) {
      notify("Erreur : ID de note invalide.", "error");
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-medium text-red-600">Erreur : ID de note invalide.</p>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-red-600">Erreur : Note introuvable ou ID invalide.</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Note introuvable ou peut etre supprimee.</p>
      </div>
    );
  }

  const onConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteNote({ noteId: note.id }).unwrap();
      navigate("/dashboard/notes/list");
      setModalOpen(false);
      notify(`Note ${note.title} supprimé avec succès.`, "success");
    } catch (error: any) {
      setIsDeleting(false);
      notify(`Erreur : ${error?.data?.message || "Une erreur inconnue est survenue."}`, "error");
    } finally {
    }
  };
  return (
    <>
      <div className="bg-gray-100 ">
        <div className="flex items-center gap-2 mb-4">
          <GenericButton onClick={() => navigate("/dashboard/notes/list")} text="back" variant="back" />
        </div>
        <div className="max-w-3xl">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md ">
            <h1 className="flex items-center text-2xl font-bold text-gray-800">
              <FileText className="w-6 h-6 mr-3 text-blue-500" />
              {note.title}
            </h1>

            <p className="mt-4 text-gray-600">{note.content}</p>
            <NoteDetails note={note} />
          </div>

          <div className="flex justify-end mt-2 mb-2 space-x-2">
            <GenericButton
              onClick={() => {
                navigate(`/dashboard/notes/edit/${note.id}`);
              }}
              text="Modifier"
              variant="primary"
            />
            <GenericButton onClick={() => setModalOpen(true)} text="Supprimer" variant="danger" />
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={onConfirmDelete}
        onCancel={() => setModalOpen(false)}
        title="Confirmer la suppression"
        description={`Êtes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible.`}
      />
    </>
  );
};

export default NoteCardPage;
