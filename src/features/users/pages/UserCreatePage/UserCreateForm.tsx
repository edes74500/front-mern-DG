import { ISignupFormValidation, SignupFormValidation } from "@edes74500/fixrepairshared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInputBloc from "../../../../components/forms/FormInputBloc";
import GenericButton from "../../../../components/ui/GenericButton";
import { notify } from "../../../notifications/utils/notifications";
import UserRolesSelector from "../../components/form/FormUserRolesSelector";
import FormUserSetActif from "../../components/form/FormUserSetActif";

interface UserCreateFormProps {
  onCreateUser: (formData: ISignupFormValidation) => void;
  isLoading: boolean;
  isUsernameTaken: boolean;
  onUsernameChange: (username: string) => void;
}
function UserCreateForm({ onCreateUser, isLoading, onUsernameChange, isUsernameTaken }: UserCreateFormProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    notify("Création annulée", "info");
    navigate("/dashboard/users/list");
  };

  const methods = useForm<ISignupFormValidation>({
    resolver: zodResolver(SignupFormValidation),
    defaultValues: {
      username: "",
      password: "",
      active: true,
      confirmPassword: "",
      roles: [],
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const username = watch("username");

  useEffect(() => {
    onUsernameChange(username);
  }, [username, onUsernameChange]);

  const onSubmit = (data: ISignupFormValidation) => {
    onCreateUser(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-700">Modifier l'utilisateur</h2>
        <FormInputBloc
          name="username"
          label="nom d'utilisateur"
          error={isUsernameTaken ? "Ce nom d'utilisateur n'est pas disponible" : undefined}
        />

        <FormInputBloc name="password" label="Mot de passe" />
        <FormInputBloc name="confirmPassword" label="Confirmez le mot de passe" />
        <FormUserSetActif />
        <div className={errors.roles ? "rounded-lg p-3 border-4 border-red-600" : "p-3"}>
          <UserRolesSelector />
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-3">
          {/* Bouton Annuler */}
          <GenericButton text="Annuler" variant="cancel" onClick={handleCancel} />
          <GenericButton
            text={isLoading ? "Création en cours..." : "Créer"}
            variant="create"
            type="submit"
            // disabled={loading}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default UserCreateForm;
