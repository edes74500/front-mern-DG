import { useFormContext } from "react-hook-form";

interface FormTextAreaBlocProps {
  name: string;
  label: string;
  rows?: number; // Nombre de lignes pour le textarea
  error?: string | undefined;
}

const FormTextAreaBloc = ({ name, label, rows = 10, error }: FormTextAreaBlocProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const isError = !!errors[name];
  const errorMessage = typeof errors[name]?.message === "string" ? errors[name]?.message : error; // Garde seulement les messages valides

  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">
      <div>{label}</div>

      <textarea
        id={name}
        rows={rows}
        {...register(name, {
          onBlur: () => trigger(name), // Validation à la perte de focus
        })}
        aria-invalid={!!isError}
        className={`${errors[name]?.message ? "error" : error ? "error" : "valid"} w-full resize-none`}
      />
      {/* Affichage sécurisé du message d'erreur */}
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </label>
  );
};

export default FormTextAreaBloc;
