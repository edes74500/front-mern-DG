import { IUserGetResBodyDTO } from "@edes74500/fixrepairshared";
import { ColumnDef } from "@tanstack/react-table";
import RoleFormatter from "../../components/RoleFormatter";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   users: IUserGetResBodyDTO["users"];
// };

export const columns: ColumnDef<IUserGetResBodyDTO["users"][number], unknown>[] = [
  {
    accessorKey: "username",
    header: "Username",
    enableResizing: true,
    cell: ({ row }) => {
      const username: string = row.getValue("username"); // Récupérer le username
      const userId = row.original.id; // Récupérer l'ID de l'utilisateur pour la route

      return (
        <Link
          to={`/dashboard/users/${userId}`} // Lien vers la page utilisateur
          className="text-blue-500 underline hover:text-blue-700"
        >
          {username}
        </Link>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    size: 80, // Fixed
  },
  {
    accessorKey: "roles",
    size: 250, // Fixed
    enableResizing: true,
    header: () => <div className="w-full text-center">Roles</div>,
    cell: ({ row }) => {
      const roles: string[] = row.getValue("roles"); // Supposé être un array de strings
      return (
        <div className="flex justify-center">
          <RoleFormatter roles={roles} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    size: 100, // Fixed
    enableResizing: true,
    cell: ({ row }) => {
      const rawDate: Date = row.getValue("createdAt"); // La valeur brute de la date
      const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(rawDate)); // Transformer en date au format français

      return <div>{formattedDate}</div>;
    },
  },
  {
    size: 100, // Fixed
    accessorKey: "lastLogin",
    header: "Last login",
    enableResizing: true,
  },
  {
    id: "actions",
    size: 30, // Fixed
    cell: () => {
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="w-8 h-8 p-0 bg-gray-300">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Modifier l'utilisateur</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Supprimer l'utilisateur</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
