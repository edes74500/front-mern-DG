import React from "react";
import { ArrowLeft, LucideIcon } from "lucide-react"; // Typage des icônes Lucide

interface GenericButtonProps {
  text: string;
  onClick: () => void;
  icon?: JSX.Element;
  className?: string; // Pour personnaliser les styles
  variant?: "primary" | "secondary" | "danger" | "back"; // Variants prédéfinis
}

const GenericButton = ({ text, onClick, icon, className = "", variant = "primary" }: GenericButtonProps) => {
  // Classes par défaut selon le variant
  const baseClasses = "px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200 transition";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    back: "bg-gray-400 text-white hover:bg-gray-500",
  };

  if (variant === "back") {
    icon = <ArrowLeft className="w-5 h-5" />;
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {icon && React.cloneElement(icon, { className: "w-5 h-5" })}
      {text}
    </button>
  );
};

export default GenericButton;
