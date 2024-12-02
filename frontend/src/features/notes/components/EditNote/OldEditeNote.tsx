import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notify } from "../../../notifications/utils/notifications";
import { useUpdateNoteByIdMutation } from "../../state/notesApiSlice";
import { INote } from "../../../../types/note";
import { IUser } from "../../../../types/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Définir le schéma de validation Zod
const schema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Le titre est requis." })
      .max(50, { message: "Le titre ne peut dépasser 50 caractères." }),
    content: z.string().min(1, { message: "Le contenu est requis." }),
    assignedTo: z.string().optional(), // Doit contenir l'ID de l'utilisateur ou être vide
    status: z.enum(["active", "assigned", "completed", "archived"]),
  })
  .refine((data) => !(data.status === "assigned" && (!data.assignedTo || data.assignedTo.trim() === "")), {
    message: "Le champ 'Assigné à' est obligatoire lorsque le statut est 'Assigné'.",
    path: ["assignedTo"],
  });

type FormData = z.infer<typeof schema>;

interface EditNoteFormProps {
  note: INote;
  users: IUser[];
}

const EditNoteForm = ({ note, users }: EditNoteFormProps) => {
  const navigate = useNavigate();
  const [updateNote, { isLoading }] = useUpdateNoteByIdMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: note.title || "",
      content: note.content || "",
      assignedTo: note.assignedTo?._id || "", // Utilise `_id` de `assignedTo`
      status: note.status || "active",
    },
  });

  // Réinitialise les valeurs si `note` change
  useEffect(() => {
    reset({
      title: note.title || "",
      content: note.content || "",
      assignedTo: note.assignedTo?._id || "", // Réinitialise avec l'ID
      status: note.status || "active",
    });
  }, [note, reset]);

  const status = watch("status");
  const assignedTo = watch("assignedTo");

  useEffect(() => {
    if (status === "assigned" && (!assignedTo || assignedTo.trim() === "")) {
      setError("assignedTo", {
        type: "manual",
        message: "Le champ 'Assigné à' est obligatoire lorsque le statut est 'Assigné'.",
      });
    }
  }, [status, assignedTo, setError]);

  const onSubmit = async (data: FormData) => {
    const sanitizedData = { ...data };
    if (sanitizedData.status !== "assigned" && !sanitizedData.assignedTo.trim()) {
      delete sanitizedData.assignedTo;
    }

    try {
      await updateNote({ id: note.id, ...sanitizedData }).unwrap();
      notify("Note sauvegardée avec succès.", "success");
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      notify(`Erreur lors de la sauvegarde. ${error.data?.message || "Une erreur inconnue est survenue."}`, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Titre */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre
        </label>
        <input id="title" type="text" {...register("title")} className="w-full p-2 border rounded" />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Contenu */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Contenu
        </label>
        <textarea id="content" {...register("content")} className="w-full p-2 border rounded" />
        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
      </div>

      {/* Assigné à */}
      <div>
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
          Assigné à
        </label>
        <select id="assignedTo" {...register("assignedTo")} className="w-full p-2 border rounded">
          <option value="">Aucun</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        {errors.assignedTo && <p className="text-sm text-red-500">{errors.assignedTo.message}</p>}
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select id="status" {...register("status")} className="w-full p-2 border rounded">
          <option value="active">Non assigné</option>
          <option value="assigned">Assigné</option>
          <option value="completed">Terminé</option>
          <option value="archived">Archivé</option>
        </select>
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </div>

      {/* Bouton de soumission */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded-md ${
            isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>
    </form>
  );
};

export default EditNoteForm;
