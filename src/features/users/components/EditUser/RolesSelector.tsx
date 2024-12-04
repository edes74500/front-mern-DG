import { AllowedRoles, IRequiredRoleEnum, IRoleEnum, IUpdateUserBodyRequest } from "@edes74500/fixrepairshared";
import { useFormContext } from "react-hook-form";

const RolesSelector = () => {
  const {
    watch,
    setValue,
    trigger, // Méthode pour déclencher la validation manuelle
    formState: { errors },
  } = useFormContext<IUpdateUserBodyRequest>();

  const roles = watch("roles"); // Récupère la valeur actuelle des rôles

  const toggleRole = async (role: IRoleEnum) => {
    const updatedRoles: IRequiredRoleEnum = roles.includes(role) ? roles.filter((r) => r !== role) : [...roles, role];

    // Met à jour les rôles dans le formulaire
    setValue("roles", updatedRoles);

    // Déclenche la validation de `roles` après mise à jour
    await trigger("roles");
  };

  const getBadgeColor = (role: IRoleEnum): string => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-500"; // Couleur pour Admin
      case "employee":
        return "bg-green-500"; // Couleur pour Employee
      case "manager":
        return "bg-yellow-500"; // Couleur pour Manager
      default:
        return "bg-gray-500"; // Couleur par défaut
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">Rôles</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {AllowedRoles.map((role) => (
          <button
            key={role}
            type="button" // Empêche le bouton de soumettre le formulaire
            onClick={() => toggleRole(role)}
            className={`px-4 py-2 text-sm font-medium text-white rounded-full transition ${
              roles.includes(role) ? getBadgeColor(role) : "bg-gray-300 text-gray-600"
            } hover:opacity-80`}
          >
            {role}
          </button>
        ))}
      </div>
      {/* Affichage des erreurs */}
      {errors.roles && <p className="mt-2 text-sm text-red-600">{errors.roles.message}</p>}
    </div>
  );
};

export default RolesSelector;
