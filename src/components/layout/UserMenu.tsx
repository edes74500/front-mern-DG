import { useState } from "react";
import { User } from "../../types/user";

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
        <img src={user.profilePicture} alt={user.name} width={32} height={32} className="rounded-full" />
        <span className="hidden md:inline">{user.name}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white rounded-md shadow-lg">
          <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Account Settings
          </a>
          <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Orders
          </a>
          <button
            onClick={onLogout}
            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
