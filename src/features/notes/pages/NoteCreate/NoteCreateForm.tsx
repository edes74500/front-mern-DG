import { INoteCreateReqBodyDTO, NoteCreateReqBodyDTO } from "@edes74500/fixrepairshared";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../notifications/utils/notifications";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputBloc from "../../../../components/forms/FormInputBloc";
import FormTextAreaBloc from "../../../../components/forms/FormTextAreaBloc";
import GenericButton from "../../../../components/ui/GenericButton";

interface NoteCreateFormProps {
  onCreateNote: (noteFormData: INoteCreateReqBodyDTO) => void;
  currentUser: string;
  isLoading: boolean;
}

const NoteCreateForm = ({ onCreateNote, currentUser, isLoading }: NoteCreateFormProps) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    notify("Création annulée", "info");
    navigate("/dashboard/users/list");
  };

  const methods = useForm<INoteCreateReqBodyDTO>({
    resolver: zodResolver(NoteCreateReqBodyDTO),
    defaultValues: {
      title: "",
      content: "",
      createdBy: currentUser,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (noteFormData: INoteCreateReqBodyDTO) => {
    onCreateNote(noteFormData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-700">Creer une note</h2>
        <FormInputBloc name="title" label="Titre" />
        <FormTextAreaBloc name="content" label="Contenu" rows={10} />
        <div className="flex justify-end gap-3">
          {/* Bouton Annuler */}
          <GenericButton text="Annuler" variant="cancel" onClick={handleCancel} />
          <GenericButton
            text={isLoading ? "Création en cours..." : "Créer"}
            variant={isLoading ? "loading" : "create"}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};
export default NoteCreateForm;
