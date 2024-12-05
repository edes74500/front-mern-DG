import { ArrowLeft } from "lucide-react"; // Typage des icônes Lucide
import React from "react";

interface GenericButtonProps {
  text?: string;
  onClick?: () => void;
  icon?: JSX.Element;
  className?: string; // Pour personnaliser les styles
  variant?: "primary" | "secondary" | "danger" | "back" | "save" | "delete" | "cancel" | "create"; // Variants prédéfinis
  type?: "button" | "submit"; // Type du bouton
  disabled?: boolean; // Permet d'activer/désactiver le bouton en fonction d'une condition
}

const GenericButton = ({
  text,
  onClick,
  icon,
  className = "",
  variant = "primary",
  type,
  disabled = false,
}: GenericButtonProps) => {
  // Classes par défaut selon le variant
  const baseClasses =
    "px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200 transition text-sm font-medium";
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-500 hover:bg-red-600",
    back: "bg-gray-400 hover:bg-gray-500",
    delete: "bg-red-600 hover:bg-red-700",
    save: "bg-blue-600 hover:bg-blue-700",
    cancel: " bg-gray-400 hover:bg-gray-500",
    create: "bg-blue-600 hover:bg-blue-700",
  };

  if (variant === "back") {
    icon = <ArrowLeft className="w-5 h-5" />;
  }

  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {icon && React.cloneElement(icon, { className: "w-5 h-5" })}
      {text}
    </button>
  );
};

export default GenericButton;
