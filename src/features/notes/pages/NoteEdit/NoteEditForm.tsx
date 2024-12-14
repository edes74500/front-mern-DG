import {
  INoteGetByIdResBodyDTO,
  IUserGetResBodyDTO,
  NoteUpdateFormData,
  noteUpdateFormValidation,
  NoteUpdateReqBodyDTO,
  NoteUpdateReqParamsDTO,
} from "@edes74500/fixrepairshared";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInputBloc from "../../../../components/forms/FormInputBloc";
import FormTextAreaBloc from "../../../../components/forms/FormTextAreaBloc";
import GenericButton from "../../../../components/ui/GenericButton";
import { notify } from "../../../notifications/utils/notifications";

import FormSelectBloc from "@/components/forms/FormSelectBloc";

interface NoteEditFormProps {
  note: INoteGetByIdResBodyDTO | undefined;
  isUpdating: boolean;
  isError: boolean;
  onUpdateNote: (noteId: NoteUpdateReqParamsDTO["noteId"], updatedNote: NoteUpdateReqBodyDTO) => void;
  users: IUserGetResBodyDTO["users"];
}
const NoteEditForm = ({ note, isUpdating, isError, users, onUpdateNote }: NoteEditFormProps) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(noteUpdateFormValidation),
    defaultValues: {
      title: note?.title ?? "",
      content: note?.content ?? "",
      assignedTo: note?.assignedTo?.id ?? "",
      status: note?.status ?? "active",
    },
  });

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = methods;

  const onSubmit = (updatedNote: NoteUpdateReqBodyDTO) => {
    if (!note) return;
    onUpdateNote(note.id, updatedNote);
  };

  const handleCancel = () => {
    notify("Modification annulée.", "info");
    navigate(`/dashboard/notes/list`);
  };
  // Naviguer vers la page de liste des notes

  const usersOption = [{ value: "none", label: "-            " }].concat(
    users.map((user) => ({ value: user.id, label: user.username })),
  );

  return (
    <>
      {isError && <p>Une erreur est survenue lors du chargement des données.</p>}
      {!isError && note && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, () => {
              // Gestion des erreurs et focus sur le premier champ avec une erreur
              const firstError = Object.keys(errors)[0]; // Trouve le premier champ avec une erreur
              if (firstError) setFocus(firstError as keyof NoteUpdateFormData);
            })}
            className="space-y-5"
          >
            <FormInputBloc name="title" label="Titre" />
            <FormTextAreaBloc name="content" label="Contenu" rows={10} />
            <FormSelectBloc
              name="status"
              label="Statut"
              options={[
                { value: "active", label: "Active" },
                { value: "assigned", label: "Assignee" },
                { value: "completed", label: "Completed" },
                { value: "archived", label: "Archivee" },
              ]}
              placeholder="Sélectionnez un statut"
              triggerValidation="assignedTo"
            />
            <FormSelectBloc
              name="assignedTo"
              label="Assignee la note a :"
              options={usersOption}
              placeholder="Personne"
            />
            <div className="flex justify-end gap-3">
              <GenericButton text="Annuler" variant="cancel" onClick={handleCancel} />
              <GenericButton
                text={isUpdating ? "Création en cours..." : "Mettre à jour"}
                variant={isUpdating ? "loading" : "create"}
                type="submit"
              />
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};
export default NoteEditForm;
