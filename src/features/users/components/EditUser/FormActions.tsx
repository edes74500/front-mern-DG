import React from "react";

interface FormActionsProps {
  onCancelClick: () => void;
  onDeleteClick: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancelClick, onDeleteClick }) => {
  return (
    <div className="flex justify-end gap-3 pt-10">
      {/* Bouton Annuler */}
      <button
        type="button"
        onClick={onCancelClick}
        className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
      >
        Annuler
      </button>

      {/* Bouton Supprimer */}
      <button
        type="button"
        onClick={onDeleteClick}
        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        Supprimer
      </button>

      {/* Bouton Sauvegarder */}
      <button
        type="submit" // Ce bouton soumettra le formulaire
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Sauvegarder
      </button>
    </div>
  );
};

export default FormActions;
