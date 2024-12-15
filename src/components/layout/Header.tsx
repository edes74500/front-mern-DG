import { useSendLogoutMutation } from "@/features/auth/state/authApiSlice";
import { selectCurrentUser } from "@/features/auth/state/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalSpinner from "../modalSpinner";
import { AnimatedMenuButton } from "../ui/AnimatedMenuButton"; // Custom animated button for menu toggling
import UserMenu from "./UserMenu";

interface HeaderProps {
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (bool: boolean) => void;
}

export function Header({ isUserMenuOpen, setIsUserMenuOpen }: HeaderProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(selectCurrentUser);

  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  const onLogOut = async (): Promise<void> => {
    // dispatch(clearUserState());
    await sendLogout(undefined);
    navigate("/");
  };

  // Désactiver le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Liens de navigation
  const navigationLinks = [
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
    { label: "Login", href: "/login" },
  ];

  const userLink = (
    <>
      {user && !isLoading && (
        <>
          {/* // onMouseEnter={() => setIsUserMenuOpen(true)}
        // onMouseLeave={() => setIsUserMenuOpen(false)}
        > */}
          <UserMenu
            user={user}
            onLogOut={onLogOut}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
          />
        </>
      )}
    </>
  );

  // Fonction pour générer les liens
  const renderLinks = (isMobile = false) =>
    navigationLinks.map(({ label, href }) => {
      if (label === "Login") {
        if (user) return null;
      }
      return (
        <li key={label}>
          {href.startsWith("/") ? (
            <Link
              to={href}
              className={`${
                isMobile
                  ? "text-2xl font-medium text-white transition-colors duration-300 hover:text-tech-pink"
                  : "text-lg font-medium transition-colors duration-300 hover:text-tech-blue"
              }`}
              onClick={() => isMobile && setIsMobileMenuOpen(false)} // Fermer le menu si mobile
            >
              {label}
            </Link>
          ) : (
            <a
              href={href}
              className={`${
                isMobile
                  ? "text-2xl font-medium text-white transition-colors duration-300 hover:text-tech-pink"
                  : "text-lg font-medium transition-colors duration-300 hover:text-tech-blue"
              }`}
              onClick={() => isMobile && setIsMobileMenuOpen(false)} // Fermer le menu si mobile
            >
              {label}
            </a>
          )}
        </li>
      );
    });

  return (
    <>
      {isLoading && <ModalSpinner isVisible={isLoading} />}
      <header className="relative z-20 py-4 text-gray-800 bg-white shadow-xl">
        {/* Conteneur du header */}
        <div className="container z-20 px-4 mx-auto">
          <div className="z-20 flex items-center justify-between">
            {/* Colonne gauche : Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/">
                <h1 className="text-2xl font-bold text-tech-blue">TechFix Pro</h1>
              </Link>
            </div>

            {/* Colonne droite : Navigation et utilisateur */}
            <div className="flex justify-center align-bottom space-x-7">
              {/* Navigation desktop */}
              <nav className="z-20 items-center justify-center hidden space-x-8 md:flex">{renderLinks()}</nav>
              {/* User menu */}
              {user ? userLink : null}
              {/* Bouton menu mobile */}
              <div className={`relative md:hidden`}>
                <AnimatedMenuButton isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
              </div>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`fixed inset-y-0 right-0 w-4/5 bg-tech-grey z-20 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out border-l-2 border-white ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav>
            <ul className="space-y-6 text-center">{renderLinks(true)}</ul>
          </nav>
        </div>

        {/* Overlay quand le menu mobile est ouvert */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </header>
    </>
  );
}
