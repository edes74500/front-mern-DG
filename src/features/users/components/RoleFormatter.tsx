const RoleFormatter = ({ roles }: { roles: string[] }) => {
  // Définir les couleurs pour chaque rôle
  const roleColors: Record<string, string> = {
    employee: "bg-blue-100 text-blue-800",
    admin: "bg-red-100 text-red-800",
    manager: "bg-green-100 text-green-800",
  };

  return (
    <div className="flex gap-2">
      {roles.map((role) => (
        <span
          key={role}
          className={`px-2 py-1 rounded text-sm font-medium ${roleColors[role] || "bg-gray-100 text-gray-800"}`}
        >
          {role}
        </span>
      ))}
    </div>
  );
};

export default RoleFormatter;
