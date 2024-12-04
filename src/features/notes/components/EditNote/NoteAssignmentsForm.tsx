import { useState } from "react";
import { useForm } from "react-hook-form";

interface NoteAssignmentFormProps {
  formData: AssignmentFormData;
  setFormData: React.Dispatch<React.SetStateAction<AssignmentFormData>>;
  users: IUser[];
}

const NoteAssignmentForm = ({ formData, setFormData, users }: NoteAssignmentFormProps) => {
  const [touched, setTouched] = useState(false); // Gère si le champ `assignedTo` a été touché

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentFormData>({
    defaultValues: formData,
  });

  const validateAssignment = (data: AssignmentFormData) => {
    if (data.status === "assigned" && (!data.assignedTo || data.assignedTo.trim() === "")) {
      return "Le champ 'Assigné à' est obligatoire lorsque le statut est 'Assigné'.";
    }
    return true;
  };

  const onSubmit = (data: AssignmentFormData) => {
    setFormData(data);
    setTouched(true);
  };

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
          Assigné à
        </label>
        <select
          id="assignedTo"
          {...register("assignedTo", {
            validate: (value) =>
              touched && formData.status === "assigned" && value.trim() === ""
                ? "Le champ 'Assigné à' est obligatoire lorsque le statut est 'Assigné'."
                : true,
          })}
          className="w-full p-2 border rounded"
        >
          <option value="">Aucun</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        {errors.assignedTo && <p className="text-sm text-red-500">{errors.assignedTo.message}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Statut
        </label>
        <select
          id="status"
          {...register("status", { required: "Le statut est obligatoire." })}
          className="w-full p-2 border rounded"
        >
          <option value="active">Non assigné</option>
          <option value="assigned">Assigné</option>
          <option value="completed">Terminé</option>
          <option value="archived">Archivé</option>
        </select>
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </div>
    </form>
  );
};

export default NoteAssignmentForm;
