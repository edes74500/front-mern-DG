// import { useState } from "react";
// import { IUser } from "../../types/user";

// interface UserMenuProps {
//   user: IUser;
//   onLogout: () => void;
// }

// export function UserMenu({ user, onLogout }: UserMenuProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
//         <img src={user.username} alt={user.username} width={32} height={32} className="rounded-full" />
//         <span className="hidden md:inline">{user.username}</span>
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white rounded-md shadow-lg">
//           <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             Account Settings
//           </a>
//           <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             Orders
//           </a>
//           <button
//             onClick={onLogout}
//             className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
