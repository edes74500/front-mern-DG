import DOMPurify from "dompurify"; // Protection contre les attaques XSS
import { useState } from "react";
import { INoteWithPopulatedUser } from "../../../../types/note";
import { IUser } from "../../../../types/user";
import { notify } from "../../../notifications/utils/notifications";
import { useUpdateNoteByIdMutation } from "../../state/notesApiSlice";
import NoteAssignmentForm from "./NoteAssignmentsForm";
import NoteDetailsForm from "./NoteDetailsForm";

interface NoteFormData {
  title: string;
  content: string;
}

interface AssignmentFormData {
  assignedTo: string; // ID de l'utilisateur
  status: "active" | "assigned" | "completed" | "archived";
}

interface EditNoteFormProps {
  note: INoteWithPopulatedUser;
  users: IUser[];
}

const EditNoteForm = ({ note, users }: EditNoteFormProps) => {
  const [updateNote, { isLoading }] = useUpdateNoteByIdMutation();

  // État local pour les deux parties du formulaire
  const [noteFormData, setNoteFormData] = useState<NoteFormData>({
    title: note.title || "",
    content: note.content || "",
  });

  const [assignmentFormData, setAssignmentFormData] = useState<AssignmentFormData>({
    assignedTo: note.assignedTo._id! || "",
    status: note.status || "active",
  });

  // Nettoyer les données pour éviter XSS
  const sanitizeData = (data: any) => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, typeof value === "string" ? DOMPurify.sanitize(value) : value]),
    );
  };

  const handleFinalSubmit = async () => {
    const sanitizedData = {
      ...sanitizeData(noteFormData),
      ...sanitizeData(assignmentFormData),
    };

    try {
      await updateNote({ id: note.id, ...sanitizedData }).unwrap();
      notify("Note sauvegardée avec succès.", "success");
    } catch (error) {
      notify(`Erreur lors de la sauvegarde : ${error.message || "Inconnue"}`, "error");
    }
  };

  return (
    <div>
      <h1>Modifier la Note</h1>
      {/* Formulaire pour les détails */}
      <NoteDetailsForm formData={noteFormData} setFormData={setNoteFormData} />

      {/* Formulaire pour le statut et l'assignation */}
      <NoteAssignmentForm formData={assignmentFormData} setFormData={setAssignmentFormData} users={users} />

      {/* Bouton de soumission global */}
      <button
        onClick={handleFinalSubmit}
        disabled={isLoading}
        className={`mt-4 px-4 py-2 rounded text-white ${isLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isLoading ? "Sauvegarde..." : "Sauvegarder"}
      </button>
    </div>
  );
};

export default EditNoteForm;
