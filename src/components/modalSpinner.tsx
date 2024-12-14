const ModalSpinner = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Chargement...</p>
      </div>
    </div>
  );
};

export default ModalSpinner;
