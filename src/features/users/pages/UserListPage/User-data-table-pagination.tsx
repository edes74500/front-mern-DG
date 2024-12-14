import { IUserGetResBodyDTO } from "@edes74500/fixrepairshared";
import { useEffect, useState } from "react";

interface PaginationProps {
  data: IUserGetResBodyDTO;
  setQueryOptions: (options: any) => void; // update query options prop
}

function Pagination({ data, setQueryOptions }: PaginationProps) {
  const { totalPages, totalDocs, page, limit } = data;

  const [currentLimit, setCurrentLimit] = useState(limit); // État local pour stocker la limite sélectionnée

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    setCurrentLimit(newLimit); // Met à jour l'état local
    setQueryOptions((prev: any) => ({
      ...prev,
      limit: newLimit,
      page: 1, // Réinitialise à la première page
    }));
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Dropdown for selecting the limit */}
      <div className="flex items-center space-x-4">
        <label htmlFor="limit-select" className="text-sm text-gray-600">
          Afficher :
        </label>
        <select
          id="limit-select"
          value={currentLimit}
          onChange={handleLimitChange}
          className="w-[80px] px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {[10, 20, 30].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Total users */}
      <p className="text-sm text-gray-600">Total des utilisateurs : {totalDocs}</p>

      {/* Pagination controls */}
      <div className="flex items-center gap-4">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={() =>
            setQueryOptions((prev: any) => ({
              ...prev,
              page: Math.max(prev.page - 1, 1),
            }))
          }
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
          onClick={() =>
            setQueryOptions((prev: any) => ({
              ...prev,
              page: Math.min(prev.page + 1, totalPages),
            }))
          }
          disabled={page === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Pagination;
