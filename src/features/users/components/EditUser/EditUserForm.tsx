import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../../types/user";
import { notify } from "../../../notifications/utils/notifications";
import { useGetUserByIdQuery, useUpdateUserByIdMutation, useDeleteUserByIdMutation } from "../../state/usersApiSlice";
import UserDetailsForm from "./UserDetailsForm";
import RolesSelector from "./RolesSelector";
import FormActions from "./FormActions";
import ConfirmModal from "../../../../components/utils/ConfirmModal";
import { UserIcon } from "lucide-react";

const EditUserForm = () => {
  const { userId } = useParams<{ userId: IUser["id"] }>();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserByIdQuery({ userId: userId || "" });

  const [updateUser] = useUpdateUserByIdMutation();
  const [deleteUser] = useDeleteUserByIdMutation();

  // États locaux
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [active, setActive] = useState(false);
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRoles(user.roles);
      setActive(user.active);
    }
  }, [user]);

  if (!userId || !user) return <p className="text-red-500">ID utilisateur invalide.</p>;
  if (isLoading) return <p>Chargement des données...</p>;
  if (isError || !user) return <p className="text-red-500">Aucun utilisateur trouvé.</p>;

  const onCancelClick = () => {
    notify("Modification annulée", "info");
    navigate("/dashboard/users/list");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      notify("Le nom d'utilisateur est requis.", "error");
      return;
    }
    try {
      await updateUser({
        id: user.id,
        username,
        roles,
        active,
        ...(password && { password }),
      }).unwrap();
      notify(`Utilisateur ${username} mis à jour avec succès.`, "success");
      navigate("/dashboard/users/list");
    } catch (error: any) {
      notify(`Erreur : ${error?.data?.message || "Une erreur inconnue est survenue."}`, "error");
    }
  };

  const onConfirmDelete = async () => {
    try {
      await deleteUser({ id: user.id }).unwrap();
      navigate("/dashboard/users/list");
      setModalOpen(false);
      notify(`Utilisateur ${username} supprimé avec succès.`, "success");
    } catch (error: any) {
      notify(`Erreur : ${error?.data?.message || "Une erreur inconnue est survenue."}`, "error");
    } finally {
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-700">Modifier l'utilisateur</h2>
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <UserIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{user.username}</h3>
        </div>
        <UserDetailsForm
          username={username}
          setUsername={setUsername}
          active={active}
          setActive={setActive}
          password={password}
          setPassword={setPassword}
        />

        <RolesSelector roles={roles} setRoles={setRoles} />

        <FormActions onCancelClick={onCancelClick} onDeleteClick={() => setModalOpen(true)} />
      </form>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={onConfirmDelete}
        onCancel={() => setModalOpen(false)}
        title="Confirmer la suppression"
        description={`Êtes-vous sûr de vouloir supprimer ${username} ? Cette action est irréversible.`}
      />
    </div>
  );
};

export default EditUserForm;
