import { useGetUsersByRoleQuery } from "../../../users/state/usersApiSlice";
import { useGetNoteByIdQuery } from "../../state/notesApiSlice";
import EditNoteForm from "./EditNoteForm";

const EditNoteFetcher = ({ noteId }: { noteId: string }) => {
  const { data: note, isLoading, isError } = useGetNoteByIdQuery({ noteId });

  //get employees
  const { data: employees = [], isLoading: isLoadingEmployees } = useGetUsersByRoleQuery({ role: ["Employee"] });

  if (isLoading || isError) return "Chargement...";
  if (!note) return "Note non trouvée.";

  return (
    <>
      {!isLoading && note && employees && (
        <>
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Edition de la note</h1>
          <EditNoteForm note={note} users={employees} />
        </>
      )}

      {!isLoadingEmployees && employees && (
        <>
          <h2 className="mb-4 text-xl font-bold text-gray-800">Utilisateurs ayant accès à la note</h2>
          <ul className="space-y-4">
            {employees.map((employee) => (
              <li key={employee.username}>
                {employee.username} {""}
                {employee.active ? "Actif" : "Inactif"} {employee.id}
                {employee.roles}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default EditNoteFetcher;
