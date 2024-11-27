import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../../../types/user";

interface EditUserButtonProps {
  user: IUser;
}

const EditUserButton = ({ user }: EditUserButtonProps) => {
  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate(`/dashboard/user/edit/${user.id}`);
  };

  return (
    <div className="flex justify-end gap-x-2 ">
      <div className="relative group">
        <button onClick={onClickNavigate} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Pencil color="orange" size={18} /> {/* Couleur rouge et taille 24px */}
        </button>

        {/* Tooltip */}
        <span className="absolute z-20 invisible px-2 py-1 mb-2 text-sm text-white transition-opacity transform -translate-x-1/2 bg-gray-600 rounded opacity-0 bottom-full left-1/2 group-hover:visible group-hover:opacity-100">
          Editer l'utilisateur
        </span>
      </div>
    </div>
  );
};
export default EditUserButton;
