import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState } from "react";

const MainLayout = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Wrapper flex */}
      <div className="z-40">
        <Header setIsUserMenuOpen={setIsUserMenuOpen} isUserMenuOpen={isUserMenuOpen} />
      </div>
      {isUserMenuOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-black bg-opacity-30 animate-fadeIn "></div>
      )}
      <main>
        {" "}
        {/* Permet au contenu principal de prendre tout l'espace disponible */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
