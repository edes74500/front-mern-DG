import { NoteUpdateReqBodyDTO, NoteUpdateReqParamsDTO } from "@edes74500/fixrepairshared";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../notifications/utils/notifications";
import { useGetNoteByIdQuery, useUpdateNoteByIdMutation } from "../../state/notesApiSlice";
import NoteEditForm from "./NoteEditForm";
import { useGetUsersQuery } from "@/features/users/state/usersApiSlice";

const NoteEditPage = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateNote] = useUpdateNoteByIdMutation();
  const { data: note, isLoading, isError } = useGetNoteByIdQuery({ noteId: noteId || "" }, { skip: isUpdating });
  const { data: usersApiResponse } = useGetUsersQuery({ roles: ["employee"], active: true });
  const users = usersApiResponse?.users || [];
  const onUpdateNote = async (
    noteId: NoteUpdateReqParamsDTO["noteId"],
    updatedNote: NoteUpdateReqBodyDTO,
  ): Promise<void> => {
    setIsUpdating(true);
    try {
      const response = await updateNote({ noteId, ...updatedNote }).unwrap();
      console.log();
      notify(`Note ${response.title} mise à jour avec succès.`, "success");
      navigate(`/dashboard/notes/list`);
    } catch (error) {
      notify(`Erreur lors de la mise à jour de la note`, "error");
      setIsUpdating(false);
    }
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="max-w-xl p-5 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">Creer une note</h2>
      <NoteEditForm note={note} isUpdating={isUpdating} isError={isError} onUpdateNote={onUpdateNote} users={users} />
    </div>
  );
};
export default NoteEditPage;
