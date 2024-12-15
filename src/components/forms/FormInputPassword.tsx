import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormInputPasswordProps {
  name: string;
  label: string;
  error?: string | undefined;
}

const FormInputPassword: React.FC<FormInputPasswordProps> = ({ name, label, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    trigger,

    formState: { errors },
  } = useFormContext();

  const isError = !!errors[name];
  const errorMessage = typeof errors[name]?.message === "string" ? errors[name]?.message : error;

  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      <div className="relative mt-1 ">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          {...register(name, {
            onBlur: () => trigger(name),
          })}
          aria-invalid={!!isError}
          className={`${errors[name]?.message ? "error" : error ? "error" : "valid"}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute flex items-center p-2 pr-3 text-sm leading-5 border-l rounded-none right-2 inset-y-4 "
        >
          {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
        </button>
      </div>
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </label>
  );
};

export default FormInputPassword;
