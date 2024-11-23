// Imports React hooks and necessary components
import { useEffect, useState } from "react";
import { AnimatedMenuButton } from "../ui/AnimatedMenuButton"; // Custom animated button for menu toggling
import { UserMenu } from "./UserMenu"; // Menu component for user-related actions
import { User } from "../../types/user"; // Type definition for the `User` object
import { Link } from "react-router-dom";

// Props definition for the Header component
interface HeaderProps {
  user: User | null; // User object, or null if not logged in
  onLogin: () => void; // Function to handle login action
  onLogout: () => void; // Function to handle logout action
}

// Main Header component
export function Header({ user, onLogin, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the mobile menu is open

  // Effect to disable scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disables scrolling
    } else {
      document.body.style.overflow = "auto"; // Restores scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts or state changes
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-50 py-4 text-gray-800 bg-white shadow-xl">
      {/* Header container */}
      <div className="container z-40 px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Website Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-tech-blue">TechFix Pro</h1>
          </Link>

          {/* Desktop navigation (hidden on smaller screens) */}
          <nav className="items-center hidden space-x-8 md:flex">
            <a href="/#services" className="text-lg font-medium transition-colors duration-300 hover:text-tech-blue">
              Services
            </a>
            <a href="/#contact" className="text-lg font-medium transition-colors duration-300 hover:text-tech-blue">
              Contact
            </a>
            {user ? (
              // Show user menu when logged in
              <UserMenu user={user} onLogout={onLogout} />
            ) : (
              // Show login button when not logged in
              <Link to="login" className="text-lg font-medium transition-colors duration-300 hover:text-tech-blue">
                Login
                {/* <button
                  onClick={onLogin}
                  className="text-lg font-medium transition-colors duration-300 hover:text-tech-blue"
                ></button> */}
              </Link>
            )}
          </nav>

          {/* Mobile navigation button */}
          <div className={`relative z-50 md:hidden ${isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}>
            <AnimatedMenuButton isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-y-0 right-0 w-4/5 bg-tech-grey z-10 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out border-l-2 border-white ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav>
          {/* Mobile navigation links */}
          <ul className="space-y-6 text-center">
            <li>
              <a
                href="/#services"
                className="text-2xl font-medium text-white transition-colors duration-300 hover:text-tech-pink"
                onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className="text-2xl font-medium text-white transition-colors duration-300 hover:text-tech-pink"
                onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
              >
                Contact
              </a>
            </li>
            <li>
              {user ? (
                // Show user menu when logged in
                <UserMenu user={user} onLogout={onLogout} />
              ) : (
                // Show login button when not logged in
                <Link
                  to="login"
                  className="text-2xl font-medium text-white transition-colors duration-300 hover:text-tech-pink"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                  {/* <button
                  onClick={onLogin}
                  className="text-lg font-medium transition-colors duration-300 hover:text-tech-blue"
                ></button> */}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Background overlay when the menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-0 bg-black bg-opacity-50 backdrop-blur-sm overlay"
          onClick={() => setIsMenuOpen(false)} // Close menu when overlay is clicked
        >
          {/* Close button in the overlay */}
          <div className="absolute top-4 left-[calc(10%)] border-white border-2 rounded-sm flex justify-center align-top -translate-x-1/2">
            <button className="text-4xl text-white" onClick={() => setIsMenuOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                {/* Icon for the close button */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* (Optional) Animations for the overlay */}
      {/* <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .overlay {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style> */}
    </header>
  );
}
