import { createUserRequestBodySchema, ICreateUserBodyRequest } from "@edes74500/fixrepairshared";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../notifications/utils/notifications";
import FormInputBloc from "../../components/form/FormInputBloc";
import FormUserSetActif from "../../components/form/FormUserSetActif";
import UserRolesSelector from "../../components/form/FormUserRolesSelector";
import GenericButton from "../../../../components/ui/GenericButton";

interface UserCreateFormProps {
  onCreateUser: (newUser: ICreateUserBodyRequest) => void;
  isLoading: boolean;
}
function UserCreateForm({ onCreateUser, isLoading }: UserCreateFormProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    notify("Création annulée", "info");
    navigate("/dashboard/users/list"); // Redirection vers la liste des utilisateurs
  };

  const methods = useForm<ICreateUserBodyRequest>({
    resolver: zodResolver(createUserRequestBodySchema),
    defaultValues: {
      username: "",
      password: "",
      active: true,
      roles: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ICreateUserBodyRequest) => {
    onCreateUser(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-700">Modifier l'utilisateur</h2>
        <FormInputBloc name="username" label="nom d'utilisateur" />
        <FormInputBloc name="password" label="Mot de passe" />
        <FormUserSetActif />
        <UserRolesSelector />

        {/* Boutons */}
        <div className="flex justify-end gap-3">
          {/* Bouton Annuler */}
          <GenericButton text="Annuler" variant="cancel" onClick={handleCancel} />
          <GenericButton
            text={isLoading ? "Création en cours..." : "Créer"}
            variant="create"
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default UserCreateForm;
