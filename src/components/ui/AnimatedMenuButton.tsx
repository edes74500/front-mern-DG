interface AnimatedMenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export function AnimatedMenuButton({ isOpen, toggle }: AnimatedMenuButtonProps) {
  return (
    <button className="relative w-8 h-8 z-1000 focus:outline-none text-[#007AFF]" onClick={toggle}>
      <span className="sr-only">{isOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
      <div className="absolute left-1/2 top-1/2 w-6 transform -translate-x-1/2 -translate-y-1/2">
        <span
          className={`absolute h-0.5 w-6 transform transition duration-300 ease-in-out ${
            isOpen ? "rotate-405 bg-[#007AFF] translate-y-0" : "-translate-y-1.5 bg-current"
          }`}
        ></span>
        <span
          className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`absolute h-0.5 w-6 transform transition duration-300 ease-in-out ${
            isOpen ? "-rotate-405 bg-[#007AFF] translate-y-0" : "translate-y-1.5 bg-current"
          }`}
        ></span>
      </div>
    </button>
  );
}
