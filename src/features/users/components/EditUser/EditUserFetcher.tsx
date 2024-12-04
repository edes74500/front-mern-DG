import { IUpdateUserBodyRequest, IUpdateUserQueryRequest } from "@edes74500/fixrepairshared";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../../../../components/utils/ConfirmModal";
import { notify } from "../../../notifications/utils/notifications";
import { useDeleteUserByIdMutation, useGetUserByIdQuery, useUpdateUserByIdMutation } from "../../state/usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUserFetcher = () => {
  const { userId } = useParams<string>();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: user, isLoading, isError } = useGetUserByIdQuery({ userId: userId || "" }, { skip: isDeleting });

  const [updateUser] = useUpdateUserByIdMutation();
  const [deleteUser] = useDeleteUserByIdMutation();

  if (!userId || !user) return <p className="text-red-500">ID utilisateur invalide.</p>;
  if (isLoading) return <p>Chargement des données...</p>;
  if (isError || !user) return <p className="text-red-500">Aucun utilisateur trouvé.</p>;

  const onDeleteUser = async () => {
    setIsDeleting(true);
    try {
      await deleteUser({ userId: user.id }).unwrap();
      navigate("/dashboard/users/list");
      notify(`Utilisateur ${user.username} supprimé avec succès.`, "success");
    } catch (error: any) {
      notify(`Erreur : ${error?.data?.message || "Une erreur inconnue est survenue."}`, "error");
      setIsDeleting(false);
    }
  };

  const onUpdateUser = async (updatedUser: IUpdateUserBodyRequest & IUpdateUserQueryRequest) => {
    try {
      await updateUser(updatedUser).unwrap();
      notify(`Utilisateur ${updatedUser.username} mis à jour avec succès.`, "success");
      navigate("/dashboard/users/list");
    } catch (error: any) {
      notify(`Erreur : ${error?.data?.message || "Une erreur inconnue est survenue."}`, "error");
    }
  };

  return (
    <>
      <EditUserForm
        user={user}
        onUpdateUser={onUpdateUser}
        onCancel={() => navigate("/dashboard/users/list")}
        onOpenDeleteModal={() => setModalOpen(true)}
      />
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={onDeleteUser}
        onCancel={() => setModalOpen(false)}
        title="Confirmer la suppression"
        description={`Êtes-vous sûr de vouloir supprimer ${user.username} ? Cette action est irréversible.`}
      />
    </>
  );
};

export default EditUserFetcher;
