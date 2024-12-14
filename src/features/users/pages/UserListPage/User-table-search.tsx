import GenericButton from "@/components/ui/GenericButton";
import { useDebounce } from "@/hooks/useDounce";
import { PlusCircle, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserTableSearchProps {
  setQueryOptions: (options: any) => void; // update query options prop
}

const UserTableSearch = ({ setQueryOptions }: UserTableSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker la saisie utilisateur
  const debouncedSearch = useDebounce(searchTerm, 500); // Applique le debounce sur searchTerm
  const navigate = useNavigate();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Met à jour la saisie en temps réel
  };

  // Met à jour les options après le debounce
  useEffect(() => {
    if (debouncedSearch) {
      setQueryOptions((prev: any) => ({
        ...prev,
        search: debouncedSearch, // Envoie la valeur après le debounce
      }));
    }
  }, [debouncedSearch, setQueryOptions]); // Exécute à chaque changement de debouncedSearch

  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center w-full max-w-sm bg-white border border-gray-300 rounded-md shadow-sm ">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Rechercher un utilisateur..."
          style={{ boxShadow: "none" }}
          className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-400 bg-transparent border-none ring-red-400 focus:ring-0 focus:ring-offset-0"
        />
        <button className="p-2 text-gray-600 bg-gray-100 rounded-r-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="">
        <GenericButton
          text="Ajouter un utilisateur"
          onClick={() => navigate("/dashboard/users/create-user")}
          icon={<PlusCircle />}
        />
      </div>
    </div>
  );
};

export default UserTableSearch;
