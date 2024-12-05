import { ICreateUserBodyRequest } from "@edes74500/fixrepairshared";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../notifications/utils/notifications";
import { useCreateUserMutation } from "../../state/usersApiSlice";
import UserCreateForm from "./UserCreateForm";

const UserCreatePage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const onCreateUser = async (newUser: ICreateUserBodyRequest): Promise<void> => {
    try {
      const response = await createUser(newUser).unwrap();
      notify(`Utilisateur ${response.username} créé avec succès. Vous pouvez maintenant vous connecter.`, "success");
      navigate("/dashboard/users/list");
    } catch (error) {
      notify("Erreur lors de la creation de l'utilisateur", "error");
    }
  };

  return (
    <div className="max-w-xl p-6 space-y-6 bg-white border rounded-lg shadow-md">
      <UserCreateForm onCreateUser={onCreateUser} isLoading={isLoading} />
    </div>
  );
};
export default UserCreatePage;
