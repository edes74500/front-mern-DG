interface AnimatedMenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export function AnimatedMenuButton({ isOpen, toggle }: AnimatedMenuButtonProps) {
  return (
    <button
      className="relative w-8 h-8 z-0 focus:outline-none text-[#007AFF]"
      onClick={toggle}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        {/* Top bar */}
        <span
          className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
          }`}
        ></span>
        {/* Middle bar */}
        <span
          className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        {/* Bottom bar */}
        <span
          className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
          }`}
        ></span>
      </div>
    </button>
  );
}
