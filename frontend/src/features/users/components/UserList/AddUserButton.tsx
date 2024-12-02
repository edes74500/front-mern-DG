import { useNavigate } from "react-router-dom";

// Exemple de bouton professionnel avec Lucid ou une librairie CSS
const AddUserButton = () => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/dashboard/users/add-user");
  };

  return (
    <button
      onClick={handleAddUser}
      className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Ajouter un utilisateur
    </button>
  );
};

export default AddUserButton;
