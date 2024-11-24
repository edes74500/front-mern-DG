import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Menu Hamburger pour mobile */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 shadow-md md:hidden bg-slate-500">
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

      {/* Menu fixe pour PC et sticky pour mobile */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-50  h-full w-64   transition-transform duration-300 md:sticky md:translate-x-0 bg-slate-500`}
      >
        <div className="w-full mb-4 text-xl font-bold text-white p-7 bg-slate-600">Dashboard Menu</div>
        {/* Liens ou contenu du menu */}
        <div className="p-5">
          <ul className="space-y-8">
            <li>
              <Link to="/dashboard" className="py-2 text-white">
                Notes List
              </Link>
            </li>

            <li>
              <Link to="settings" className="py-2 text-white">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardMenu;
