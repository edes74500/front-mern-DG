import { useFormContext } from "react-hook-form";

interface FormInputCheckboxProps {
  name: string;
  label: string;
  error?: string | undefined;
}

const FormInputCheckbox: React.FC<FormInputCheckboxProps> = ({ name, label, error }) => {
  const {
    register,
    trigger,
    watch,

    formState: { errors },
  } = useFormContext();

  const isError = !!errors[name];
  const errorMessage = typeof errors[name]?.message === "string" ? errors[name]?.message : error;

  return (
    <div className="flex items-center space-x-3">
      <input
        id={name}
        type="checkbox"
        checked={watch(name)}
        {...register(name, {
          onBlur: () => trigger(name),
        })}
        aria-invalid={!!isError}
        className={`${
          isError ? "error" : "valid"
        } rounded border-gray-300 text-indigo-600 focus:ring-0 focus:border-none`}
      />
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default FormInputCheckbox;
