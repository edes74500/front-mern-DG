import { useForm } from "react-hook-form";

interface NoteDetailsFormProps {
  formData: NoteFormData;
  setFormData: React.Dispatch<React.SetStateAction<NoteFormData>>;
}

const NoteDetailsForm = ({ formData, setFormData }: NoteDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    defaultValues: formData,
  });

  const onSubmit = (data: NoteFormData) => {
    setFormData(data);
  };

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre
        </label>
        <input
          id="title"
          {...register("title", { required: "Le titre est requis." })}
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Contenu
        </label>
        <textarea
          id="content"
          {...register("content", { required: "Le contenu est requis." })}
          className="w-full p-2 border rounded"
        />
        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
      </div>
    </form>
  );
};

export default NoteDetailsForm;
