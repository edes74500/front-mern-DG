import { IUserGetByIdResBodyDTO, IUserUpdateReqBodyDTO, userUpdateFormValidation } from "@edes74500/fixrepairshared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInputBloc from "../../../../components/forms/FormInputBloc";
import GenericButton from "../../../../components/ui/GenericButton";
import ConfirmModal from "../../../../components/utils/ConfirmModal";
import { notify } from "../../../notifications/utils/notifications";
import UserRolesSelector from "../../components/form/FormUserRolesSelector";
import FormUserSetActif from "../../components/form/FormUserSetActif";

interface UserEditFormProps {
  user: IUserGetByIdResBodyDTO;
  onUpdateUser: (updatedUser: any) => void;
  onDeleteUser: () => void;
}

const UserEditForm = ({ user, onUpdateUser, onDeleteUser }: UserEditFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleOnConfirmDelete = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    onDeleteUser();
  };

  const handleCancel = () => {
    notify("Annulation de la modification.", "info");
    navigate("/dashboard/users/list");
    // onCancel();
  };

  const methods = useForm<IUserUpdateReqBodyDTO>({
    resolver: zodResolver(userUpdateFormValidation),
    defaultValues: {
      username: user.username,
      password: "",
      active: user.active,
      roles: user.roles,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: IUserUpdateReqBodyDTO) => {
    console.log(data);
    onUpdateUser({
      userId: user.id,
      ...data,
    });
  };

  // Mettre à jour les valeurs initiales si `user` change
  useEffect(() => {
    reset({
      username: user.username,
      password: "",
      active: user.active,
      roles: user.roles,
    });
  }, [user, reset]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-xl font-semibold text-gray-700">Modifier l'utilisateur</h2>
          <FormInputBloc name="username" label="Nom d'utilisateur" />
          <FormInputBloc name="password" label="Mot de passe" />
          <FormUserSetActif />
          <UserRolesSelector />
          <div className="flex justify-end gap-3 pt-10">
            <GenericButton text="Annuler" variant="cancel" onClick={handleCancel} />
            <GenericButton text="Supprimer" variant="delete" onClick={() => setIsModalOpen(true)} />
            <GenericButton text="Sauvegarder" variant="save" type="submit" />
          </div>
        </form>
      </FormProvider>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleOnConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
        title="Confirmer la suppression"
        description={`Êtes-vous sûr de vouloir supprimer ${user.username} ? Cette action est irréversible.`}
      />
    </>
  );
};

export default UserEditForm;
