import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col md:grid md:grid-cols-[auto_1fr] h-screen">
      {/* Menu Hamburger pour mobile */}
      <div className="relative z-10 flex items-center justify-between p-4 md:hidden bg-slate-500">
        <span className="text-lg text-white">Dashboard</span>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-white">
          ☰ {/* Icône hamburger */}
        </button>
      </div>

      {/* Overlay avec effet de flou */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)} // Ferme le menu au clic
          className="fixed inset-0 z-50 bg-opacity-50 bg-slate-400 backdrop-blur-sm"
        ></div>
      )}

      {/* Menu fixe pour PC et déployable pour mobile */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-50 h-full w-64 bg-slate-500 p-5 transition-transform duration-300 md:static md:translate-x-0`}
      >
        <div className="mb-4 text-lg text-white">Dashboard Menu</div>
        {/* Liens ou contenu du menu */}
        <ul>
          <li className="py-2 text-white">Lien 1</li>
          <li className="py-2 text-white">Lien 2</li>
          <li className="py-2 text-white">Lien 3</li>
        </ul>
      </div>

      {/* Contenu principal avec effet responsive */}
      <div className={`flex-grow bg-gray-100 p-5 transition ${isMenuOpen ? "md:blur-none blur-sm" : "blur-none"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardMenu;
