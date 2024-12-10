import { INoteCreateReqBodyDTO } from "@edes74500/fixrepairshared";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../notifications/utils/notifications";
import { useCreateNoteMutation } from "../../state/notesApiSlice";
import NoteCreateForm from "./NoteCreateForm";

const CreateNotePage = () => {
  const navigate = useNavigate();
  //* centriliser les appeles API ici
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const [currentUser, _] = useState<string>("674f39be9a7128bc7510581e");
  const onCreateNote = async (noteFormData: INoteCreateReqBodyDTO): Promise<void> => {
    try {
      console.log("submitting note... noteFormData: ", noteFormData);
      await createNote(noteFormData).unwrap();
      notify(`Note créé avec succès.`, "success");
      navigate("/dashboard/notes/list");
    } catch (error) {
      notify("Erreur lors de la creation de la note", "error");
    }
  };

  //* le form contient toute la partie RHF

  return (
    <div className="max-w-xl p-5 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">Creer une note</h2>
      <NoteCreateForm onCreateNote={onCreateNote} currentUser={currentUser} isLoading={isLoading} />
    </div>
  );
};
export default CreateNotePage;
