import { useFormContext } from "react-hook-form";

interface FormInputBlocProps {
  name: string;
  label: string;
  type?: string; // Type de champ (par défaut "text")
}

const FormInputBloc = ({ name, label, type }: FormInputBlocProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const isError = errors[name];

  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">
      {label}

      <input
        id={name}
        type={type || "text"}
        {...register(name, {
          onBlur: () => trigger(name), // Validation à la perte de focus
        })}
        aria-invalid={!!isError}
        className={`${errors[name]?.message ? "error" : "valid"}`}
      />
      {/* Vérification du type et affichage du message */}
      {isError && typeof errors[name]?.message === "string" && (
        <p className="mt-2 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </label>
  );
};

export default FormInputBloc;
