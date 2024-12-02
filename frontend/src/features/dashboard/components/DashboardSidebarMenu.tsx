import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, Settings, Notebook } from "lucide-react"; // Import des icônes

const DashboardSidebarMenu = () => {
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
        } fixed top-0 left-0 z-50 h-full w-64 transition-transform duration-300 md:sticky md:translate-x-0 bg-slate-500`}
      >
        <div className="sticky top-0 w-full">
          <Link
            to="/dashboard"
            className="flex items-center justify-center w-full text-xl font-bold text-white bg-slate-600 hover:bg-slate-700 p-7"
          >
            <Home className="w-5 h-5 mr-2" /> Dashboard
          </Link>
          <div className="flex-grow p-5 overflow-auto">
            <ul className="space-y-8">
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/dashboard/notes/list" className="flex items-center py-2 text-white">
                  <Notebook className="w-5 h-5 mr-2" /> Notes
                </Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/dashboard/users/list" className="flex items-center py-2 text-white">
                  <User className="w-5 h-5 mr-2" /> Users List
                </Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/dashboard/settings" className="flex items-center py-2 text-white">
                  <Settings className="w-5 h-5 mr-2" /> Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebarMenu;
