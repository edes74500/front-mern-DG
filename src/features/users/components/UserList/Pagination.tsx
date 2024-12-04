interface PaginationProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  totalUsers: number;
}

function Pagination({ page, totalPages, onNext, onPrevious, totalUsers }: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-gray-600">Total des utilisateurs : {totalUsers}</p>
      <div className="flex items-center gap-4">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={onPrevious}
          disabled={page === 1}
        >
          Précédent
        </button>
        <span className="text-gray-700">
          Page {page} sur {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={onNext}
          disabled={page === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Pagination;
