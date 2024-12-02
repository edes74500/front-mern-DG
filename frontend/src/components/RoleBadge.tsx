import React from "react";

interface RoleBadgeProps {
  roles: string[];
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ roles }) => {
  // Fonction pour déterminer la couleur en fonction du rôle
  const getBadgeColor = (role: string): string => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-500"; // Couleur pour Admin
      case "employee":
        return "bg-green-500"; // Couleur pour Employee
      case "manager":
        return "bg-yellow-500"; // Couleur pour Manager
      default:
        return "bg-gray-500"; // Couleur par défaut pour les autres rôles
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <span key={role} className={`px-3 py-1 text-sm font-medium text-white rounded-full ${getBadgeColor(role)}`}>
          {role}
        </span>
      ))}
    </div>
  );
};

export default RoleBadge;
