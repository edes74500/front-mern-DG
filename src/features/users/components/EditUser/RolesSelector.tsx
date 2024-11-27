interface RolesSelectorProps {
  roles: string[];
  setRoles: React.Dispatch<React.SetStateAction<string[]>>;
}

const RolesSelector = ({ roles, setRoles }: RolesSelectorProps) => {
  const toggleRole = (role: string) => {
    setRoles((prevRoles) => (prevRoles.includes(role) ? prevRoles.filter((r) => r !== role) : [...prevRoles, role]));
  };

  const getBadgeColor = (role: string): string => {
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
        {["Admin", "Employee", "Manager"].map((role) => (
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
    </div>
  );
};

export default RolesSelector;
