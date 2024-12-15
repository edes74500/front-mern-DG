import { IUserApi } from "@edes74500/fixrepairshared";
import { User } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

interface ProfileMenuProps {
  user: IUserApi;
  onLogOut: () => void;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (prev: boolean) => void;
}

const ProfileMenu = ({ onLogOut, user, setIsUserMenuOpen, isUserMenuOpen }: ProfileMenuProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Gérer l'ouverture et la fermeture avec un délai
  const handleMouseEnter = () => {
    console.log("mouse entered");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 200); // Délai de 200ms
  };

  return (
    <div className="relative z-40">
      {/* Overlay pour l'effet de blur */}
      {/* Icône de profil */}
      <div className="relative">
        <Link to={`/dashboard`}>
          <User
            className="z-30 p-2 text-black bg-blue-300 border border-gray-300 rounded-full w-9 h-9"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseLeave}
          />
        </Link>
      </div>

      {/* Menu déroulant */}
      {isUserMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-[700px] overflow-hidden bg-white rounded-md shadow-lg border-2 border-gray-400 grid grid-cols-[1fr_2fr]"
          style={{ top: "calc(100% + 8px)" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsUserMenuOpen(false)}
        >
          {/* Colonne 1 : TechFix Pro */}
          <div className="flex flex-col w-full p-4 border-r border-gray-300 ">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">TechFix Pro</h3>
            <div className="flex flex-col justify-center object-center w-full space-y-5 ">
              <button className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 transform rounded-md shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2">
                Voir les notes actives
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 transform rounded-md shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2">
                Voir vos notes assignees
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 transform rounded-md shadow-md bg-gradient-to-r from-gray-500 to-gray-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2">
                Voir vos notes completes
              </button>
            </div>
          </div>

          {/* Section utilisateur (haut de la colonne 2) */}
          <div>
            <div className="p-4 m-2 bg-blue-600 rounded">
              <p className="text-lg font-semibold text-white">{user.username}</p>
              <p className="text-sm text-gray-100">Titulaire du compte</p>
            </div>

            {/* Colonne 2 : Vos Notes et Votre compte (bas de la colonne 2) */}
            <div className="grid grid-cols-2">
              {/* Vos Notes */}
              <div className="p-4 border-r border-gray-300">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Vos Notes</h3>
                <ul className="space-y-1">
                  <li>
                    <Link to="/wishlist/alexa" className="text-gray-700 hover:underline">
                      En cours
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist/gopro" className="text-gray-700 hover:underline">
                      Ouvertes
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist/create" className="text-gray-700 hover:underline">
                      Terminées
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Votre compte */}
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Votre compte</h3>
                <ul className="space-y-1">
                  <li>
                    <Link to="/account" className="text-gray-700 hover:underline">
                      Votre compte
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="text-gray-700 hover:underline">
                      Votre Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onLogOut} className="text-gray-700 hover:underline">
                      Déconnexion
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
