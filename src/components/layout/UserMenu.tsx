import { IUserApi } from "@edes74500/fixrepairshared";
import { User } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface ProfileMenuProps {
  user: IUserApi;
  onLogOut: () => void; // Fonction pour déconnecter l'utilisateur
  isUserMenuOpen: boolean; // État pour stocker si le menu est ouvert
  setIsUserMenuOpen: (prev: boolean) => void; // Fonction pour modifier l'état du menu isOpen
}

const ProfileMenu = ({ onLogOut, user, setIsUserMenuOpen, isUserMenuOpen }: ProfileMenuProps) => {
  // Toggle menu au clic
  const toggleMenu = () => {
    setIsUserMenuOpen(isUserMenuOpen ? false : true);
  };

  return (
    <div className="relative z-40">
      {/* Overlay pour l'effet de blur */}

      {/* <div className={`fixed top-0 bottom-0 left-0 right-0 `}></div> */}

      {/* Icône de profil */}
      <div className="relative cursor-pointer" onClick={toggleMenu}>
        <User className="z-30 w-10 h-10 p-2 text-black bg-blue-200 border-2 border-gray-300 rounded-full" />
      </div>

      {/* Menu déroulant */}
      {isUserMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-[700px] bg-white rounded-md shadow-xl border border-gray-200  grid grid-cols-3"
          style={{ top: "calc(100% + 4px)" }}
          onClick={() => setIsUserMenuOpen(false)}
        >
          {/* Section utilisateur */}
          <div className="col-span-3 p-4 bg-blue-100 border-b border-gray-300">
            <p className="text-lg font-semibold text-gray-900">{user.username}</p>
            <p className="text-sm text-gray-600">Titulaire du compte</p>
            {/* <Link to="/account-settings" className="text-sm text-blue-600 hover:underline">
              Gérer les profils
            </Link> */}
          </div>

          {/* Colonne 1 : Acheter à nouveau */}
          <div className="p-4 border-r border-gray-300">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">TechFix Pro</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Produit 1"
                  className="object-cover w-12 h-12 rounded-md shadow-sm"
                />
                <div>
                  {/* <p className="text-gray-800 truncate">Produit 1</p> */}
                  <button className="px-3 py-1 mt-1 text-sm text-yellow-600 bg-yellow-200 rounded-full shadow-sm hover:bg-yellow-300">
                    Contacter le manager
                  </button>
                </div>
              </li>
              {/* <li className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Produit 2"
                  className="object-cover w-12 h-12 rounded-md shadow-sm"
                />
                <div>
                  <p className="text-gray-800 truncate">Produit 2</p>
                  <button className="px-3 py-1 mt-1 text-sm text-yellow-600 bg-yellow-200 rounded-full shadow-sm hover:bg-yellow-300">
                    Ajouter au panier
                  </button>
                </div>
              </li> */}
            </ul>
          </div>

          {/* Colonne 2 : Vos listes d'envies */}
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
                  Terminee
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Votre compte */}
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
      )}
    </div>
  );
};

export default ProfileMenu;
