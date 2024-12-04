import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../state/usersApiSlice";
import { notify } from "../../../notifications/utils/notifications";
import FormInput from "../../../../components/forms/FormInput";
import { CheckCircle, XCircle } from "lucide-react";
import RolesSelector from "../EditUser/RolesSelector";

function CreateUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [active, setActive] = useState(true); // Ajout de l'état "Actif"

  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      notify("Veuillez remplir tous les champs obligatoires.", "error");
      return;
    }

    try {
      const response = await createUser({ username, password, roles, active }).unwrap();
      notify(`Utilisateur ${response.username} créé avec succès.`, "success");
      navigate("/dashboard/users/list"); // Redirection vers la liste des utilisateurs
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Erreur lors de la création de l'utilisateur.";
      notify(errorMessage, "error");
    }
  };

  const handleCancel = () => {
    notify("Création annulée", "info");
    navigate("/dashboard/users/list"); // Redirection vers la liste des utilisateurs
  };

  return (
    <div className="p-6 mx-auto rounded-lg ">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Créer un utilisateur</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ Username */}
        <FormInput
          label="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          required
        />

        {/* Champ Password */}
        <FormInput
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        {/* Rôles */}
        <RolesSelector roles={roles} setRoles={setRoles} />

        {/* Actif */}
        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => setActive(!active)} // Toggle l'état actif/inactif
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
              active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {active ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Actif
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                Inactif
              </>
            )}
          </button>
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-3">
          {/* Bouton Annuler */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Annuler
          </button>

          {/* Bouton Créer */}
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring ${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            }`}
          >
            {isLoading ? "Création en cours..." : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUserForm;
