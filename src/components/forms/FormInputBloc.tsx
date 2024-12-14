import { useFormContext } from "react-hook-form";

interface FormInputBlocProps {
  name: string;
  label: string;
  type?: string;
  error?: string | undefined;
}

const FormInputBloc: React.FC<FormInputBlocProps> = ({ name, label, type, error }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const isError = !!errors[name];
  const errorMessage = typeof errors[name]?.message === "string" ? errors[name]?.message : error;

  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">
      {label}
      <input
        id={name}
        type={type || "text"}
        {...register(name, {
          onBlur: () => trigger(name),
        })}
        aria-invalid={!!isError}
        className={`${errors[name]?.message ? "error" : error ? "error" : "valid"}`}
      />
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </label>
  );
};

export default FormInputBloc;
