import { ISignupFormValidation } from "@edes74500/fixrepairshared";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../notifications/utils/notifications";
import { useCreateUserMutation, useCheckUniquenessQuery } from "../../state/usersApiSlice";
import UserCreateForm from "./UserCreateForm";
import { useState } from "react";
import { useDebounce } from "../../../../hooks/useDounce";

const UserCreatePage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username, 500);

  const { data: uniqueCheckResult } = useCheckUniquenessQuery(
    { username: debouncedUsername },
    { skip: !debouncedUsername || debouncedUsername.length <= 2 },
  );

  const isUsernameTaken = uniqueCheckResult ? !uniqueCheckResult.isUniqueUsername : false;

  const onCreateUser = async (formData: ISignupFormValidation): Promise<void> => {
    if (isUsernameTaken) {
      notify("Le nom d'utilisateur est déjà pris", "error");
      return;
    }

    const { confirmPassword, ...newUser } = formData;
    try {
      const response = await createUser(newUser).unwrap();
      notify(`Utilisateur ${response.username} créé avec succès.`, "success");
      navigate("/dashboard/users/list");
    } catch (error) {
      notify("Erreur lors de la creation de l'utilisateur", "error");
    }
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <div className="max-w-xl p-6 space-y-6 bg-white border rounded-lg shadow-md">
      <UserCreateForm
        onCreateUser={onCreateUser}
        isLoading={isLoading}
        isUsernameTaken={isUsernameTaken}
        onUsernameChange={handleUsernameChange}
      />
    </div>
  );
};

export default UserCreatePage;
