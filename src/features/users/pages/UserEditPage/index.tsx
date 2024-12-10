import { IUserUpdateReqBodyDTO, IUserUpdateReqParamDTO } from "@edes74500/fixrepairshared";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../notifications/utils/notifications";
import { useDeleteUserByIdMutation, useGetUserByIdQuery, useUpdateUserByIdMutation } from "../../state/usersApiSlice";
import UserEditForm from "./UserEditForm";

const UserEditPage = () => {
  const { userId } = useParams<string>();
  const navigate = useNavigate();
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

  const onUpdateUser = async (updatedUser: IUserUpdateReqParamDTO & IUserUpdateReqBodyDTO) => {
    try {
      await updateUser(updatedUser).unwrap();
      notify(`Utilisateur ${updatedUser.username} mis à jour avec succès.`, "success");
      navigate("/dashboard/users/list");
    } catch (error: any) {
      notify(`Erreur : ${error?.data?.message || "Une erreur inconnue est survenue."}`, "error");
    }
  };

  return (
    <div className="max-w-xl p-6 bg-white border rounded-lg shadow-md">
      <UserEditForm user={user} onUpdateUser={onUpdateUser} onDeleteUser={onDeleteUser} />
    </div>
  );
};
export default UserEditPage;
