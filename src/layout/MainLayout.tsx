import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Wrapper flex */}
      <Header />
      <main className="flex flex-col flex-grow w-full h-full">
        {" "}
        {/* Permet au contenu principal de prendre tout l'espace disponible */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
