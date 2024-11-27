interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
}

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, description }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center m-0 space-y-0 bg-black bg-opacity-50">
      <div className="flex flex-col justify-center p-6 bg-white rounded-lg shadow-lg w-30 ">
        <h2 className="text-lg font-bold text-left text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onCancel}
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-4 py-2 text-white rounded bg-destructive hover:bg-red-700"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
