import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNoteMutation } from "../../state/notesApiSlice";
import { notify } from "../../../notifications/utils/notifications";
import FormInput from "../../../../components/forms/FormInput";

function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //   const [active, setActive] = useState(true); // État actif/inactif

  const userId = "6744916da9210e340159faec";

  const [createNote, { isLoading }] = useCreateNoteMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      notify("Veuillez remplir tous les champs obligatoires.", "error");
      return;
    }

    try {
      const response = await createNote({ title, content, userId }).unwrap();
      notify(`Note "${response.title}" créée avec succès.`, "success");
      navigate("/dashboard/notes/list"); // Redirection vers la liste des notes
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Erreur lors de la création de la note.";
      notify(errorMessage, "error");
    }
  };

  const handleCancel = () => {
    notify("Création annulée", "info");
    navigate("/dashboard/notes/list"); // Redirection vers la liste des notes
  };

  return (
    <div className="p-6 mx-auto rounded-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Créer une note</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ Titre */}
        <FormInput label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} type="text" required />

        {/* Champ Contenu */}
        <FormInput
          label="contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          isTextarea={true} // Indique que ce champ est un textarea
          required
        />

        {/* Actif/Inactif */}
        {/* <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => setActive(!active)} // Toggle actif/inactif
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
              active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {active ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Actif
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                Inactif
              </>
            )}
          </button>
        </div> */}

        {/* Boutons */}
        <div className="flex justify-end gap-3">
          {/* Bouton Annuler */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Annuler
          </button>

          {/* Bouton Créer */}
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring ${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            }`}
          >
            {isLoading ? "Création en cours..." : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNoteForm;
